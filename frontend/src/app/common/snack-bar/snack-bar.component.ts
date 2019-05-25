import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { SnackBarData } from './snack-bar-data.interface';

@Component({
    selector:    'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls:  ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
    
    constructor(@Inject(MAT_SNACK_BAR_DATA) readonly data: SnackBarData) { }
}
