
import * as angular from 'angular';
const croppie: any = require('croppie/croppie.js');
import { APP_MODULE } from '../../main/index';
import { DeBounce } from '../../helpers/debounce';
import { ISizeDimensions } from './interfaces/isizedimensions';
import { ICroppedResults } from './interfaces/icroppedresults';


const percentageSizeAdapt = 0.8;
const marginOffset = (24 * 2);
namespace Components.ImgCropper {

    class ImgCropperCtrl {
        mdlSrc: any;
        mdlViewport: ISizeDimensions;
        mdlBoundry: ISizeDimensions;
        type: string;
        ngModel: ICroppedResults;

        static $inject = ['$scope', '$timeout', '$element', '$window']
        croppOptions: any;
        cropper: any;
        constructor(private $scope : angular.IScope, private $timeout: angular.ITimeoutService, private $element: angular.IAugmentedJQuery, private $window: angular.IWindowService) {
            this.Init();
        }
        Init() {
    
            this.croppOptions = {
                enableExif: true,
                viewport: {
                    width: this.mdlViewport.w,
                    height: this.mdlViewport.h,
                    type: this.type || 'square'
                },
                boundary: {
                    width: this.mdlBoundry.w,
                    height: this.mdlBoundry.h,
                },
                showZoom: true,
                mouseWheelZoom: true,
                update: this.onUpdate
              
            }
            this.$timeout(this.initBoundurySize, 450);
            this.onResize = DeBounce(this.onResize, 100);
            angular.element(this.$window).on('resize', this.onResize);
            this.$scope.$on('$destroy', this.$destroy);
        }
        $destroy = () => {
            angular.element(this.$window).off('resize', this.onResize);
            this.cropper.destroy();
        }

        bindCropper() {
            let that = this;
            this.cropper = new croppie(this.$element[0], this.croppOptions);
            this.cropper.bind(this.mdlSrc.$ngfBlobUrl).then(() => {
                that.$timeout(that.formulateSizeConstrains, 50);
                that.$timeout(that.readAdjustZoom, 60);
            });
        }
       
        initBoundurySize = () =>  {
            const modalItem: HTMLDivElement = document.querySelector('.md-dialog-content') as HTMLDivElement;
            const totalWidth = document.body.clientWidth;
            if (!!modalItem) {
                if ((this.croppOptions.boundary.width) > modalItem.offsetWidth) {
                    const size = modalItem.offsetWidth * percentageSizeAdapt
                    this.croppOptions.boundary.width = size;
                    modalItem.style.width = size + 'px';
                    console.log(this.croppOptions.boundary.width);
                }
                if (this.croppOptions.boundary.height >= 350) {
                    this.croppOptions.boundary.height = 350;
                }
                if (modalItem.offsetWidth > totalWidth) {
                    const size = 310;
                    this.croppOptions.boundary.width = size;
                    modalItem.style.width = size + 'px';
                    console.log(size);
                    console.log('this happen');
                }
            }
            this.bindCropper();

        }
        readAdjustZoom = () => {
            const currentZoom = this.cropper._currentZoom;
            this.cropper.setZoom(currentZoom + 0.2);
        }
        formulateSizeConstrains() {
            const boundary = document.querySelector('.cr-boundary');
            const modalItem = document.querySelector('.md-dialog-content');
            if (!!boundary && !!modalItem) {
                
                // can be responsive

            }
        }
        onUpdate = (cropp: any) => {
            let that = this;
            this.cropper.result('canvas').then((img: any) => {
                that.ngModel = <ICroppedResults>{
                    img, 
                    dimensions: that.cropper.get(),
                    viewport: that.mdlViewport,
                    originalFile: that.mdlSrc
                }
            });
        }
       
        onResize() {
            console.log('resised');
        }

        onSizeChange() {
        }

   

    }

    function mdlImgCropper() {
        return <angular.IDirective>{
            restrict: 'E',
            scope: {
                mdlSrc: '=',
                mdlViewport: '=',
                mdlBoundry: '=',
                type: '@',
                ngModel: '='
              
            },
            bindToController: true,
            controller: ImgCropperCtrl,
            controllerAs: 'vm',
            link: (scope, el, attrs, ctrl) => {
                console.log(ctrl);
            }
            
        }

    }

    APP_MODULE.directive('mdlImgCropper', mdlImgCropper);

}