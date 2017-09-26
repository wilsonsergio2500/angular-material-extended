import { APP_MODULE } from '../../../main/index';
import * as angular from 'angular';

namespace Service.Status {

    class toasterStatusCtrl {
        mdStatusText: string;
        constructor() {
            
        }
    }

    const template = require('!!raw-loader!./toaster-status.html');
    function toasterStatus() {
        return <angular.IDirective>{
            controller: toasterStatusCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            scope: {
                mdStatusText: '='
            }

        }
    }

    APP_MODULE.directive('mdToasterStatus', toasterStatus);

}

