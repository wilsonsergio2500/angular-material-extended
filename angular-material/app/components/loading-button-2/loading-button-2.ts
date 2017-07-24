
import * as angular from 'angular'
import { APP_MODULE } from '../../main/index';

namespace Components.LoadingButton{


    export class LoadingButton2 {
        mdClass: string;
        mdBusy: boolean;
        mdOnClick: Function;
        mdLoadingText: string;
        mdDisabled: boolean;

        LoadingText: string;

        static $inject = ['$timeout'];
        constructor(private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init() {
            this.LoadingText = (!!this.mdLoadingText) ? this.mdLoadingText : 'Loading..'
        }
        onClick() {
            if (!!this.mdOnClick) {
                this.mdOnClick.call(this);
            }
        }
    }


    const template = require('!!raw-loader!./loading-button-2.html');

    function mdLoadingButton2() {
        return <angular.IDirective>{
            controller: LoadingButton2,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            transclude: true,
            scope: {
                mdClass: '@',
                mdBusy: '=',
                mdOnClick: '&',
                mdLoadingText: '@',
                mdDisabled: '='
            }
        }
        
    }

    APP_MODULE.directive('mdLoadingButton2', mdLoadingButton2);
}