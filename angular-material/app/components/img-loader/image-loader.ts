
import * as angular from 'angular';
import { AngularWatch } from '../../helpers/angularwatch';
import { APP_MODULE } from '../../main/index';
import { StyleInjector } from '../../helpers/styleinjector';


/**
 usage:
<md-image-loader mdl-img-src="vm.previewImg.img" mdl-aspect-ratio-class="aspect-ratio-9-over-20" mdl-max-width="300px"></md-image-loader>
 */

interface IAspectRatio {
    w: number;
    h: number;
}

namespace Components.ImageLoader {

    class ImageLoader{
        mdImgSrc: string;
        mdAspectRatioClass: string;
        mdMaxWidth: string;
        mdAspectRatio: IAspectRatio;

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
            if (!!!this.mdAspectRatio) {
                throw 'md-image-loader requires md-aspect-ratio';
            }
            if (!!this.mdMaxWidth) {
                const width = parseInt(this.mdMaxWidth);
                this.ComponentStyle['max-width'] = width + 'px';
            }

            const paddingTop = Math.round((this.mdAspectRatio.h / this.mdAspectRatio.w) * 100)
            let styles : any = `{ display: block; content: ''; padding-top: ${paddingTop}%  }`;

            const key = `img-loader-style-ratio-${paddingTop}`;
            const stylename = `.${key}::after`;
            StyleInjector.Create(key, stylename, styles).then(() => {
                this.mdAspectRatioClass = key;
            });
          

            this.$timeout(this.onImagChanged, 1);

            let that = this
            this.ImgWatcher = new AngularWatch();
            this.ImgWatcher.Subscribe(this.$scope, () => { return that.mdImgSrc; }, this.onImagChanged);
            this.$scope.$on('$destroy', this.$onDestroy);
        }
        LoadImage()  : angular.IPromise<boolean> {
            const defer = this.$q.defer();
            if (!!this.mdImgSrc) {
                let img = new Image();
                img.src = this.mdImgSrc;
                img.onload = () => {
                    defer.resolve(true);
                }
                img.onerror = (e) => {
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
                    'background-image': 'url(' + this.mdImgSrc + ')',
                    'background-size': 'cover',
                    'background-position' : 'center'
                }

                this.IsReady = true;
            })
        }

        $onDestroy = () => {
            
            this.ImgWatcher.Unsubscribe();
            
        }
    }

   const template = require('!!raw-loader!./image-loader.html');
    function mdImageLoader() {
        return <angular.IDirective>{
            template: template,
            controller: ImageLoader,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                mdImgSrc: '=',
                mdMaxWidth: '@',
                mdAspectRatio: '='
            }    
        }
    }

    APP_MODULE.directive('mdImageLoader', mdImageLoader);
}