
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../../module';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';
import { Inputs } from '../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../formly-fields/formly-wrappers';

namespace Components.Book{

    class BookCtrl {
        Forms: FormTabWizard<any>;
        IsWorking: boolean;
        constructor() {

            const Theme = new Inputs.Text('theme', 'Enter Book Title', true);

           


            const Post = new Inputs.WysiwygTextEditor('postContent', 'Your Takeaway');
            Post.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
            Post.templateOptions.htmlQuillEditor.placeholder = 'Share your biggest takeaway';
            Post.templateOptions.htmlQuillEditor.mdMinWordCount = 40;
            Post.templateOptions.htmlQuillEditor.mdMaxWordCount = 90;
            

            const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 }, true);
            Image.templateOptions.imgUploader.mdBtnText = 'Add Book Image';
            Image.className = Wrappers.FlexCenter50();

            const form1: IFormTabWizardItem = {
                Fields: [
                    Theme
                ]
            }

            const form2 : IFormTabWizardItem = {
                Fields: [
                   Post
                ]
            }

            const form3: IFormTabWizardItem = {
                Fields: [
                    Image
                ]
            }

            this.Forms = new FormTabWizard([form1, form2, form3]);
        }

        onFinilized() {
            console.log('onfinal');
            console.log(this.Forms.getValue());
            this.IsWorking = true;
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