import * as CV  from 'class-validator';
import * as Joi from 'typesafe-joi';

import * as I from '@app/interfaces';


class JoiValidateConstraint implements CV.ValidatorConstraintInterface {
    private err?: I.Nullable<Joi.ValidationError>;

    validate(suspect: unknown, { constraints: [schema] }: CV.ValidationArguments) {
        return null == (this.err = Joi.validate(suspect, schema).error);
    }

    defaultMessage() {
        return this.err!.message;
    }
}

export function JoiValidate
<TSchema extends Joi.Schema>
(schema: TSchema, options?: CV.ValidationOptions) {
    return (classProto: I.Obj, propertyName: string) => {
        CV.registerDecorator({
            name:        JoiValidate.name,
            target:      classProto.constructor,
            constraints: [schema],
            validator:   JoiValidateConstraint,
            propertyName,
            options
        });
    };
}