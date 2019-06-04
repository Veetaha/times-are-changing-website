import { Nullable    } from 'ts-typedefs';
import { Injectable  } from '@angular/core';
import { FormControl } from '@angular/forms';

import { limits      } from '@common/constants';
import { FormService } from '@utils/form.service';

@Injectable({ providedIn: 'root' })
export class NewsFormService {

    constructor(private readonly forms: FormService) {}

    createTitleFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.news.title
        );
    }
    createBodyFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.news.body
        );
    }
    createPromoImgIdFromControl(initialValue?: Nullable<string>) {
        return new FormControl(initialValue);
    }


}