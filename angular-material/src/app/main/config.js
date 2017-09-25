"use strict";
var index_1 = require('./index');
require('angular-material');
var quill_text_editor_1 = require('../formly-fields/custom-types/quill-text-editor/quill-text-editor');
var chip_item_type_1 = require('../formly-fields/custom-types/md-chip-items/chip-item-type');
var img_previewer_upload_type_1 = require('../formly-fields/custom-types/img-previewer-upload/img-previewer-upload-type');
var routes_1 = require('../pages/root/routes');
var Configuration;
(function (Configuration) {
    var Config = (function () {
        function Config($mdThemingProvider, $stateProvider, $stateHelperProvider, $urlRouterProvider, formlyConfigProvider, $httpProvider) {
            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');
            //formlyConfigProvider.extras.removeChromeAutoComplete = true;
            new quill_text_editor_1.quillTextEditor(formlyConfigProvider);
            new chip_item_type_1.mdChipItemType(formlyConfigProvider);
            new img_previewer_upload_type_1.mdImagePreviewUpload(formlyConfigProvider);
            $httpProvider.defaults.headers.get = {};
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            //Routes.List.Items.forEach((item: Routes.Route, index: number) => {
            //    //$stateProvider.state(item.config)
            //    $stateHelperProvider.state(item.config as any);
            //});
            routes_1.rootRoutes.forEach(function (item, index) {
                $stateHelperProvider.state(item);
            });
            $urlRouterProvider.otherwise('/');
        }
        Config.$inject = ['$mdThemingProvider', '$stateProvider', '$stateHelperProvider', '$urlRouterProvider', 'formlyConfigProvider', '$httpProvider'];
        return Config;
    }());
    index_1.APP_MODULE.config(Config);
})(Configuration || (Configuration = {}));
//# sourceMappingURL=config.js.map