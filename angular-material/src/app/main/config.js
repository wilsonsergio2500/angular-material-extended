/// <reference path="../route/routes.ts" />
"use strict";
var index_1 = require('./index');
require('angular-material');
var routes_1 = require('../route/routes');
var Configuration;
(function (Configuration) {
    var Config = (function () {
        function Config($mdThemingProvider, $routeProvider) {
            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');
            routes_1.Routes.List.Items.forEach(function (item, index) {
                $routeProvider.when(item.Path, item.config);
            });
        }
        Config.$inject = ['$mdThemingProvider', '$routeProvider'];
        return Config;
    }());
    index_1.APP_MODULE.config(Config);
})(Configuration || (Configuration = {}));
//# sourceMappingURL=config.js.map