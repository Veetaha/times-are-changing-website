import { PropertyDecorator, Class } from 'ts-typedefs';
import { Type } from 'class-transformer';
import { Field } from 'type-graphql';
import { ValidateNested } from 'class-validator';

import * as I from '@app/interfaces';
import { composeDecorators } from '@utils/meta';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';

export function NestedInputField
<TOpts extends I.GqlFieldOpts, TInputClass extends Class>
(typeFn: I.TypeFn<TInputClass>, opts?: TOpts): I.GqlFieldDecor<InstanceType<TInputClass>, TOpts> {
    return opts != null && opts.nullable ? 
        composeDecorators(
            Type(typeFn) as PropertyDecorator,
            ValidateNested() as PropertyDecorator,
            ValidateIfPresent as PropertyDecorator,
            Field(typeFn, opts)
        ) :
        composeDecorators(
            Type(typeFn) as PropertyDecorator,
            ValidateNested() as PropertyDecorator,
            Field(typeFn, opts)
        );
}