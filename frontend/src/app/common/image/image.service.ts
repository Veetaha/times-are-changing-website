import { Injectable } from '@angular/core';

import { imgIdSchema } from '@common/img-id-schema';

@Injectable({ providedIn: 'root' })
export class ImageService {

    /**
     * Converts image id string into a url that may be safely forwarded to image
     * src attribute: `<img [src]="images.getImgUrlFromId(imgId)">`
     * @param imgId 20 character long hexadecimal uuid string
     */
    getImgUrlFromId(imgId: string) {
        if (!imgIdSchema.test(imgId)) {
            throw new Error(`Invalid image id format: ${imgId}`);
        }
        return `https://ucarecdn.com/${imgId}/`;
    }

}