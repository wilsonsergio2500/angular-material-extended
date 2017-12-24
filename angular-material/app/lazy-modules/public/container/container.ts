declare var angular: angular.IAngularStatic;
import { EXTERNAL_DISPLAY_MODULE } from '../module';

namespace Components.Public {

     const template = require('!!raw-loader!./container.html');
    function containerExternal(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
        }
    }

    EXTERNAL_DISPLAY_MODULE.directive('containerExternal', containerExternal);
    
}