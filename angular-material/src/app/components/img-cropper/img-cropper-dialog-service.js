"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var Services;
    (function (Services) {
        var ImageCropperDialogCtrl = (function () {
            function ImageCropperDialogCtrl($mdDialog, File, CropperViewPort, $timeout) {
                this.$mdDialog = $mdDialog;
                this.File = File;
                this.CropperViewPort = CropperViewPort;
                this.$timeout = $timeout;
            }
            ImageCropperDialogCtrl.prototype.Init = function () {
                this.working = false;
            };
            ImageCropperDialogCtrl.prototype.onClick = function () {
                var _this = this;
                this.working = true;
                this.$timeout(function () {
                    _this.$mdDialog.hide(_this.image);
                }, 500);
            };
            ImageCropperDialogCtrl.prototype.onCancel = function () {
                this.$mdDialog.cancel();
            };
            ImageCropperDialogCtrl.$inject = ['$mdDialog', 'File', 'CropperViewPort', '$timeout'];
            return ImageCropperDialogCtrl;
        }());
        var template = require('!!raw-loader!./img-cropper-dialog.html');
        var ImgCropperDialogService = (function () {
            function ImgCropperDialogService($mdDialog, $timeout, $q) {
                this.$mdDialog = $mdDialog;
                this.$timeout = $timeout;
                this.$q = $q;
            }
            ImgCropperDialogService.prototype.Show = function (File, CropperViewPort, $event) {
                if ($event === void 0) { $event = null; }
                var defer = this.$q.defer();
                this.$mdDialog.show({
                    controller: ImageCropperDialogCtrl,
                    controllerAs: 'vm',
                    template: template,
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: false,
                    bindToController: true,
                    locals: { File: File, CropperViewPort: CropperViewPort }
                }).then(function (R) {
                    defer.resolve(R);
                }, function () {
                    defer.reject();
                });
                return defer.promise;
            };
            ImgCropperDialogService.$inject = ['$mdDialog', '$timeout', '$q'];
            return ImgCropperDialogService;
        }());
        index_1.APP_MODULE.service('ImgCropperDialogService', ImgCropperDialogService);
    })(Services = Components.Services || (Components.Services = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-cropper-dialog-service.js.map