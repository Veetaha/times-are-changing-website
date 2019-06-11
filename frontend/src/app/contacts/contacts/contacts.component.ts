import { Component } from '@angular/core';

@Component({
    selector:    'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls:  ['./contacts.component.scss']
})
export class ContactsComponent {
    mapMarker = {    // Kiev Polytechnic Institute
        lat: 50.448727, 
        lng: 30.456825
    };
}
