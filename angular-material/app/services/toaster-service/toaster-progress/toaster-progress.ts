import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';

namespace Services.Ctrls.ToasterProgress {

    class toasterProgressCtrl {
        constructor() {
        }
    }

    const template = require('!!raw-loader!./toaster-progress.html');
    function toasterProgress() {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            controller: toasterProgressCtrl,
            bindToController: true,
            scope: {
                mdProgressText: '='
            }
        }
    }

    APP_MODULE.directive('mdToasterProgress', toasterProgress);
}