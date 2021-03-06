﻿import { IImageCropperDialogService } from '../../../../components/img-cropper/img-cropper-dialog-service';
import { ISizeDimensions } from '../../../../components/img-cropper/interfaces/isizedimensions';
import { Services } from '../../../../services/index';
import { IMdCheckAnimationRef } from '../../../../components/check/check-animation';

import * as angular from 'angular';

interface IChipModelExample {
    name: string;
    id: number | string;
}


export class ComponentTest {

    

    static $inject = ['ImgCropperDialogService', '$q', '$timeout', 'ImgEnums']
    previewImg: any;
    textEditorModel: any;
    LoadingPanelShow: boolean;
    ChipModels: any[];
    chipItems: any[];
    acheck: IMdCheckAnimationRef;
    working: boolean;

    value: number;
    constructor(private ImgCropperDialogService: IImageCropperDialogService, private $q: angular.IQService, private $timeout: angular.ITimeoutService, private ImgEnums: Services.IImgEnums ) {
        this.Init();
    }
    Init() {
        this.previewImg = {};
        this.LoadingPanelShow = true;
        this.ChipModels = this.getModels();
        this.chipItems = [];
        this.previewImg.img = this.ImgEnums.getEnums().MISSING_POST_IMAGE;

        this.value = 1;
        this.working = false;
    }

    onSelectFile(file: any) {
        //console.log(file);
        const viewport = <ISizeDimensions>{ w: 300, h: 135 };
        this.ImgCropperDialogService.Show(file, viewport).then((R) => {
            this.previewImg = R;
            console.log(R);
        });
    }

    thumbsUpLike(query: string) {
        let defer = this.$q.defer();
        this.$timeout(() => {
            defer.resolve(true);
            console.log(query);
        }, 1000);
        return defer.promise;
    }
    thumbUpUnlike(query: string) {
        let defer = this.$q.defer();
        this.$timeout(() => {
            defer.resolve(true);
            console.log(query);
        }, 1000);
        return defer.promise;
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

    onClick() {

        this.working = true;

        this.$timeout(() => {
            this.working = false;
        }, 8000)
    }

}