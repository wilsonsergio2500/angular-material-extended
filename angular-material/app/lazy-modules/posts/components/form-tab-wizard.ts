
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../module';
import { FormTabWizard, IFormTabWizardItem } from '../models/formtabwizard';

namespace Components.Posts {

    class FormTabWizardCtrl {
        groups: FormTabWizard<any>;
        onFinished: Function;
        selectedIndex: number;
        busy: boolean;
        constructor() {

        }
        Submit($index: any) {

            if ($index == (this.groups.Size - 1)) {
                this.onFinished.call(this);
                //console.log('will submit');
            } else {
                this.selectedIndex = $index + 1; 
            }
           
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
                groups: '=',
                onFinished: '&',
                busy: '='
            }
            
        }
    }


    POST_MODULE.directive('formTabWizard', formTabWizard);
}