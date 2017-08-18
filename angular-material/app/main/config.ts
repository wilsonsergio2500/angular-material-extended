
import * as angular from 'angular';
import { APP_MODULE } from './index';
import 'angular-material';
import { ngRoute } from '../custom-typings/angular-route/route';
import { Routes } from '../route/routes';
import { IStateProvider } from '../modules/ui-router-state-helper/ui-router-state-helper';

namespace Configuration {


    class Config{
        static $inject = ['$mdThemingProvider', '$stateProvider', '$stateHelperProvider']
        constructor($mdThemingProvider: angular.material.IThemingProvider, $stateProvider: angular.ui.IStateProvider, $stateHelperProvider: IStateProvider) {

            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');

            console.log($stateHelperProvider);
            
            Routes.List.Items.forEach((item: Routes.Route, index: number) => {
                //$stateProvider.state(item.config)
                $stateHelperProvider.state(item.config as any);
            });
        }
    }

    APP_MODULE.config(Config);
}