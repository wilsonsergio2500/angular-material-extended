
import * as angular from 'angular';
import { IActionService, IActionItem } from '../../services/actions-service/actions-service';
import { APP_MODULE } from '../../main/index';

namespace Components.NavActionItems {

    class NavActionItemsCtrl {

        static $inject = ['ActionService', '$location', '$mdDialog', '$timeout', '$mdSidenav' ];
        Actions : IActionItem[]
        constructor(private ActionService: IActionService, private $location: angular.ILocationService,
            private $mdDialog: angular.material.IDialogService, private $timeout: angular.ITimeoutService,
            private $mdSidenav: angular.material.ISidenavService
        ) {
            this.Actions = ActionService.getActions();
        }
        GoTo(action: IActionItem) {
            this.$mdDialog.hide();
            this.$mdSidenav('left').close();
            this.$timeout(() => {
                this.$location.path(action.Path);
            }, 350);
        }
    }

    const template = require('!!raw-loader!./nav-action-items.html');
    function navActionItems(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'act',
            controller: NavActionItemsCtrl
        }
    }

    APP_MODULE.directive('navActionItems', navActionItems);

}