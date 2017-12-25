
declare var angular: angular.IAngularStatic;
import { EXTERNAL_DISPLAY_MODULE } from '../module';
namespace Components.Public {

    class CompleteIndicator {
        static $inject = ['$state', '$location']
        constructor(private $state: angular.ui.IStateService, private $location: angular.ILocationService) {

        }
        goToLogin() {
            this.$location.path('/');
        }
    }

    const template = require('!!raw-loader!./completed-indicator.html');
    function completeIndicator(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            controller: CompleteIndicator
            
        }

    }

    EXTERNAL_DISPLAY_MODULE.directive('completeIndicator', completeIndicator);
}