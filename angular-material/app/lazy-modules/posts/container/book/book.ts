

declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../../module';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { Inputs } from '../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../formly-fields/formly-wrappers';
import { Base } from '../base';
import { FIELDS } from '../form-fields'
import { MilestoneType  } from '../../../../models/contracts/request/milestone/milestonetype';

namespace Components.Book{

    class BookCtrl extends Base {

        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state']
        constructor(ms : any, to : any, ts : any, s : any) {
            super(ms, to, ts,s)

            this.TypeTitle = 'Book';

            this.InitForm();
        }

        InitForm = () => {

            this.Model.type = MilestoneType.Book;

            const theme = FIELDS.THEME();
            theme.templateOptions.label = 'Book Title';
            theme.templateOptions.placeholder = 'Enter Book Title';
            

            const form1: IFormTabWizardItem = {
                Fields: [
                    theme
                ]
            }

            const form2: IFormTabWizardItem = {
                Fields: [
                    FIELDS.POST()
                ]
            }

            const form3: IFormTabWizardItem = {
                Fields: [
                    FIELDS.IMAGE()
                ]
            }

            this.Forms = new FormTabWizard([form1, form2, form3], this.Model);
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