"use strict";
var index_1 = require('../../main/index');
var angular = require('angular');
var Components;
(function (Components) {
    var ImageProfileUpload;
    (function (ImageProfileUpload_1) {
        var ImageProfileUpload = (function () {
            function ImageProfileUpload($scope, $timeout, ImgEnums, $element) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.ImgEnums = ImgEnums;
                this.$element = $element;
                this.Init = function () {
                    _this.aspectRatio = { w: 200, h: 200 };
                    if (!!!_this.ngModel) {
                        _this.ngModel = _this.ImgEnums.getEnums().MISSING_PROFILE_IMAGE;
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
            ImageProfileUpload.$inject = ['$scope', '$timeout', 'ImgEnums', '$element'];
            return ImageProfileUpload;
        }());
        var template = require('!!raw-loader!./img-profile-upload.html');
        function mdImageProfileUpload() {
            return {
                controller: ImageProfileUpload,
                controllerAs: 'vm',
                bindToController: true,
                template: template,
                require: 'ngModel',
                scope: {
                    ngModel: '='
                }
            };
        }
        index_1.APP_MODULE.directive('mdImageProfileUpload', mdImageProfileUpload);
    })(ImageProfileUpload = Components.ImageProfileUpload || (Components.ImageProfileUpload = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-profile-upload.js.map