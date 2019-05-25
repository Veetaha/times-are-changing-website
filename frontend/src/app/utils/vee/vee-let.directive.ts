import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

export class VeeLetContext<TValue> {
    $implicit!: TValue;
    veeLet!:    TValue;
}

@Directive({ 
    selector: '[veeLet]'
})
    export class VeeLetDirective<TValue> implements OnInit {

    private readonly context = new VeeLetContext<TValue>();
    
    @Input() set veeLet(value: TValue) {
        this.context.$implicit = this.context.veeLet = value;
    }


    constructor(
        private readonly vcr:         ViewContainerRef, 
        private readonly templateRef: TemplateRef<VeeLetContext<TValue>>
    ) {}

    ngOnInit() {
        this.vcr.createEmbeddedView(this.templateRef, this.context);
    }
}