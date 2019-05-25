import * as Joi    from 'typesafe-joi';
import * as Fs     from 'fs';
import * as Yaml   from 'yaml';
import * as Dotenv from 'dotenv';

import { Injectable } from '@nestjs/common';

import * as I from '@app/interfaces';


@Injectable()
export class EnvService {

    loadDotenv(path?: string) {
        if (path != null) {
            Dotenv.config({ path }); 
        } else {
            Dotenv.config();
        }
    }

    /**
     * Tries to read environmental variable from `process.env` and returns its value.
     * @param varId Environmental variable name.
     * 
     * @throws Error if `process.env[varId] == null`.
     */
    readEnvOrFail(varId: string) {
        const envValue = process.env[varId];
        if (envValue == null) {
            throw new Error(`failed to read '${varId}' environment variable`);
        }
        return envValue;
    }

    /**
     * Tries to read port number from `process.env` and returns its numberic value.
     * 
     * @param varId Environmental variable name.
     * 
     * @throws Error if `process.env[varId] == null` or failed to parse valid port number.
     * 
     */
    readPortFromEnvOrFail(varId: string) {
        return Joi.attempt(
            parseInt(this.readEnvOrFail(varId), 10),
            Joi.number().integer().min(0).max(65535).required(),
        ) as I.port_t;
    }


    /**
     * Tries to read the contents of the file that resides at `filePath` and to parse
     * it as JSON or YAML according to its extention, resulting value must 
     * conform to the given `schema`.
     * 
     * @param filePath A path to the target JSON or YAML file to read from.
     * @param schema   `Joi.Schema` of the target JSON or YAML file.
     * 
     * @throws `Error` if failed to read file or parse the target file.
     */
    parseFileSyncOrThrow<TSchema extends Joi.Schema>(filePath: string, schema: TSchema) {
        return Joi.attempt(
            this.getParserForExtension(filePath)
                .parse(Fs.readFileSync(filePath, { encoding: 'utf8' })), 
            schema
        );
    }

    private getParserForExtension(filePath: string) {
        if (filePath.endsWith('.json')) return JSON;
        if (filePath.endsWith('.yml'))  return Yaml;

        throw new Error(
            `could not detect serialization format for '${
            filePath}', supported extensions: '.json', '.yml'`
        );
    }

}
