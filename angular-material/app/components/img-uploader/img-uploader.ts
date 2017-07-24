
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

namespace Components.ImageUploader {

    export interface ISizeLimit {
        w: number;
        h: number;
    }

    class ImageUploader {
        mdSizeLimit: ISizeLimit

        private SizeLimit: ISizeLimit;
        mdOnFileSelect: Function;

        static $inject = ['$timeout']
        constructor(private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init() {
            if (!!!this.mdSizeLimit) {
                throw 'mg-image-uploader component must have size restriction md-size-limit';
            }
            this.SizeLimit = this.mdSizeLimit;
        }
        onFileSelect = ($file: any) =>  {
            if (!!this.mdOnFileSelect) {
                if (!!$file) {
                    this.mdOnFileSelect.call(this, { file: $file });
                }
            }
        }
    }

    const template = require('!!raw-loader!./image-uploader.html');

    function mdImageUploader() {

        return <angular.IDirective>{
            template: template,
            controller: ImageUploader,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            scope: {
                mdClass: '@',
                mdSizeLimit: '=',
                mdOnFileSelect: '&'
            }
        }
    }


    APP_MODULE.directive('mdImageUploader', mdImageUploader);

}