
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../module';
import { FormTabWizard, IFormTabWizardItem } from '../models/formtabwizard';

namespace Components.Posts {

    class FormTabWizardCtrl {
        groups: FormTabWizard<any>;
        constructor() {

        }
    }

    const template = require('!!raw-loader!./form-tab-wizard.html');
    function formTabWizard(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: FormTabWizardCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                groups: '='
            }
            
        }
    }


    POST_MODULE.directive('formTabWizard', formTabWizard);
}