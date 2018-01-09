﻿import { Base } from '../base';
import { POST_MODULE } from '../../module';
import { FIELDS } from '../form-fields';
import { MilestoneType } from '../../../../models/contracts/request/milestone/milestonetype';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { ICategoryService } from '../../../../services/domains/category/category-service'

namespace Components.Blog {


    class BlogCtrl extends Base {
        static $inject = ['MilestoneService', '$timeout', 'ToasterService', '$state', 'CategoryService']
        constructor(ms: any, to: any, ts: any, s: any, private CategoryService: ICategoryService) {
            super(ms, to, ts, s);
            this.TypeTitle = 'Post';
            this.icon = 'icon-edit';
            this.InitForm();
        }

        InitForm = () => {

            this.Model.type = MilestoneType.Post;

            const theme = FIELDS.THEME();
            theme.templateOptions.label = 'Blog Post';
            theme.templateOptions.placeholder = 'Enter Milestone';

            const post = FIELDS.POST();


            const image = FIELDS.IMAGE();
            image.templateOptions.imgUploader.mdBtnText = 'Upload Post Image';



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
    function blogPost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: BlogCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                injected: '='
            }
        }

    }

    POST_MODULE.directive('blogPost', blogPost);

}