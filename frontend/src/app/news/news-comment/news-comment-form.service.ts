import { Injectable } from '@angular/core';

import { limits      } from '@common/constants';
import { FormService } from '@utils/form.service';

@Injectable({ providedIn: 'root' })
export class NewsCommentFormService {

    constructor(private readonly forms: FormService) {}

    createBodyFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.newsComment.body
        );
    }

}