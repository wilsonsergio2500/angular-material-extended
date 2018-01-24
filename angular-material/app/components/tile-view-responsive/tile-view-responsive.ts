
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { Services } from '../../services/index';
import { GridTile, IResponsiveDimension } from './interfaces/index'
import { DeBounce } from '../../helpers/debounce';


namespace Components {

    class TileViewResponsiveCtrl {
        tileFitTo: string;
        tileOptions: GridTile<any>;
        tileDimensions: IResponsiveDimension[];

        dimensionsOrdered: IResponsiveDimension[];
        OnResizeEventHandler: Function;

        static $inject = ['$scope', 'ResizeDetectorService', '$element', '$timeout'];
        private container: Element;
        constructor(private $scope: angular.IScope, private ResizeDetectorService: Services.IResizeDetectorService, private $element: angular.IAugmentedJQuery,
            private $timeout: angular.ITimeoutService, private $window: angular.IWindowService) {
            this.init();
        }
        init = () => {
            //console.log(this.tileOptions);
            this.container = document.querySelector(this.tileFitTo);
            if (!!this.tileDimensions) {
                this.dimensionsOrdered = [];
                this.dimensionsOrdered = this.tileDimensions.sort((i: IResponsiveDimension, b: IResponsiveDimension) => b.minWidth - i.minWidth);
            }
            

            this.OnResizeEventHandler = DeBounce(this.onResize, 100); //250

            this.ResizeDetectorService.Subscribe(this.container, this.OnResizeEventHandler);
            this.$scope.$on('$destroy', this.onDestroy);
        }

        onResize = () => {
            let that = this;

            this.$timeout(that.fitToContainer, 150).then //150
                (that.bindDimensions);
           

        }
        
        bindDimensions = () => {
            let that = this;
            let containerWidth = this.container.clientWidth;
            if (!!this.tileDimensions) {
                this.tileDimensions.every((dimension, index) => {
                    if (dimension.minWidth < containerWidth) {

                        let tileWidth = Math.round(containerWidth * 0.96) / dimension.col;
                        that.$timeout(() => { that.tileOptions.setTileWidth(tileWidth) }, 50);
                        //console.log('container',containerWidth);
                        //console.log(dimension);
                        //console.log(tileWidth);
                        return false;
                    }
                    return true;
                })
                
            }
        }
        fitToContainer = () => {
            let that = this;
            that.$element.children().eq(0).css({
                width: Math.round(that.container.clientWidth )+ 'px',
                height: Math.round(that.container.clientHeight * 0.99) + 'px'
            });
        }
        onDestroy = () => {
            this.ResizeDetectorService.Unsubscribe(this.container, this.OnResizeEventHandler);
        }
    }

    const template = require('!!raw-loader!./tile-view-responsive.html');
    export function tileViewResponsive(): angular.IDirective {

        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: TileViewResponsiveCtrl,
            scope: {
                tileFitTo: '@',
                tileOptions: '=',
                tileDimensions: '='
            }
        }
    }

    APP_MODULE.directive("tileViewResponsive", tileViewResponsive);
}