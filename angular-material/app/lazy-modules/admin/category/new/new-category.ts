
declare var angular: angular.IAngularStatic;
import { ADMIN_MODULE } from '../../module';

namespace Components.Admin {

   
    const template = require('!!raw-loader!./new-category.html');
    function adminNewCategory(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    ADMIN_MODULE.directive('adminNewCategory', adminNewCategory);
}