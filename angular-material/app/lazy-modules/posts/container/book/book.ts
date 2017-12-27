
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../../module';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { Inputs } from '../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../formly-fields/formly-wrappers';

namespace Components.Book{

    class BookCtrl {
        Forms: FormTabWizard<any>;
        constructor() {


            const form1: IFormTabWizardItem = {
                Fields: [
                    new Inputs.Text('text', 'text', true),
                    new Inputs.Text('another', 'another', true),
                ]
            }

            const form2 : IFormTabWizardItem = {
                Fields: [
                    new Inputs.Text('text1', 'text', true),
                    new Inputs.Text('another1', 'another', true),
                ]
            }

            this.Forms = new FormTabWizard([form1, form2]);
        }
    }

  const template = require('!!raw-loader!./book.html');
    function bookPost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: BookCtrl,
            controllerAs: 'vm',
            bindToController: true,
        }

 }
    POST_MODULE.directive('bookPost', bookPost)
}