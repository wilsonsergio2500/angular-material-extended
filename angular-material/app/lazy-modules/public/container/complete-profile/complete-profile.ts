
declare var angular: angular.IAngularStatic;
import { EXTERNAL_DISPLAY_MODULE } from '../../module';
import { IInvite } from '../../../../models/contracts/request/invite/iinvite'

namespace Components.Public {

    class CompleteProfileCtrl{
        invite: IInvite;
        constructor() {
            console.log(this.invite);
        }
    }

    const template = require('!!raw-loader!./complete-profile.html');
    function completeProfile(): angular.IDirective {
        return <angular.IDirective>{
            bindToController: true,
            controllerAs: 'vm',
            controller: CompleteProfileCtrl,
            template: template,
            scope: {
                invite: '='
            }
        }
    }

    EXTERNAL_DISPLAY_MODULE.directive('completeProfile', completeProfile);
}