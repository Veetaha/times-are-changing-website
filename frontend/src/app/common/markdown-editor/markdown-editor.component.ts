import { Func                  } from 'ts-typedefs';
import { Component, forwardRef, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { EditorOption, AngularMarkdownEditorComponent, EditorLocale } 
from 'angular-markdown-editor';

import { ConfigService } from '@app/config/config.service';

@Component({
    selector:    'app-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls:  ['./markdown-editor.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MarkdownEditorComponent),
        multi: true
    }]
})
export class MarkdownEditorComponent implements ControlValueAccessor {
    @Input() textareaId?: string;
    @Input() rows = 12;
    @Input() locale?: EditorLocale;

    @ViewChild('editor') editor!: AngularMarkdownEditorComponent;
    editorOptions: EditorOption;

    constructor(config: ConfigService) { 
        this.editorOptions = config.markdownEditorOptions;
    }

    writeValue(markdownMarkup: string) {
        this.editor.writeValue(markdownMarkup);
    }
    registerOnChange(fn: Func): void {
        this.editor.registerOnChange(fn);
    }
    registerOnTouched(fn: Func): void {
        this.editor.registerOnTouched(fn);
    }
}
