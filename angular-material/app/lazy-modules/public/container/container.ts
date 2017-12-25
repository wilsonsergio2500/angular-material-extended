declare var angular: angular.IAngularStatic;
import { EXTERNAL_DISPLAY_MODULE } from '../module';

namespace Components.Public {

    class ContainerCtrl {

        static $inject = ['$state', '$timeout']
        constructor(private $state: angular.ui.IStateService, $timeout: angular.ITimeoutService) {

          
        }
    }

     const template = require('!!raw-loader!./container.html');
    function containerExternal(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            controller: ContainerCtrl
        }
    }

    EXTERNAL_DISPLAY_MODULE.directive('containerExternal', containerExternal);
    
}