

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
        static $inject = ['$timeout', '$element', 'ImgCropperDialogService', '$q']
        ngModelController: angular.INgModelController;
        mdAspectRatio: IAspectRatio;
        mdButtonUpload: any;
        mdClass: string;
        $ngfValidations: IModelValidators[];
        mdOnFileSelect: Function;
        mdOnValidationChange: Function;
        Loading: boolean;
        constructor(private $timeout: angular.ITimeoutService, private $element: angular.IAugmentedJQuery, private ImgCropperDialogService: IImageCropperDialogService,
            private $q: angular.IQService
        ) {
            this.Init();

        }
        Init = () => {
            this.Loading = false;
            this.ngModelController = this.$element.controller('ngModel');
            if (!!!this.mdAspectRatio) {
                throw 'mg-image-uploader-cropper component must have size restriction md-size-limit';
            }
            
            //console.log(this.ngModelController.$modelValue);
            //console.log(this.ngModelController.$viewValue)
            
        }
        onClick = () => {
            this.Loading = true;
            this.$timeout(() => {
                this.Loading = false;
            }, 1500)
        }
        onFileSelect = ($file: any) => {
            if (!!$file) {
                const viewPort = this.mdAspectRatio as ISizeDimensions;
                this.ImgCropperDialogService.Show($file, viewPort).then((R: ICroppedResults) => {

                    
                    this.ngModelController.$setViewValue(R)
                    this.executeOnSelectedCallBack(R);

                }).catch((e) => {

                    this.Loading = false;

                });
            }
            else {
                
            }
            this.$timeout(this.$validate, 100);
        }
        executeOnSelectedCallBack = ($file: ICroppedResults) => {
            if (!!this.mdOnFileSelect) {
                this.Loading = false;
                this.mdOnFileSelect.call(this, { $file });
            }
        }
        $validate = () => {


                const buttonUpload = this.$element[0].querySelector('button[ngf-select]');
                const buController: angular.INgModelController = angular.element(buttonUpload).data().$ngModelController;
                const validators: IModelValidators[] = (buController as any).$ngfValidations;
                this.$ngfValidations = validators;
               

                validators.forEach((item, index) => {
                   
                    this.ngModelController.$setValidity(item.name, item.valid);
                });

                const $validators = validators; /*validators.filter((item) => { return item.valid == false });*/
                this.mdOnValidationChange.call(this, { $validators })
          
           

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
            require: 'ngModel',
            scope: {
               ngModel : '=',
               mdAspectRatio: '=',
               mdClass: '@',
               mdOnFileSelect: '&',
               mdOnValidationChange: '&'
            }

        }

    }

    APP_MODULE.directive('mdImageUploadCropper', mdImageUploadCropper);
}