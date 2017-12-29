/// <reference path="../base.ts" />
/// <reference path="../form-fields.ts" />

declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../../module';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { Inputs } from '../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../formly-fields/formly-wrappers';
import { Base } from '../base';
import { FIELDS } from '../form-fields'

namespace Components.Book{

    class BookCtrl extends Base {

        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state']
        constructor(ms : any, to : any, ts : any, s : any) {
            super(ms, to, ts,s)

            this.InitForm();
        }

        InitForm = () => {

            const Themex = new Inputs.Text('theme', 'Enter Book Title', true);
            const theme = FIELDS.THEME();
            console.log(theme);
            console.log(Themex);

            const form1: IFormTabWizardItem = {
                Fields: [
                    FIELDS.THEME()
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

            this.Forms = new FormTabWizard([form1, form2, form3]);
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