"use strict";
// polyfills start
require('core-js/es6/symbol');
require('core-js/es6/object');
require('core-js/es6/function');
require('core-js/es6/parse-int');
require('core-js/es6/parse-float');
require('core-js/es6/number');
require('core-js/es6/math');
require('core-js/es6/string');
require('core-js/es6/date');
require('core-js/es6/array');
require('core-js/es6/regexp');
require('core-js/es6/map');
require('core-js/es6/set');
require('core-js/es6/promise');
require('core-js/es6/reflect');
require('core-js/es7/reflect');
// polyfills end
var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-material');
require('api-check');
require('angular-formly');
require('angular-messages');
require('angular-ui-router');
require('angular-ui-router/release/stateEvents.js');
//modules
require('../modules/ui-router-state-helper/ui-router-state-helper');
var angularFormlyMaterial = require('angular-formly-material');
var angularFileUpload = require('ng-file-upload');
var ngFx = require('ng-fx');
//import 'angular-ui-router-anim-in-out';
//const ngAnimInOut = require('!style-loader!css-loader!angular-ui-router-anim-in-out/css/anim-in-out.css');
require('satellizer');
var croppie = require('croppie/croppie.js');
var croppieCss = require('!style-loader!css-loader!croppie/croppie.css');
//ngRoute
exports.APP_MODULE = angular.module('angularMaterialApp', ['ui.router', 'ui.router.state.events', 'ngSanitize', 'ngMaterial', 'formly', 'ui.router.stateHelper', angularFormlyMaterial.default, angularFileUpload, ngFx, 'satellizer']);
//# sourceMappingURL=index.js.map