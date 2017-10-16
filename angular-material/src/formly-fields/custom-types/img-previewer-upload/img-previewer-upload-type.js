"use strict";
var mdImagePreviewUpload = (function () {
    function mdImagePreviewUpload(formlyConfigProvider) {
        this.formlyConfigProvider = formlyConfigProvider;
        this.template = require('!!raw-loader!./img-previewer-upload-type.html');
        this.setType();
    }
    mdImagePreviewUpload.prototype.setType = function () {
        var formlyOptions = {
            template: this.template,
            name: 'Image-Preview-Uploader',
            wrapper: ['messages', 'inputContainer'],
            defaultOptions: {
                templateOptions: {
                    disabled: false
                },
                ngModelAttrs: {
                    disabled: {
                        bound: 'ng-disabled'
                    }
                }
            }
        };
        this.formlyConfigProvider.setType(formlyOptions);
    };
    return mdImagePreviewUpload;
}());
exports.mdImagePreviewUpload = mdImagePreviewUpload;
//# sourceMappingURL=img-previewer-upload-type.js.map