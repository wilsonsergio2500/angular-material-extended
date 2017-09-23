"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var ImageUploader;
    (function (ImageUploader_1) {
        var ImageUploader = (function () {
            function ImageUploader($timeout) {
                var _this = this;
                this.$timeout = $timeout;
                this.onFileSelect = function ($file) {
                    if (!!_this.mdOnFileSelect) {
                        if (!!$file) {
                            _this.mdOnFileSelect.call(_this, { file: $file });
                        }
                    }
                };
                this.Init();
            }
            ImageUploader.prototype.Init = function () {
                if (!!!this.mdSizeLimit) {
                    throw 'mg-image-uploader component must have size restriction md-size-limit';
                }
                this.SizeLimit = this.mdSizeLimit;
            };
            ImageUploader.$inject = ['$timeout'];
            return ImageUploader;
        }());
        var template = require('!!raw-loader!./image-uploader.html');
        function mdImageUploader() {
            return {
                template: template,
                controller: ImageUploader,
                controllerAs: 'vm',
                bindToController: true,
                transclude: true,
                scope: {
                    mdClass: '@',
                    mdSizeLimit: '=',
                    mdOnFileSelect: '&'
                }
            };
        }
        index_1.APP_MODULE.directive('mdImageUploader', mdImageUploader);
    })(ImageUploader = Components.ImageUploader || (Components.ImageUploader = {}));
})(Components || (Components = {}));
//# sourceMappingURL=img-uploader.js.map