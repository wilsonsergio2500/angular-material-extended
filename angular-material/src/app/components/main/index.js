"use strict";
var angular = require('angular');
require('angular-route');
require('angular-material');
console.log(angular);
exports.APP_MODULE = angular.module('angularMaterialApp', ['ngRoute', 'ngMaterial'])
    .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default', 'docs-dark')
        .primaryPalette('blue');
});
//# sourceMappingURL=index.js.map