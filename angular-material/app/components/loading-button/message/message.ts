
import * as angular from 'angular'
import { APP_MODULE } from '../../../main/index';
import { AngularWatch  } from '../../../helpers/angularwatch'

namespace Components.LoadingButton {


    class Message {
        static $inject = ['$scope',  '$timeout']

        private watcher: AngularWatch;
        mdBusy: boolean;
        constructor($scope: angular.IScope,  $timeout: angular.ITimeoutService) {
           
           
        }
        onDestroy = () => {
           

        }
    }

    export function mdMessage(): ng.IDirective {
        return <ng.IDirective>{
            transclude: true,
            template: '<span ng-show="!$parent.vm.mdBusy"><ng-transclude></ng-transclude></span>',
            restrict: 'E',
            controller: Message,
            bindToController: true,
            scope: false,
            require: '^mdLoadingButton',
            
        }
    }

    APP_MODULE.directive("mdMessage", mdMessage);
}