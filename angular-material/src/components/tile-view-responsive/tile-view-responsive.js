"use strict";
var index_1 = require('../../main/index');
var debounce_1 = require('../../helpers/debounce');
var Components;
(function (Components) {
    var TileViewResponsiveCtrl = (function () {
        function TileViewResponsiveCtrl($scope, ResizeDetectorService, $element, $timeout, $window) {
            var _this = this;
            this.$scope = $scope;
            this.ResizeDetectorService = ResizeDetectorService;
            this.$element = $element;
            this.$timeout = $timeout;
            this.$window = $window;
            this.init = function () {
                console.log(_this.tileOptions);
                _this.container = document.querySelector(_this.tileFitTo);
                if (!!_this.tileDimensions) {
                    _this.dimensionsOrdered = [];
                    _this.dimensionsOrdered = _this.tileDimensions.sort(function (i, b) { return b.minWidth - i.minWidth; });
                }
                _this.OnResizeEventHandler = debounce_1.DeBounce(_this.onResize, 100); //250
                _this.ResizeDetectorService.Subscribe(_this.container, _this.OnResizeEventHandler);
                _this.$scope.$on('$destroy', _this.onDestroy);
            };
            this.onResize = function () {
                var that = _this;
                _this.$timeout(that.fitToContainer, 150).then //150
                (that.bindDimensions);
            };
            this.bindDimensions = function () {
                var that = _this;
                var containerWidth = _this.container.clientWidth;
                if (!!_this.tileDimensions) {
                    _this.tileDimensions.every(function (dimension, index) {
                        if (dimension.minWidth < containerWidth) {
                            var tileWidth_1 = Math.round(containerWidth * 0.96) / dimension.col;
                            that.$timeout(function () { that.tileOptions.setTileWidth(tileWidth_1); }, 50);
                            //console.log('container',containerWidth);
                            //console.log(dimension);
                            //console.log(tileWidth);
                            return false;
                        }
                        return true;
                    });
                }
            };
            this.fitToContainer = function () {
                var that = _this;
                that.$element.children().eq(0).css({
                    width: Math.round(that.container.clientWidth) + 'px',
                    height: Math.round(that.container.clientHeight * 0.99) + 'px'
                });
            };
            this.onDestroy = function () {
                _this.ResizeDetectorService.Unsubscribe(_this.container, _this.OnResizeEventHandler);
            };
            this.init();
        }
        TileViewResponsiveCtrl.$inject = ['$scope', 'ResizeDetectorService', '$element', '$timeout'];
        return TileViewResponsiveCtrl;
    }());
    var template = require('!!raw-loader!./tile-view-responsive.html');
    function tileViewResponsive() {
        return {
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: TileViewResponsiveCtrl,
            scope: {
                tileFitTo: '@',
                tileOptions: '=',
                tileDimensions: '='
            }
        };
    }
    Components.tileViewResponsive = tileViewResponsive;
    index_1.APP_MODULE.directive("tileViewResponsive", tileViewResponsive);
})(Components || (Components = {}));
//# sourceMappingURL=tile-view-responsive.js.map