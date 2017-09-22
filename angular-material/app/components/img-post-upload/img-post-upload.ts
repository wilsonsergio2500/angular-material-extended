
import { APP_MODULE } from '../../main/index';
import { ICroppedResults } from '../img-cropper/interfaces/icroppedresults';
import { Services } from '../../services/index';
import * as angular from 'angular';

namespace Components.ImagePostUpload {

    interface IAspectRatio {
        w: number;
        h: number;
    }
    interface IModelValidators {
        name: string;
        valid: boolean;
    }

    class ImagePostUpload {
        static $inject = ['$scope', '$timeout', 'ImgEnums', '$element']
        aspectRatio: IAspectRatio;
        previewImage: any;
        ngModelController: angular.INgModelController;
        ngModel: any;
        constructor(private $scope: angular.IScope, private $timeout: angular.ITimeoutService, private ImgEnums: Services.IImgEnums, private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            this.aspectRatio = <IAspectRatio>{ w: 300, h: 135 };
            if (!!!this.ngModel) {
                this.ngModel = this.ImgEnums.getEnums().MISSING_POST_IMAGE;
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

    const template = require('!!raw-loader!./img-post-upload.html');

    function mdImagePostUpload() {
        return <angular.IDirective>{
            controller: ImagePostUpload,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            require: 'ngModel',
            scope: {
                ngModel: '='
            }
        }
    }

    APP_MODULE.directive('mdImagePostUpload', mdImagePostUpload);

}