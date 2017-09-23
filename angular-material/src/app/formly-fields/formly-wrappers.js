"use strict";
var Wrappers;
(function (Wrappers) {
    Wrappers.FlexSize = function (width) {
        return "flex-" + width + " flex-xs-100 flex-sm-100";
    };
    Wrappers.FlexCenter50 = function () {
        return 'flex-gt-sm-50 flex-offset-gt-sm-25 layout-column flex-100';
    };
    Wrappers.FlexPadding = function () {
        return 'layout-padding';
    };
    Wrappers.RowWrapper = function (Fields) {
        var config = {
            className: 'layout-row layout-xs-column layout-sm-column',
            fieldGroup: Fields
        };
        return config;
    };
    Wrappers.ColumnWrapper = function (Fields) {
        var config = {
            className: 'layout-column',
            fieldGroup: Fields
        };
        return config;
    };
})(Wrappers = exports.Wrappers || (exports.Wrappers = {}));
//# sourceMappingURL=formly-wrappers.js.map