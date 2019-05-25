import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@modules/config/config.service';
import { AuthService } from './auth.service';
import { Strategy as PassportJwtStrategy } from 'passport-jwt';

@Injectable()                    // tslint:disable-next-line: no-inferred-empty-object-type
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
    constructor(
        private readonly auth: AuthService,
        config: ConfigService
    ) {
        super(config.createPassportJwtStrategyOptions());
    }

    async validate(payload: unknown) {
        return this.auth.getUserByJwtPayload(payload);
    }
}