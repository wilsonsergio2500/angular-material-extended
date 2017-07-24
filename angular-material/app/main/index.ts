
import * as angular from 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-formly';
import 'angular-messages';

const angularFormlyMaterial: any = require('angular-formly-material');
const angularFileUpload: any = require('ng-file-upload');

const croppie = require('croppie/croppie.js');
const croppieCss = require('!style-loader!css-loader!croppie/croppie.css');

export const APP_MODULE = angular.module('angularMaterialApp', ['ngRoute', 'ngMaterial', 'formly', angularFormlyMaterial.default, angularFileUpload ]);
  