import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store          } from '@ngxs/store';

import { limits          } from '@common/constants';
import { CreateNewsInput } from '@app/gql/generated';
import { TypedFormGroup  } from '@app/interfaces';
import { FormService     } from '@app/utils/form.service';
import { Warning         } from '@app/error/error.actions';
import { AbstractRouteGuardedComponent } from '@app/auth/abstract-route-guarded.component';

import { NewsService         } from '../news.service';
import { NewsFormService     } from '../news-form.service';
import { OpenNewsDetailsPage } from '../news-routing.actions';
import { Success } from '@app/common/common.actions';


@Component({
    selector:    'app-create-news',
    templateUrl: './create-news.component.html',
    styleUrls:  ['./create-news.component.scss']
})
export class CreateNewsComponent extends AbstractRouteGuardedComponent {
    readonly limits = limits;
    readonly form: TypedFormGroup<CreateNewsInput>;

    constructor(
        private readonly news: NewsService,
        route:     ActivatedRoute,
        store:     Store,
        newsForms: NewsFormService,
        forms:     FormService
    ) {
        super(route, store);
        this.form = forms.createFormGroup({
            title:      newsForms.createTitleFormControl(''),
            body:       newsForms.createBodyFormControl(''),
            promoImgId: newsForms.createPromoImgIdFromControl('')
        });
    }


    submitForm() {
        if (this.form.invalid) {
            throw new Error('Cannot submit invalid form to create news.');
        }
        const newsTitle = this.form.value.title;
        this.news.createNews(this.form.value).subscribe(
            createdNewsId => this.store.dispatch([
                new OpenNewsDetailsPage(createdNewsId),
                new Success(`Successfully published news '${newsTitle}'.`, 'News created')
            ]),
            err => this.store.dispatch(new Warning(
                `Backend failed to create news. Please submit an error report ` +
                `to our webmaster with the following info: '${err}'.`
            ))
        );
    }

}