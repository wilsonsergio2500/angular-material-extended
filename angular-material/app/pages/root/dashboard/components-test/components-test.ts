import { IImageCropperDialogService } from '../../../../components/img-cropper/img-cropper-dialog-service';
import { ISizeDimensions } from '../../../../components/img-cropper/interfaces/isizedimensions';

import * as angular from 'angular';

interface IChipModelExample {
    name: string;
    id: number | string;
}

export class ComponentTest {

    

    static $inject = ['ImgCropperDialogService', '$q', '$timeout']
    previewImg: any;
    textEditorModel: any;
    LoadingPanelShow: boolean;
    ChipModels: any[];
    chipItems: any[];
    constructor(private ImgCropperDialogService: IImageCropperDialogService, private $q: angular.IQService, private $timeout: angular.ITimeoutService) {
        this.Init();
    }
    Init() {
        this.previewImg = null;
        this.LoadingPanelShow = true;
        this.ChipModels = this.getModels();
        this.chipItems = [];
        
    }

    onSelectFile(file: any) {
        console.log(file);
        const viewport = <ISizeDimensions>{ w: 300, h: 135 };
        this.ImgCropperDialogService.Show(file, viewport).then((R) => {
            this.previewImg = R;
            console.log(R);
        });
    }

  

    getModels = () => {
        const models: IChipModelExample[] = [
            { name: 'sergio', id: 1 },
            { name: 'gioboy', id: 2 },
            { name: 'gioboy12', id: 3 },
            { name: 'giogoi', id: 4 }
        ];

        return models;
    }

    getQuery = (query : string) : angular.IPromise<IChipModelExample[]> => {

       return this.$q((resolve : angular.IQResolveReject<IChipModelExample[]>, reject : angular.IQResolveReject<any>) => {
            this.$timeout(() => {

                console.log(query);
                resolve(this.getModels());

            }, 200);
        });
    }

}