
// polyfills start
import 'core-js/es6/symbol';
import 'core-js/es6/object';
//import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
//import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';

//import 'core-js/es6/reflect';
//import 'core-js/es7/reflect';
// polyfills end

import * as angular from 'angular';
//import 'angular-route';
import 'angular-sanitize';
import 'angular-material';
import 'api-check';
import 'angular-formly';
import 'angular-messages';
import '@uirouter/angularjs';
import '@uirouter/angularjs/release/stateEvents.js'
import 'angulargrid';

//modules
import '../modules/ui-router-state-helper/ui-router-state-helper';

const angularFormlyMaterial: any = require('angular-formly-material');
const angularFileUpload: any = require('ng-file-upload');
const ngFx = require('ng-fx')


import 'satellizer';


const croppie = require('croppie/croppie.js');
const croppieCss = require('!style-loader!css-loader!croppie/croppie.css');
                                                                //ngRoute
export const APP_MODULE = angular.module('angularMaterialApp', ['ui.router', 'ui.router.state.events', 'ngSanitize', 'ngMaterial', 'formly', 'ui.router.stateHelper', angularFormlyMaterial.default, angularFileUpload, ngFx, 'satellizer', 'angularGrid' ]);
  