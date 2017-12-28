
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../module';
import { FormTabWizard, IFormTabWizardItem } from '../models/formtabwizard';

namespace Components.Posts {

    class FormTabWizardCtrl {
        groups: FormTabWizard<any>;
        selectedIndex: number;
        constructor() {

            console.log(this.groups);
        }
        Submit($index: any) {

            if ($index == (this.groups.Size - 1)) {
                console.log('will submit');
            } else {
                this.selectedIndex = $index + 1; 
            }
            //console.log($index);
            //const value = this.groups.getValue();
            //console.log(value);
            //console.log(this.selectedIndex);

        }
        Back() {
            this.selectedIndex--;
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