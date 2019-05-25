import { FormControl } from '@angular/forms';
import { Nullable } from 'ts-typedefs';
import { Disposable } from '@utils/disposable';

export abstract class AbstractViewAndEdit<TValue> extends Disposable {
    private formControl?: Nullable<FormControl>;
    
    protected abstract createFormControl(): FormControl;
    protected abstract submitEditsImpl(value: TValue): void;

    getFormControl() {
        return this.formControl;
    } 

    setEditState() {
        this.formControl = this.createFormControl();
    }
    isEditState() {
        return this.formControl != null;
    }
    cancelEdits() {
        this.formControl = null;
    }
    submitEdits() {
        this.submitEditsImpl(this.formControl!.value);
        this.formControl = null;
    }

}