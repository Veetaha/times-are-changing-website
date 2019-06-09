import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent     } from './contacts/contacts.component';

@NgModule({
    imports: [
        CommonModule,
        ContactsRoutingModule   
    ],
    declarations: [ContactsComponent],
})
export class ContactsModule { }
