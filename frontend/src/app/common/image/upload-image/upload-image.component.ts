import _ from 'lodash';
import { Nullable } from 'ts-typedefs';
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { UcWidgetComponent, UcWidgetCustomComponent } from 'ngx-uploadcare-widget';

import { ConfigService } from '@app/config/config.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type FileIdChangeHandler = (fileId: string) => void;

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
    /** underlying dialog widget 3d-party implementation */
    @ViewChild('ucWidget') ucWidget!: UcWidgetComponent | UcWidgetCustomComponent;

    imageName: Nullable<string> = null;

    /**
     * If `null`, no button is displayed, otherwise displays a primary material
     * button with an icon and `buttonLabel` as its text content.
     */
    @Input() buttonLabel: Nullable<string> = null;

    uploadcarePublicApiKey: string;
    /** Current image id */
    imgId!: string;
    /** Callback in order to notify Angular form control about image id chages. */
    notifyImgIdChanged: FileIdChangeHandler = _.noop;

    constructor(
        config: ConfigService
    ) {
        this.uploadcarePublicApiKey = config.uploadcarePublicApiKey;
    }

    /** Function that may be called in public context to manually trigger the uc dialog. */
    openDialog() {
        this.ucWidget.openDialog();
    }

    /** `ControlValueAccessor` implementation */
    onUploadComplete(imgId: string, imageName: string) {
        this.imageName = imageName;
        this.imgId = imgId;
        this.notifyImgIdChanged(imgId);
    }

    /** `ControlValueAccessor` implementation */
    writeValue(imgId: Nullable<string>) {
        if (imgId != null) this.imgId = imgId;
    }

    /** `ControlValueAccessor` implementation */
    registerOnChange(handler: FileIdChangeHandler) {
        this.notifyImgIdChanged = handler;
    }

    /** `ControlValueAccessor` implementation */
    registerOnTouched() {}
}
