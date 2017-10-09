import * as angular from 'angular';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';
import { APP_MODULE } from '../../main/index';
import { Inputs } from '../../formly-fields/formly-fields';
import { Wrappers } from '../../formly-fields/formly-wrappers';

namespace FormComponents {

    export class BlogCtrl {

        working: boolean;
        FD: IFormDefinition<any> = new FormDefinition<any>();;
        constructor() {
            this.Init();
        }
        Init = () => {
            this.working = false;

            const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 });
            Image.className = Wrappers.FlexCenter50();

            const Theme = new Inputs.Text('theme', 'Theme', true);
            const Post = new Inputs.WysiwygTextEditor('post', 'Post');
            Post.templateOptions.htmlQuillEditor.placeholder = 'write your post content'
            Post.templateOptions.htmlQuillEditor.maxlength = 2000;

            this.FD.fields = [
                Image,
                Wrappers.RowWrapper([Theme]),
                Wrappers.RowWrapper([Post])
            ]



        }
    }

    const template = require('!!raw-loader!./blog.html');
    function blogForm() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controller: BlogCtrl,
            controllerAs: 'vm',
        }
    }

    APP_MODULE.directive('blogForm', blogForm);
}