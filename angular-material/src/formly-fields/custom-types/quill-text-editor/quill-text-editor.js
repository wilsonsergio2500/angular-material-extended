"use strict";
var quillTextEditor = (function () {
    function quillTextEditor(formlyConfigProvider) {
        this.formlyConfigProvider = formlyConfigProvider;
        this.template = require('!!raw-loader!./quill-text-editor.html');
        this.setType();
    }
    quillTextEditor.prototype.setType = function () {
        var formlyOptions = {
            template: this.template,
            name: 'quillTextEditor',
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
    return quillTextEditor;
}());
exports.quillTextEditor = quillTextEditor;
//# sourceMappingURL=quill-text-editor.js.map