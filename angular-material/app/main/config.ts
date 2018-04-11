
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from './index';
import 'angular-material';
import { ngRoute } from '../custom-typings/angular-route/route';
import { Routes } from '../route/routes';
import { IStateProvider } from '../modules/ui-router-state-helper/ui-router-state-helper';

import { quillTextEditor } from '../formly-fields/custom-types/quill-text-editor/quill-text-editor';
import { mdChipItemType } from '../formly-fields/custom-types/md-chip-items/chip-item-type';
import { mdImagePreviewUpload } from '../formly-fields/custom-types/img-previewer-upload/img-previewer-upload-type';


import { rootRoutes } from '../pages/root/routes';
import { basePath } from '../services/http-service/http-service';
import { ROOT_ITEMS } from '../pages/root/route-names';
import { ROUTE_ERRORS } from '../services/domains/login/login-service';
import { DASHBOARD } from '../pages/root/dashboard/route-names';
import { POSTS } from '../pages/root/dashboard/posts/route-names';
import { TransitionRegistry } from '../helpers/transititionregistry';
import { IToasterService } from '../services/toaster-service/toater-service';


namespace Configuration {

  

    class Config{
        static $inject = ['$mdThemingProvider', '$stateProvider', '$stateHelperProvider', '$urlRouterProvider', 'formlyConfigProvider', '$httpProvider', '$authProvider']
        constructor($mdThemingProvider: angular.material.IThemingProvider, $stateProvider: angular.ui.IStateProvider,
            $stateHelperProvider: IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider,
            formlyConfigProvider: formly.IFormlyConfig, $httpProvider: angular.IHttpProvider, $authProvider: any,
           
        ) {


            $authProvider.loginUrl = basePath + '/login';


            $mdThemingProvider.theme('default', 'docs-dark').primaryPalette('blue');

            new quillTextEditor(formlyConfigProvider);
            new mdChipItemType(formlyConfigProvider);
            new mdImagePreviewUpload(formlyConfigProvider);

            $httpProvider.defaults.headers.get = {};
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            
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

    const $onStateChangeError = '$stateChangeError';
    class Run {
        static $inject = ['$rootScope', '$state', '$transitions', '$trace', 'ToasterService']
        constructor($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, $transitions: any, $trace: any, ToasterService: IToasterService) {

        

            $transitions.onError({ }, ($transition$: any) => {
               

                const error = $transition$._error.detail;
                if (error == ROUTE_ERRORS.LOGIN_VIEW_ERROR) {
                    $state.go(DASHBOARD.NAMES.FEED);
                }
                if (error == ROUTE_ERRORS.AUTH_ERROR) {
                    $state.go(ROOT_ITEMS.NAMES.LOGIN);
                }
                console.log(error);
               
            });

            TransitionRegistry.RegisterTransition($transitions, DASHBOARD.NAMES.MILESTONE.ADD, ToasterService);
            TransitionRegistry.RegisterTransition($transitions, DASHBOARD.NAMES.PROFILE.VIEWS.MAIN, ToasterService);

            TransitionRegistry.RegisterTransition($transitions, POSTS.NAMES.BOOK, ToasterService, 'Loading book entry...');
            TransitionRegistry.RegisterTransition($transitions, POSTS.NAMES.PODCAST, ToasterService, 'Loading podcast entry...');
            TransitionRegistry.RegisterTransition($transitions, POSTS.NAMES.LECTURE, ToasterService, 'Loading training entry...');
            TransitionRegistry.RegisterTransition($transitions, POSTS.NAMES.MILESTONE, ToasterService, 'Loading Milestone entry...');
            TransitionRegistry.RegisterTransition($transitions, POSTS.NAMES.BLOG_POST, ToasterService, 'Loading Post entry...');

        }
    }

    APP_MODULE.config(Config);
    APP_MODULE.run(Run);
}