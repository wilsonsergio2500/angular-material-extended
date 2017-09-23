
import { APP_MODULE } from '../../main/index';
import * as angular from 'angular';
import { Services } from '../../services/index';
import { ICroppedResults } from '../img-cropper/interfaces/icroppedresults';
import { AngularWatch } from '../../helpers/angularwatch';
import { ImageEnums } from '../../services/img-enums/imgenums';

/**
 usage:
<md-image-preview-upload ng-model="vm.imgpu"  md-aspect-ratio="{w: 300, h: 135}" md-image-type="MISSING_PROFILE_IMAGE"></md-image-preview-upload>
 */

namespace Components.ImagePreviewUpload {

    export const IMAGE_TYPES = {
        PROFILE: 'MISSING_PROFILE_IMAGE',
        IMAGE : 'MISSING_POST_IMAGE'
        
    }

    interface IAspectRatio {
        w: number;
        h: number;
    }
    interface IModelValidators {
        name: string;
        valid: boolean;
    }

    class ImagePreviewUpload {
        static $inject = ['$scope', '$timeout', '$element']
        mdAspectRatio: IAspectRatio;
        previewImage: any;
        ngModelController: angular.INgModelController;
        ngModel: string;
        // MISSING_PROFILE_IMAGE OR MISSING_POST_IMAGE
        mdImageType: string; 
        constructor(private $scope: angular.IScope, private $timeout: angular.ITimeoutService,  private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            if (!!!this.ngModel) {
                console.log(this.mdImageType);
                const type: string = this.mdImageType || IMAGE_TYPES.IMAGE;
                const value = ImageEnums.ENUMS[type];
                console.log('type', type);
                this.ngModel = value;
            }

            this.ngModelController = this.$element.controller('ngModel');

        }
        onFileChange = ($file: ICroppedResults) => {
            if (!!$file) {
                this.ngModelController.$setViewValue($file.img);
            }
            this.$timeout(this.setValidator, 6);
        }
        setValidator = () => {
            const uploadCropperComponent = this.$element[0].querySelector('md-image-upload-cropper');
            const uploadCropperController = angular.element(uploadCropperComponent).data().$mdImageUploadCropperController;
            const validators: IModelValidators[] = (uploadCropperController as any).$ngfValidations;
            validators.forEach((item, index) => {
                this.ngModelController.$setValidity(item.name, item.valid);
            });
            console.log(validators);
        }

    }

    const template = require('!!raw-loader!./img-previewer-upload.html');

    function mdImagePreviewUpload() {
        return <angular.IDirective>{
            controller: ImagePreviewUpload,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            require: 'ngModel',
            scope: {
                ngModel: '=',
                mdAspectRatio: '=',
                mdImageType: '@'
            }
        }
    }

    APP_MODULE.directive('mdImagePreviewUpload', mdImagePreviewUpload);
}