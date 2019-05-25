import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule    } from '@angular/material/snack-bar';
import { MatIconModule        } from '@angular/material/icon';
import { MatListModule        } from '@angular/material/list';
import { MatButtonModule      } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule       } from '@angular/material/input';
import { MatCardModule        } from '@angular/material/card';
import { MatTooltipModule     } from '@angular/material/tooltip';

@NgModule({
    exports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        MatCardModule,
        MatTooltipModule
    ]
})
export class CommonMaterialModule { }