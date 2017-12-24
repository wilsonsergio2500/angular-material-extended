
declare var angular : angular.IAngularStatic;
import { ADMIN_MODULE } from '../../module';

namespace Components.Admin {


    class AdminNewInviteCtrl {

        static $inject = ['$timeout'];
        constructor(private $timeout: angular.ITimeoutService) {
            console.log('loaded');
        }
    }

    const template = require('!!raw-loader!./new-invite.html');
    function adminNewInvite() : angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            
        }

    }
    
    ADMIN_MODULE.directive('adminNewInvite', adminNewInvite);
}