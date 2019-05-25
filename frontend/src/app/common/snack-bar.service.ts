import { Injectable } from '@angular/core';

import { ConfigService } from '@app/config/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SnackBarData, SnackBarSeverity } from './snack-bar/snack-bar-data.interface';



@Injectable({ 
    providedIn: 'root'
})
export class SnackBarService {
    constructor(
        private readonly snackBars: MatSnackBar,
        private readonly config: ConfigService
    ) {}

    private addSnackBar(data: SnackBarData) {
        return this.snackBars.openFromComponent(SnackBarComponent, {
            data, 
            ...this.config.snackBarOpts,
            panelClass: `snack-bar-${data.severity}`
        });
    }

    showWarning(body: string, title = 'Warning') {
        this.addSnackBar({ severity: SnackBarSeverity.Warning, title, body });
    }
    
    showSuccess(body: string, title = 'Success') {
        this.addSnackBar({ severity: SnackBarSeverity.Success, title, body });
    }

    showInfo(body: string, title = 'Info') {
        this.addSnackBar({ severity: SnackBarSeverity.Info, title, body });
    }

    showError(body: string, title = 'Error') {
        this.addSnackBar({ severity: SnackBarSeverity.Error, title, body });
    }

}