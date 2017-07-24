/// <reference path="../route/routes.ts" />

import * as angular from 'angular';
import { APP_MODULE } from './index';
import 'angular-material';
import { ngRoute } from '../custom-typings/angular-route/route';
import { Routes } from '../route/routes';

namespace Configuration {


    class Config{
        static $inject = ['$mdThemingProvider', '$routeProvider']
        constructor($mdThemingProvider: angular.material.IThemingProvider, $routeProvider: ngRoute.IRouteProvider) {

            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');
            
            Routes.List.Items.forEach((item: Routes.Route, index: number) => {
                $routeProvider.when(item.Path, item.config);
            });
        }
    }

    APP_MODULE.config(Config);
}