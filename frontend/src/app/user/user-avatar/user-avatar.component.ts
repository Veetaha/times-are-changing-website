import { Nullable } from 'ts-typedefs';
import { Component, Input } from '@angular/core';

import { ImageService } from '@app/common/image/image.service';

@Component({
    selector:    'app-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls:  ['./user-avatar.component.scss']
})
export class UserAvatarComponent {
    @Input() userLogin: Nullable<string> = null;
    @Input() set avatarImgId(value: string) {
        this.userAvatarUrl = this.images.getImgUrlFromId(value);
    }

    userAvatarUrl!: string;

    constructor(private readonly images: ImageService) {}
}