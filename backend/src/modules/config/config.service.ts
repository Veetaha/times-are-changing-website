import * as Path from 'path';
import * as Joi from 'typesafe-joi';
import { Injectable } from '@nestjs/common';
import { ServeStaticOptions } from '@nestjs/platform-express/interfaces/serve-static-options.interface';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GqlOptionsFactory, GqlModuleOptions         } from '@nestjs/graphql';
import { JwtOptionsFactory, JwtModuleOptions         } from '@nestjs/jwt';
import { AuthOptionsFactory, AuthModuleOptions       } from '@nestjs/passport';
import { ExtractJwt, StrategyOptions as PassportJwtStrategyOptions } from 'passport-jwt';

import { ResolveContext } from '@modules/common/resolve-context.class';
import { EnvService     } from '@utils/env/env.service';

@Injectable()
export class ConfigService
implements TypeOrmOptionsFactory, GqlOptionsFactory, JwtOptionsFactory, AuthOptionsFactory {
    // development mode by default
    static readonly isDevelopmentMode = process.env.NODE_ENV !== 'production';

    readonly default = {
        user: { avatarImgId: 'default-user-avatar-image-id' },
        news: { promoImgId:  'e1461841-ddf7-4132-b4a7-243ab54b2380' }
    } as const;

    readonly passwordSalt          = this.env.readEnvOrFail('PASSWORD_SALT');
    readonly port                  = this.env.readPortFromEnvOrFail('PORT');
    readonly gqlApiDocsDir         = this.pathFromRoot('common/docs/gql');
    readonly frontendPublicDir     = this.pathFromRoot('frontend/dist/frontend');
    readonly frontendIndexHtmlPath = `${this.frontendPublicDir}/index.html`;
    

    readonly jwtKeypair = this.env.parseFileSyncOrThrow(
        this.pathFromRoot('backend/.rsa-keypair.json'),
        Joi.object({
            private: Joi.string().required(),
            public:  Joi.string().required()
        }).required()
    );

    constructor(
        private readonly env: EnvService
    ) {}

    pathFromRoot(...pathParts: string[]) {        
        return Path.normalize(Path.join(__dirname, '../../../../', ...pathParts));
    }

    createGqlApiDocsServeStaticOptions(): ServeStaticOptions {
        return { prefix: '/gql/docs' };
    }

    createGqlOptions(): GqlModuleOptions {
        return {
            playground:     true,
            introspection:  true,
            autoSchemaFile: this.pathFromRoot('common/schema.gql'),
            path:           '/gql',
            context:        ResolveContext.createResolveContext.bind(ResolveContext),
            debug:          ConfigService.isDevelopmentMode
        };
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type:      'postgres',   
            port:      this.env.readPortFromEnvOrFail('DB_PORT'),
            host:      this.env.readEnvOrFail('DB_HOST'),
            username:  this.env.readEnvOrFail('DB_USER'),
            password:  this.env.readEnvOrFail('DB_PASSWORD'),
            database:  this.env.readEnvOrFail('DB_DB'),
            entities:  [this.pathFromRoot('backend/src/modules/**/*.entity.ts')],
            maxQueryExecutionTime:  ConfigService.isDevelopmentMode ? 200 : void 0,
            logging:      ConfigService.isDevelopmentMode,
            synchronize:  ConfigService.isDevelopmentMode,
            keepConnectionAlive: true,
            cache:               true
        };
    }

    createAuthOptions(): AuthModuleOptions {
        return { defaultStrategy: 'jwt' };
    }

    createPassportJwtStrategyOptions(): PassportJwtStrategyOptions {
        return { 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:    this.jwtKeypair.private,
            algorithms:     ['RS256']
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            publicKey:          this.jwtKeypair.public,
            secretOrPrivateKey: this.jwtKeypair.private,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: this.env.readEnvOrFail('TOKEN_EXPIRATION_ZEIT'),
            }
        };
    }
}
