
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { ICroppedResults } from './interfaces/icroppedresults';
import { ISizeDimensions  } from './interfaces/isizedimensions'


export interface IImageCropperDialogService {
    Show(File: any, CropperViewPort: ISizeDimensions, $event?: any): angular.IPromise<ICroppedResults>;
}



namespace Components.Services {


    class ImageCropperDialogCtrl {
        static $inject = ['$mdDialog', 'File', 'CropperViewPort', '$timeout'];
        image: ICroppedResults;
        working: boolean;
        constructor(private $mdDialog: angular.material.IDialogService, private File: any, private CropperViewPort : ISizeDimensions ,private $timeout: angular.ITimeoutService) {
        }
        Init() {
            this.working = false;
        }
        onClick() {
            this.working = true;
            this.$timeout(() => {
                this.$mdDialog.hide(this.image);
            }, 500);
        }
        onCancel() {
            this.$mdDialog.cancel();
        }
    }


    const template = require('!!raw-loader!./img-cropper-dialog.html');

    class ImgCropperDialogService implements IImageCropperDialogService {

        static $inject = ['$mdDialog', '$timeout', '$q']
        constructor(private $mdDialog: angular.material.IDialogService, private $timeout: angular.ITimeoutService, private $q: angular.IQService) {

        }

        Show(File: any, CropperViewPort: ISizeDimensions, $event: any = null) : angular.IPromise<any> {

            const defer = this.$q.defer();
            this.$mdDialog.show(<angular.material.IDialogOptions>{
                controller: ImageCropperDialogCtrl,
                controllerAs: 'vm',
                template: template,
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                bindToController: true,
                locals: { File, CropperViewPort  }
            }).then((R) => {
                defer.resolve(R);
                }, () => {
                    defer.reject();
                })

            return defer.promise;
        }
    }


    APP_MODULE.service('ImgCropperDialogService', ImgCropperDialogService);

}