
import * as angular from 'angular';
import { IActionService, IActionItem } from '../../services/actions-service/actions-service';
import { APP_MODULE } from '../../main/index';

namespace Components.NavActionItems {

    class NavActionItemsCtrl {

        static $inject = ['ActionService', '$location'];
        Actions : IActionItem[]
        constructor(private ActionService: IActionService, private $location: angular.ILocationService) {
            this.Actions = ActionService.getActions();
        }
        GoTo(action: IActionItem) {
            this.$location.path(action.Path);
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