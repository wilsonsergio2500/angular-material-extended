"use strict";
var mdChipItemType = (function () {
    function mdChipItemType(formlyConfigProvider) {
        this.formlyConfigProvider = formlyConfigProvider;
        this.template = require('!!raw-loader!./chip-item-type.html');
        this.setType();
    }
    mdChipItemType.prototype.setType = function () {
        var formlyOptions = {
            template: this.template,
            name: 'chipItem',
            wrapper: ['messages', 'inputContainer'],
            defaultOptions: {
                templateOptions: {
                    disabled: false
                },
                ngModelAttrs: {
                    disabled: {
                        bound: 'ng-disabled'
                    },
                }
            }
        };
        this.formlyConfigProvider.setType(formlyOptions);
    };
    return mdChipItemType;
}());
exports.mdChipItemType = mdChipItemType;
//# sourceMappingURL=chip-item-type.js.map