
import { Base } from '../base';
import { POST_MODULE } from '../../module';
import { FIELDS } from '../form-fields';
import { MilestoneType } from '../../../../models/contracts/request/milestone/milestonetype';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';

namespace Components.Lecture {

    class LectureCtrl extends Base {
        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state']
        constructor(ms: any, to: any, ts: any, s: any) {
            super(ms, to, ts, s);
            this.TypeTitle = 'Training';
            this.icon = 'icon-calendar';
            this.InitForm();
        }

        InitForm = () => {

            this.Model.type = MilestoneType.Class;

            const theme = FIELDS.THEME();
            theme.templateOptions.label = 'Training';
            theme.templateOptions.placeholder = 'Enter Lecture or Class Attended';

            const post = FIELDS.POST();
            

            const image = FIELDS.IMAGE();
            image.templateOptions.imgUploader.mdBtnText = 'Upload Lecture Picture';
            image.templateOptions.required = false;
            delete image.validators["requireimg"];


            const form1: IFormTabWizardItem = {
                Fields: [
                    theme
                ]
            }

            const form2: IFormTabWizardItem = {
                Fields: [
                    post
                ]
            }

            const form3: IFormTabWizardItem = {
                Fields: [
                    image
                ]
            }



            this.Forms = new FormTabWizard([form3, form1, form2], this.Model);
        }
    }


    const template = require('!!raw-loader!../base-template.html');
    function lecturePost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: LectureCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                injected: '='
            }
        }

    }

    POST_MODULE.directive('lecturePost', lecturePost);
}