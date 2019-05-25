import _ from 'lodash';
import { Nullable } from 'ts-typedefs';
import { TemplateRef, ViewContainerRef } from '@angular/core';


import { Disposable } from '@utils/disposable';

export type TrueTemplateRef = TemplateRef<undefined>;
export type ElseTemplateRef = Nullable<TrueTemplateRef>;

export abstract class AbstractIfDirective extends Disposable {
    private state = this.noViewState;

    private noViewState(cond: boolean) {
        if (cond) {
            this.renderTrueBranch(); 
            this.state = this.trueState;
        } else if (this.renderElseBranch()) {
            this.state = this.elseState;
        }
    }
    
    private trueState(cond: boolean) {
        if (cond) return;
        this.clearView();
        if (this.renderElseBranch()) {
            this.state = this.elseState;
        } else {
            this.state =  this.noViewState;
        }
    }
    
    private elseState(cond: boolean) { 
        if (cond) {
            this.clearView();
            this.renderTrueBranch();
            this.state = this.trueState;
        }
    }

    protected abstract getElseTemplateRef(): ElseTemplateRef;

    constructor(
        private readonly trueTemplateRef: TrueTemplateRef,
        private readonly vcr:             ViewContainerRef
    ) {
        super();
    }

    private renderElseBranch() {
        const elseTemplateRef = this.getElseTemplateRef();
        if (elseTemplateRef != null) {
            this.vcr.createEmbeddedView(elseTemplateRef);
            return true;
        }
        return false;
    }

    private renderTrueBranch() {
        this.vcr.createEmbeddedView(this.trueTemplateRef);
    }

    private clearView() {
        this.vcr.clear();
    }

    protected renderIf(shouldRender: boolean) {
        this.state(shouldRender);
    }
}