"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var ImageUpload;
    (function (ImageUpload) {
        var ImageUploadCropper = (function () {
            function ImageUploadCropper($timeout, $element, ImgCropperDialogService) {
                var _this = this;
                this.$timeout = $timeout;
                this.$element = $element;
                this.ImgCropperDialogService = ImgCropperDialogService;
                this.Init = function () {
                    _this.ngModelController = _this.$element.controller('ngModel');
                    if (!!!_this.mdAspectRatio) {
                        throw 'mg-image-uploader-cropper component must have size restriction md-size-limit';
                    }
                };
                this.onFileSelect = function ($file) {
                    if (!!$file) {
                        var viewPort = _this.mdAspectRatio;
                        _this.ImgCropperDialogService.Show($file, viewPort).then(function (R) {
                            console.log(R);
                            _this.executeOnSelectedCallBack(R);
                        });
                    }
                    setTimeout(_this.$validate, 5);
                };
                this.executeOnSelectedCallBack = function ($file) {
                    if (!!_this.mdOnFileSelect) {
                        _this.mdOnFileSelect.call(_this, { $file: $file });
                    }
                };
                this.$validate = function () {
                    var buttonUpload = _this.$element[0].querySelector('button[ngf-select]');
                    var buController = angular.element(buttonUpload).data().$ngModelController;
                    var validators = buController.$ngfValidations;
                    _this.$ngfValidations = validators;
                    console.log(validators);
                    validators.forEach(function (item, index) {
                        _this.ngModelController.$setValidity(item.name, item.valid);
                    });
                };
                this.Init();
            }
            ImageUploadCropper.$inject = ['$timeout', '$element', 'ImgCropperDialogService'];
            return ImageUploadCropper;
        }());
        ImageUpload.ImageUploadCropper = ImageUploadCropper;
        var template = require('!!raw-loader!./img-upload-cropper.html');
        function mdImageUploadCropper() {
            return {
                template: template,
                bindToController: true,
                controllerAs: 'vm',
                controller: ImageUploadCropper,
                transclude: true,
                scope: {
                    mdAspectRatio: '=',
                    mdClass: '@',
                    mdOnFileSelect: '&'
                }
            };
        }
        index_1.APP_MODULE.directive('mdImageUploadCropper', mdImageUploadCropper);
    })(ImageUpload = Components.ImageUpload || (Components.ImageUpload = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-upload-cropper.js.map