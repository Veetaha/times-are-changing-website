import _ from 'lodash';
import { Nullable } from 'ts-typedefs';
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { UcWidgetComponent, UcWidgetCustomComponent } from 'ngx-uploadcare-widget';

import { ConfigService } from '@app/config/config.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type FileUrlChangeHandler = (fileUrl: string) => void;

@Component({
    selector:    'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls:  ['./upload-image.component.scss'],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UploadImageComponent),
        multi:       true
    }]
})
export class UploadImageComponent implements ControlValueAccessor {

    @Input() shouldDisplayButton!: boolean;
    @ViewChild('ucWidget') ucWidget!: UcWidgetComponent | UcWidgetCustomComponent;

    fileUrl!: string;
    notifyFileUrlChanged: FileUrlChangeHandler = _.noop;

    constructor(readonly config: ConfigService) { }

    openDialog() {
        this.ucWidget.openDialog();
    }

    onUploadComplete(fileUrl: string) {
        this.fileUrl = fileUrl;
        this.notifyFileUrlChanged(fileUrl);
    }

    writeValue(fileUrl: Nullable<string>) {
        if (fileUrl != null) this.fileUrl = fileUrl;
    }

    registerOnChange(handler: FileUrlChangeHandler) {
        this.notifyFileUrlChanged = handler;
    }

    registerOnTouched() {}
}
