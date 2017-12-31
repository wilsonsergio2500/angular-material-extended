
import { Base } from '../base';
import { POST_MODULE } from '../../module';
import { FIELDS } from '../form-fields';
import { MilestoneType } from '../../../../models/contracts/request/milestone/milestonetype';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { ICategoryService } from '../../../../services/domains/category/category-service'

namespace Components.Landmark {


    class LandmarkCtrl extends Base {
        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state', 'CategoryService']
        constructor(ms: any, to: any, ts: any, s: any, private CategoryService: ICategoryService) {
            super(ms, to, ts, s);
            this.TypeTitle = 'Milestone';
            this.icon = 'icon-flag';
            this.InitForm();
        }

        InitForm = () => {

            this.Model.type = MilestoneType.LandMark;

            const theme = FIELDS.THEME();
            theme.templateOptions.label = 'Milestone';
            theme.templateOptions.placeholder = 'Enter Milestone';

            const post = FIELDS.POST();
            post.templateOptions.htmlQuillEditor.placeholder = 'Share the Lecture biggest takeaway';

            const image = FIELDS.IMAGE();
            image.templateOptions.imgUploader.mdBtnText = 'Upload Image';
           
            const category = FIELDS.CATEGORY();
            category.templateOptions.chipItem.optionsPromise = this.$categoryQuery;

            const form1: IFormTabWizardItem = {
                Fields: [
                    theme,
                    category
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

        $categoryQuery = (query: string) => {
            return this.CategoryService.MatchCategory(query);
        }
    }


    const template = require('!!raw-loader!../base-template.html');
    function landmarkPost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: LandmarkCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                injected: '='
            }
        }

    }

    POST_MODULE.directive('landmarkPost', landmarkPost);

}
