﻿
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from './index';
import 'angular-material';
import { ngRoute } from '../custom-typings/angular-route/route';
import { Routes } from '../route/routes';
import { IStateProvider } from '../modules/ui-router-state-helper/ui-router-state-helper';

import { quillTextEditor } from '../formly-fields/custom-types/quill-text-editor/quill-text-editor';
import { mdChipItemType } from '../formly-fields/custom-types/md-chip-items/chip-item-type';
import { mdImageProfileUpload } from '../formly-fields/custom-types/md-img-profile-upload/md-img-profile-upload';

import { rootRoutes } from '../pages/root/routes';

namespace Configuration {


    class Config{
        static $inject = ['$mdThemingProvider', '$stateProvider', '$stateHelperProvider', '$urlRouterProvider', 'formlyConfigProvider']
        constructor($mdThemingProvider: angular.material.IThemingProvider, $stateProvider: angular.ui.IStateProvider,
            $stateHelperProvider: IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider,
            formlyConfigProvider: formly.IFormlyConfig
        ) {

            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');

            new quillTextEditor(formlyConfigProvider);
            new mdChipItemType(formlyConfigProvider);
            new mdImageProfileUpload(formlyConfigProvider);
            
            //Routes.List.Items.forEach((item: Routes.Route, index: number) => {
            //    //$stateProvider.state(item.config)
            //    $stateHelperProvider.state(item.config as any);
            //});

            rootRoutes.forEach((item, index) => {
                
                $stateHelperProvider.state(item);
            });

            $urlRouterProvider.otherwise('/');
        }
    }

    APP_MODULE.config(Config);
}