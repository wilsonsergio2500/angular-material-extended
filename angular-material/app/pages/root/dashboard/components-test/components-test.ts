import { IImageCropperDialogService } from '../../../../components/img-cropper/img-cropper-dialog-service';
import { ISizeDimensions } from '../../../../components/img-cropper/interfaces/isizedimensions';

export class ComponentTest {

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
        //this.textEditorModel = 'hello';
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