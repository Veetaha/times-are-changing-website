import { RemoveKeys             } from 'ts-typedefs';
import { ColumnOptions, Column  } from 'typeorm';

import { IntRange               } from '@common/utils/math/int-range';
import { composeDecorators      } from '@utils/meta';
import { StringLength           } from '@utils/validation/string-length.decorator';
import { ValidateIfPresent      } from '@utils/validation/validate-if-present.decorator';
import { Validations, PropDecor } from '@utils/validation/validations.decorator';
import { Matches, MaxLength } from 'class-validator';

/**
 * Defines a `@Column({ type: 'varchar', length: range.max })` column
 * and adds `@Validations` constraints for `class-validator` for the decorated property.
 * 
 * @param lengthRange Range of length the string may have.
 * @param opts        Options that are forwarded to `@Column()` decorator.
 */
export function StringColumn(
    lengthRange: IntRange,  
    opts?: RemoveKeys<ColumnOptions, 'length'>
) {
    const validations = [StringLength(lengthRange)];
    if (opts != null && opts.nullable) {
        validations.push(ValidateIfPresent);
    }
    return composeDecorators(
        Validations(...validations),
        Column({ type: 'varchar', ...opts, length: lengthRange.max }) as PropDecor
    );
}

/**
 * Defines a `@Column({ type: 'varchar', length: maxLength })` column
 * and adds `@Validations` constraints for `class-validator` for the decorated property.
 *
 * @param regExp Regular expression that defines the declared column content format.
 * @param maxLength Maximum length the string may have.
 * @param opts      Options that are forwarded to `@Column()` decorator.
 */
export function StringColumnWithFormat(
    regExp: RegExp,
    maxLength: number,
    opts?: RemoveKeys<ColumnOptions, 'length'>
) {
    const validations = [
        Matches(regExp) as PropDecor,
        MaxLength(maxLength)
    ];
    if (opts != null && opts.nullable) {
        validations.push(ValidateIfPresent);
    }
    return composeDecorators(
        Validations(...validations),
        Column({ type: 'varchar', ...opts, length: maxLength }) as PropDecor
    );
}