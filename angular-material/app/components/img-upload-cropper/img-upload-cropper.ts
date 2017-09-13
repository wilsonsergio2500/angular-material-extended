

import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { IImageCropperDialogService } from '../img-cropper/img-cropper-dialog-service';
import { ISizeDimensions } from '../img-cropper/interfaces/isizedimensions';
import { ICroppedResults } from '../img-cropper/interfaces/icroppedresults';

namespace Components.ImageUpload {

    export interface IAspectRatio {
        w: number;
        h: number;
    }
    interface IModelValidators {
        name: string;
        valid: boolean;
    }
    export class ImageUploadCropper{
        static $inject = ['$timeout', '$element', 'ImgCropperDialogService']
        ngModelController: angular.INgModelController;
        mdAspectRatio: IAspectRatio;
        mdButtonUpload: any;
        mdClass: string;
        
        constructor(private $timeout: angular.ITimeoutService, private $element: angular.IAugmentedJQuery, private ImgCropperDialogService : IImageCropperDialogService ) {
            this.Init();

        }
        Init = () => {
            this.ngModelController = this.$element.controller('ngModel');
            if (!!!this.mdAspectRatio) {
                throw 'mg-image-uploader-cropper component must have size restriction md-size-limit';
            }
        }
        onFileSelect = ($file: any) => {
            if (!!$file) {
                const viewPort = this.mdAspectRatio as ISizeDimensions;
                this.ImgCropperDialogService.Show($file, viewPort).then((R: ICroppedResults) => {
                    console.log(R);
                    this.ngModelController.$setViewValue(R);
                    setTimeout(this.$validate, 5);
                });
            }
            setTimeout(this.$validate, 5);
        }
        $validate = () => {
            const buttonUpload = this.$element[0].querySelector('button[ngf-select]');
            const buController: angular.INgModelController = angular.element(buttonUpload).data().$ngModelController;
            const validators: IModelValidators[] = (buController as any).$ngfValidations;
            validators.forEach((item, index) => {
                this.ngModelController.$setValidity(item.name, item.valid);
            });
        }
    }

    const template = require('!!raw-loader!./img-upload-cropper.html');


    function mdImageUploadCropper(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: ImageUploadCropper,
            transclude: true,
            scope: {
                mdAspectRatio: '=',
               mdClass: '@',
            }

        }

    }

    APP_MODULE.directive('mdImageUploadCropper', mdImageUploadCropper);
}