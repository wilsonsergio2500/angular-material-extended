
import { Base } from '../base';
import { POST_MODULE } from '../../module';
import { FIELDS } from '../form-fields';
import { MilestoneType } from '../../../../models/contracts/request/milestone/milestonetype';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';

namespace Components.Podcast {

    class PodcastCtrl extends Base {
        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state']
        constructor(ms: any, to: any, ts: any, s: any) {
            super(ms, to, ts, s);
            this.InitForm();
        }

        InitForm = () => {

            this.Model.type = MilestoneType.Podcast;

            const theme = FIELDS.THEME();
            theme.templateOptions.label = 'Podcast';
            theme.templateOptions.placeholder = 'Enter Podcast Title';

            const post = FIELDS.POST();
            post.templateOptions.htmlQuillEditor.placeholder = 'Share podcast biggest takeaway';


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

          

            this.Forms = new FormTabWizard([form1, form2], this.Model);
        }
    }


    const template = require('!!raw-loader!../base-template.html');
    function podcastPost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: PodcastCtrl,
            controllerAs: 'vm',
            bindToController: true,
        }

    }

    POST_MODULE.directive('podcastPost', podcastPost);
}