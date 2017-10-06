
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from '../../main/index';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';
import { Inputs} from '../../formly-fields/formly-fields';
import { Wrappers } from '../../formly-fields/formly-wrappers';
import { IMilestone } from '../../models/contracts/request/milestone/imilestone';
import { ICategoryService } from '../../services/domains/category/category-service';
import { ICategory } from '../../models/contracts/request/category/icategory';
import { IMilestoneService } from '../../services/domains/milestone/milestone-service';
import { IToasterService } from '../../services/toaster-service/toater-service';
import { MilestoneType } from '../../models/contracts/request/milestone/milestonetype';

namespace FormComponents {

    export class MilestoneCtrl {

        working: boolean;
        FD: IFormDefinition<IMilestone> = new FormDefinition<IMilestone>();;
        milestoneType: MilestoneType;

        static $inject = ['$q', 'CategoryService', 'MilestoneService', 'ToasterService']
        constructor(private $q: angular.IQService,
            private CategoryService: ICategoryService,
            private MilestoneService: IMilestoneService,
            private ToasterService: IToasterService
        ) {
            console.log(this.milestoneType);
            this.Init();
        }
        Init = () => {
            this.working = false;

            const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 });
            Image.className = Wrappers.FlexCenter50();

            const TitleText = (this.milestoneType == MilestoneType.Post) ? 'Title' : 'Theme'
            const Theme = new Inputs.Text('theme', TitleText, true);
            const Post = new Inputs.WysiwygTextEditor('postContent', 'Post');
            Post.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
            Post.templateOptions.htmlQuillEditor.placeholder = 'write about your Landmark';

            const Category = new Inputs.ChipOptions('categories', 'Category', 'name');
            Category.templateOptions.chipItem.optionsPromise = this.$categoryQuery;

            if (this.milestoneType == MilestoneType.LandMark) {

                this.FD.fields = [
                    Image,
                    Wrappers.RowWrapper([Theme]),
                    Wrappers.RowWrapper([Category]),
                    Wrappers.RowWrapper([Post])
                ]
            }
            if (this.milestoneType == MilestoneType.Post) {

                Post.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.ALL;

                this.FD.fields = [
                    Image,
                    Wrappers.RowWrapper([Theme]),
                    Wrappers.RowWrapper([Post])
                ]
            }

           
            

            
        }

        $categoryQuery = (query: string) => {
            return this.CategoryService.MatchCategory(query);
        }


        onSubmit = () => {
            this.working = true;
            this.FD.model.type = this.milestoneType;
            
            this.MilestoneService.Add(this.FD.model).then((reponse) => {
                if (reponse.state) {
                    this.ToasterService.ShowAsStatus('Milestone Added Successfully');
                    this.working = false;
                }
            });

            console.log(this.FD.model);
        }
    }

 const template = require('!!raw-loader!./milestone.html');
    function milestoneForm() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controller: MilestoneCtrl,
            controllerAs: 'vm',
            scope: {
                milestoneType: '='
            }
        }
    }

    APP_MODULE.directive('milestoneForm', milestoneForm);
}