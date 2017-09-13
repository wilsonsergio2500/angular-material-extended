
import { APP_MODULE } from '../../main/index';
import * as angular from 'angular';
import { Services } from '../../services/index';
import { ICroppedResults } from '../img-cropper/interfaces/icroppedresults';

namespace Components.ImageProfileUpload {

    interface IAspectRatio {
        w: number;
        h: number;
    }

    class ImageProfileUpload {
        static $inject = ['$timeout', 'ImgEnums', '$element']
        aspectRatio: IAspectRatio;
        previewImage: any;
        ngModelController: angular.INgModelController;
        ngModel: any;
        constructor(private $timeout: angular.ITimeoutService, private ImgEnums: Services.IImgEnums, private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            this.aspectRatio = <IAspectRatio>{ w: 200, h: 200 };
            if (!!!this.ngModel) {
                this.ngModel = this.ImgEnums.getEnums().MISSING_PROFILE_IMAGE; 
            }
            
            this.ngModelController = this.$element.controller('ngModel');
        }
        onFileChange = ($file: ICroppedResults) => {
            if (!!$file) {
                this.ngModelController.$setViewValue($file.img);
            }
            console.log('img-profile-change', $file);
        }
    }

    const template = require('!!raw-loader!./img-profile-upload.html');

    function mdImageProfileUpload() {
        return <angular.IDirective>{
            controller: ImageProfileUpload,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            require: 'ngModel',
            scope: {
                ngModel: '='
            }
        }
    }

    APP_MODULE.directive('mdImageProfileUpload', mdImageProfileUpload);
}