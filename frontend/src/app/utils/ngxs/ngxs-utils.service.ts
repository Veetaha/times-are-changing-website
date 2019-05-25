import { Injectable } from '@angular/core';
import { NgxsFormStateModel, NgxsFormValidityState } from './form.model';

@Injectable({ providedIn: 'root' })
export class NgxsUtilsService {

    isFormValid(formModel: NgxsFormStateModel) {
        return formModel.status === NgxsFormValidityState.Valid;
    }

}