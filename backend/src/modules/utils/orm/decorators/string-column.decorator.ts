import { RemoveKeys             } from 'ts-typedefs';
import { ColumnOptions, Column  } from 'typeorm';

import { IntRange               } from '@common/utils/math/int-range';
import { composeDecorators      } from '@utils/meta';
import { StringLength           } from '@utils/validation/string-length.decorator';
import { ValidateIfPresent      } from '@utils/validation/validate-if-present.decorator';
import { Validations, PropDecor } from '@utils/validation/validations.decorator';

/**
 * Defines a `@Column({ type: 'varchar', length: range.max })` column
 * and adds `@Validations` constraints for `class-validator` for the decorated property.
 */
export function StringColumn(
    range: IntRange,  
    opts?: RemoveKeys<ColumnOptions, 'length'>
) {
    return composeDecorators(

        opts == null || !opts.nullable 
            ? Validations(StringLength(range)) 
            : Validations(StringLength(range), ValidateIfPresent),

        Column({ type: 'varchar', ...opts, length: range.max - 1 }) as PropDecor
    );
}