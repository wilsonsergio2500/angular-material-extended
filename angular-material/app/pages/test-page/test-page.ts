import { IImageCropperDialogService } from '../../components/img-cropper/img-cropper-dialog-service';
import { ISizeDimensions } from '../../components/img-cropper/interfaces/isizedimensions';

import * as angular from 'angular';

export class TestPage {
    static $inject = ['ImgCropperDialogService']
    previewImg: any;
    textEditorModel: any;
    LoadingPanelShow: boolean;
    constructor(private ImgCropperDialogService: IImageCropperDialogService) {
        this.Init();
    }
    Init() {
        this.previewImg = null;
        this.LoadingPanelShow = true;
    }

    onSelectFile(file: any) {
        console.log(file);
        const viewport = <ISizeDimensions>{ w: 300, h: 135 };
        this.ImgCropperDialogService.Show(file, viewport).then((R) => {
            this.previewImg = R;
            console.log(R);
        });
    }
}