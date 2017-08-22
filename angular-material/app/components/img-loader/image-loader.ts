
import * as angular from 'angular';
import { AngularWatch } from '../../helpers/angularwatch';
import { APP_MODULE } from '../../main/index';

namespace Components.ImageLoader {

    class ImageLoader{
        mdlImgSrc: string;
        mdlAspectRationClass: string;
        mdlMaxWidth: string;

        static $inject = ['$scope', '$timeout', '$q', '$element']
        IsReady: boolean;
        ComponentStyle: any;
        mainStyle: any;
        ImgWatcher: AngularWatch;
        constructor(private $scope: angular.IScope, private $timeout: angular.ITimeoutService, private $q: angular.IQService, private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init() {
            this.IsReady = false;
            this.ComponentStyle = {};
            this.mainStyle = {};
            if (!!this.mdlMaxWidth) {
                const width = parseInt(this.mdlMaxWidth);
                this.ComponentStyle['max-width'] = width + 'px';
            }

            this.$timeout(this.onImagChanged, 1);

            let that = this
            this.ImgWatcher = new AngularWatch();
            this.ImgWatcher.Subscribe(this.$scope, () => { return that.mdlImgSrc; }, this.onImagChanged);
            this.$scope.$on('$destroy', this.$onDestroy);
        }
        LoadImage()  : angular.IPromise<boolean> {
            const defer = this.$q.defer();
            if (!!this.mdlImgSrc) {
                let img = new Image();
                img.src = this.mdlImgSrc;
                img.onload = () => {
                    defer.resolve(true);
                }
                img.onerror = () => {
                    defer.reject();
                }

            }
            else {
                defer.reject();
            }
            return defer.promise;
        }

        onImagChanged = (nv: any, ov: any) =>  {
            this.LoadImage().then(() => {
                this.mainStyle = {
                    'background-image': 'url(' + this.mdlImgSrc + ')',
                    'background-size': 'cover'
                }

                this.IsReady = true;
            })
        }

        $onDestroy = () => {
            
            this.ImgWatcher.Unsubscribe();
            
        }
    }

   const template = require('!!raw-loader!./image-loader.html');
    function mdlImageLoader() {
        return <angular.IDirective>{
            template: template,
            controller: ImageLoader,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                mdlImgSrc: '=',
                mdlAspectRatioClass: '@',
                mdlMaxWidth: '@'
            }    
        }
    }

    APP_MODULE.directive('mdlImageLoader', mdlImageLoader);
}