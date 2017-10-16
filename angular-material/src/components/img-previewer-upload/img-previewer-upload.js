"use strict";
var index_1 = require('../../main/index');
var angular = require('angular');
var imgenums_1 = require('../../services/img-enums/imgenums');
/**
 usage:
<md-image-preview-upload ng-model="vm.imgpu"  md-aspect-ratio="{w: 300, h: 135}" md-image-type="MISSING_PROFILE_IMAGE"></md-image-preview-upload>
 */
var Components;
(function (Components) {
    var ImagePreviewUpload;
    (function (ImagePreviewUpload_1) {
        ImagePreviewUpload_1.IMAGE_TYPES = {
            PROFILE: 'MISSING_PROFILE_IMAGE',
            IMAGE: 'MISSING_POST_IMAGE'
        };
        var ImagePreviewUpload = (function () {
            function ImagePreviewUpload($scope, $timeout, $element) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$element = $element;
                this.Init = function () {
                    if (!!!_this.ngModel) {
                        console.log(_this.mdImageType);
                        var type = _this.mdImageType || ImagePreviewUpload_1.IMAGE_TYPES.IMAGE;
                        var value = imgenums_1.ImageEnums.ENUMS[type];
                        console.log('type', type);
                        _this.ngModel = value;
                    }
                    _this.ngModelController = _this.$element.controller('ngModel');
                };
                this.onFileChange = function ($file) {
                    if (!!$file) {
                        _this.ngModelController.$setViewValue($file.img);
                    }
                    _this.$timeout(_this.setValidator, 6);
                };
                this.setValidator = function () {
                    var uploadCropperComponent = _this.$element[0].querySelector('md-image-upload-cropper');
                    var uploadCropperController = angular.element(uploadCropperComponent).data().$mdImageUploadCropperController;
                    var validators = uploadCropperController.$ngfValidations;
                    validators.forEach(function (item, index) {
                        _this.ngModelController.$setValidity(item.name, item.valid);
                    });
                    console.log(validators);
                };
                this.Init();
            }
            ImagePreviewUpload.$inject = ['$scope', '$timeout', '$element'];
            return ImagePreviewUpload;
        }());
        var template = require('!!raw-loader!./img-previewer-upload.html');
        function mdImagePreviewUpload() {
            return {
                controller: ImagePreviewUpload,
                controllerAs: 'vm',
                bindToController: true,
                template: template,
                require: 'ngModel',
                scope: {
                    ngModel: '=',
                    mdAspectRatio: '=',
                    mdImageType: '@'
                }
            };
        }
        index_1.APP_MODULE.directive('mdImagePreviewUpload', mdImagePreviewUpload);
    })(ImagePreviewUpload = Components.ImagePreviewUpload || (Components.ImagePreviewUpload = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-previewer-upload.js.map