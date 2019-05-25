import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxsModule                    } from '@ngxs/store';
import { NgxsFormPluginModule          } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule        } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule        } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule       } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { ConfigService } from '@app/config/config.service';

import { CommonState } from './common.state';


@NgModule({
    imports: [
        // For @ngxs/form-plugin
        FormsModule,
        ReactiveFormsModule,

        NgxsModule
            .forRoot([CommonState], ConfigService.createNgxsOptions()),
        NgxsRouterPluginModule
            .forRoot(),
        NgxsFormPluginModule
            .forRoot(),
        NgxsStoragePluginModule
            .forRoot(ConfigService.createNgxsStoragePluginOptions()),
        NgxsReduxDevtoolsPluginModule
            .forRoot(ConfigService.createNgxsDevtoolsPluginOptions()),
        /** 
         * Note from NGXS manual:
         * You should always include the logger as the last plugin in your configuration. 
         * For instance, if you were to include logger before a plugin like the storage plugin, 
         * the initial state would not be reflected.
         */
        NgxsLoggerPluginModule
            .forRoot(ConfigService.createNgxsLoggerPluginOptions())
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NgxsModule,
        NgxsFormPluginModule
    ]
})
export class CommonNgxsModule {}