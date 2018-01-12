
declare var angular: angular.IAngularStatic;
import { ADMIN_MODULE  } from '../module';

namespace Components.Admin {


    class ManageUserCtrl {

        constructor() {
        }
    }

    const template = require('!!raw-loader!./manage-user.html');
    function manageUsers(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: ManageUserCtrl,
        }

    }

    ADMIN_MODULE.directive('manageUsers', manageUsers);
}