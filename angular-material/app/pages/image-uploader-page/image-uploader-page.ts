
import * as angular from 'angular';

export class ImageUploaderPage {

    constructor() {

    }
    onSelectFile(file: any) {
        console.log('fired');
        console.log(file);
    }

}