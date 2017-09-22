
import { APP_MODULE } from '../../main/index';
import * as angular from 'angular';
import { Services } from '../../services/index';
import { ICroppedResults } from '../img-cropper/interfaces/icroppedresults';
import { AngularWatch } from '../../helpers/angularwatch';
import { ImageEnums } from '../../services/img-enums/imgenums';

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
        // PROFILE OR IMAGE
        mdImageType: string; 
        constructor(private $scope: angular.IScope, private $timeout: angular.ITimeoutService,  private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            if (!!!this.ngModel) {

                const type: string = this.mdImageType || IMAGE_TYPES.IMAGE;
                const value = ImageEnums.ENUMS[type];
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

    const template = require('!!raw-loader!./img-profile-upload.html');

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