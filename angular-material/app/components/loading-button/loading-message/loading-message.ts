import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { AngularWatch } from '../../../helpers/angularwatch';

namespace Components.LoadingButton {

    class LoadingMessage {
        static $inject = ['$scope', '$timeout']
        private watcher: AngularWatch;
        mdBusy: boolean;
        constructor($scope: angular.IScope, $timeout: angular.ITimeoutService) {
            
        }
       
    }

    const template = require('!!raw-loader!./loading-message.html');
    function mdLoadingMessage(): ng.IDirective {
        return <ng.IDirective>{
            transclude: true,
            template: template,
            restrict: 'E',
            controller: LoadingMessage,
            require: '^mdLoadingButton',
            bindToController: true,
            scope: false

        }
    }

    APP_MODULE.directive('mdLoadingMessage', mdLoadingMessage);
}