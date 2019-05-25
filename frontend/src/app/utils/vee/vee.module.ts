import { NgModule } from '@angular/core';

import { VeeLetDirective } from './vee-let.directive';

@NgModule({
    declarations: [VeeLetDirective],
    exports:      [VeeLetDirective]
})
export class VeeModule {}