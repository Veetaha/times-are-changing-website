import * as Joi from 'typesafe-joi';

export const JwtPayloadSchema = Joi.object({

    sub: Joi.string().min(2).max(37).required()
    
}).unknown().required();

export type JwtPayload = Joi.SchemaValue<typeof JwtPayloadSchema>;