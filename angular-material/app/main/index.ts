﻿
import * as angular from 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-formly';
import 'angular-messages';
import 'angular-ui-router';

//modules
import '../modules/ui-router-state-helper/ui-router-state-helper';

const angularFormlyMaterial: any = require('angular-formly-material');
const angularFileUpload: any = require('ng-file-upload');
const ngFx = require('ng-fx')


const croppie = require('croppie/croppie.js');
const croppieCss = require('!style-loader!css-loader!croppie/croppie.css');
                                                                //ngRoute
export const APP_MODULE = angular.module('angularMaterialApp', ['ui.router', 'ngMaterial', 'formly', 'ui.router.stateHelper', angularFormlyMaterial.default, angularFileUpload, ngFx ]);
  