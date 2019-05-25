import * as I from '@app/interfaces';
import { SortInput } from './sort.input';
import { NestedInputField } from '../decorators/nested-input-field.decorator';

const sortInputTypeFn = () => SortInput;

export const SortInputField: I.GqlFieldDecorFactory<SortInput> = (
    opts => NestedInputField(sortInputTypeFn, opts)
);