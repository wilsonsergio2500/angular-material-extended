
declare var angular: angular.IAngularStatic;

import { ADMIN_MODULE } from '../../module'

namespace Components {

    class AdminHeaderCtrl {
        title: string;
        constructor() {

        }

    }

    const template = require('!!raw-loader!./admin-header.html');
    function adminHeader() : angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: AdminHeaderCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                title: '@'
            }
        }
    }

    ADMIN_MODULE.directive('adminHeader', adminHeader);
}