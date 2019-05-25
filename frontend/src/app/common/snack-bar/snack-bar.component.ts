import { Component, Inject, NgZone } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackBarData } from './snack-bar-data.interface';

@Component({
    selector:    'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls:  ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
    
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) readonly data: SnackBarData,
        readonly snackBarRef: MatSnackBarRef<SnackBarComponent>,
        private readonly zone: NgZone
    ) { }
    
    closeSnackBar() {
        // Running it inside of `NgZone` is crutial!
        this.zone.run(() => this.snackBarRef.dismiss());
    }
}
