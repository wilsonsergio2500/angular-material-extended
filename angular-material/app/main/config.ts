
import * as angular from 'angular';
import { APP_MODULE } from './index';
import 'angular-material';
import { ngRoute } from '../custom-typings/angular-route/route';
import { Routes } from '../route/routes';
import { IStateProvider } from '../modules/ui-router-state-helper/ui-router-state-helper';

import { rootRoutes } from '../pages/root/routes';

namespace Configuration {


    class Config{
        static $inject = ['$mdThemingProvider', '$stateProvider', '$stateHelperProvider', '$urlRouterProvider']
        constructor($mdThemingProvider: angular.material.IThemingProvider, $stateProvider: angular.ui.IStateProvider, $stateHelperProvider: IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');

            
            
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