import { Component, Input  } from '@angular/core';

@Component({
    selector:    'app-dashboard-anchor',
    templateUrl: './dashboard-anchor.component.html',
    styleUrls:  ['./dashboard-anchor.component.scss']
})
export class DashboardAnchorComponent {
    _exactMatch = false;
    @Input() set exactMatch(value: '' | boolean) {
        this._exactMatch = value === '' || value;
    }
    @Input() routePath!: string;

    constructor() {}
}