"use strict";
var angular = require('angular');
var croppie = require('croppie/croppie.js');
var index_1 = require('../../main/index');
var debounce_1 = require('../../helpers/debounce');
var percentageSizeAdapt = 0.8;
var marginOffset = (24 * 2);
var Components;
(function (Components) {
    var ImgCropper;
    (function (ImgCropper) {
        var ImgCropperCtrl = (function () {
            function ImgCropperCtrl($scope, $timeout, $element, $window) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$element = $element;
                this.$window = $window;
                this.$destroy = function () {
                    angular.element(_this.$window).off('resize', _this.onResize);
                    _this.cropper.destroy();
                };
                this.initBoundurySize = function () {
                    var modalItem = document.querySelector('.md-dialog-content');
                    var totalWidth = document.body.clientWidth;
                    if (!!modalItem) {
                        if ((_this.croppOptions.boundary.width) > modalItem.offsetWidth) {
                            var size = modalItem.offsetWidth * percentageSizeAdapt;
                            _this.croppOptions.boundary.width = size;
                            modalItem.style.width = size + 'px';
                            console.log(_this.croppOptions.boundary.width);
                        }
                        if (_this.croppOptions.boundary.height >= 350) {
                            _this.croppOptions.boundary.height = 350;
                        }
                        if (modalItem.offsetWidth > totalWidth) {
                            var size = 310;
                            _this.croppOptions.boundary.width = size;
                            modalItem.style.width = size + 'px';
                            console.log(size);
                            console.log('this happen');
                        }
                    }
                    _this.bindCropper();
                };
                this.readAdjustZoom = function () {
                    var currentZoom = _this.cropper._currentZoom;
                    _this.cropper.setZoom(currentZoom + 0.2);
                };
                this.onUpdate = function (cropp) {
                    var that = _this;
                    _this.cropper.result('canvas').then(function (img) {
                        that.ngModel = {
                            img: img,
                            dimensions: that.cropper.get(),
                            viewport: that.mdlViewport,
                            originalFile: that.mdlSrc
                        };
                    });
                };
                this.Init();
            }
            ImgCropperCtrl.prototype.Init = function () {
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
                };
                this.$timeout(this.initBoundurySize, 450);
                this.onResize = debounce_1.DeBounce(this.onResize, 100);
                angular.element(this.$window).on('resize', this.onResize);
                this.$scope.$on('$destroy', this.$destroy);
            };
            ImgCropperCtrl.prototype.bindCropper = function () {
                var that = this;
                this.cropper = new croppie(this.$element[0], this.croppOptions);
                this.cropper.bind(this.mdlSrc.$ngfBlobUrl).then(function () {
                    that.$timeout(that.formulateSizeConstrains, 50);
                    that.$timeout(that.readAdjustZoom, 60);
                });
            };
            ImgCropperCtrl.prototype.formulateSizeConstrains = function () {
                var boundary = document.querySelector('.cr-boundary');
                var modalItem = document.querySelector('.md-dialog-content');
                if (!!boundary && !!modalItem) {
                }
            };
            ImgCropperCtrl.prototype.onResize = function () {
                console.log('resised');
            };
            ImgCropperCtrl.prototype.onSizeChange = function () {
            };
            ImgCropperCtrl.$inject = ['$scope', '$timeout', '$element', '$window'];
            return ImgCropperCtrl;
        }());
        function mdlImgCropper() {
            return {
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
                link: function (scope, el, attrs, ctrl) {
                    console.log(ctrl);
                }
            };
        }
        index_1.APP_MODULE.directive('mdlImgCropper', mdlImgCropper);
    })(ImgCropper = Components.ImgCropper || (Components.ImgCropper = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-cropper.js.map