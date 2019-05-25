import { Injectable, PipeTransform } from '@nestjs/common';

import { ResolveContext } from '@modules/common/resolve-context.class';

@Injectable()
export class GetClientPipe implements PipeTransform {
    transform(resolveCtx: ResolveContext) {
        return resolveCtx.getClient();
    }
}