import * as angular from 'angular';
import { IUserDisplay} from '../../models/contracts/request/user/iuserdisplay';
import { APP_MODULE } from '../../main/index';

namespace Componts.UserHeader {


    class UserHeaderCtrl{
        profile: IUserDisplay;
        label: string;
        icon: string;
        constructor() {
        }
    }

    const template = require('!!raw-loader!./user-header.html');
    function userHeader(): angular.IDirective{
        return <angular.IDirective>{
            template: template,
            controller: UserHeaderCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                profile: '=',
                label: '=',
                icon: '='
            }
            
        }
    }

    APP_MODULE.directive('userHeader', userHeader);


}
