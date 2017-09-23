"use strict";
var angular = require('angular');
require('angular-route');
require('angular-material');
require('angular-formly');
require('angular-messages');
require('angular-ui-router');
//modules
require('../modules/ui-router-state-helper/ui-router-state-helper');
var angularFormlyMaterial = require('angular-formly-material');
var angularFileUpload = require('ng-file-upload');
var ngFx = require('ng-fx');
var croppie = require('croppie/croppie.js');
var croppieCss = require('!style-loader!css-loader!croppie/croppie.css');
//ngRoute
exports.APP_MODULE = angular.module('angularMaterialApp', ['ui.router', 'ngMaterial', 'formly', 'ui.router.stateHelper', angularFormlyMaterial.default, angularFileUpload, ngFx]);
//# sourceMappingURL=index.js.map