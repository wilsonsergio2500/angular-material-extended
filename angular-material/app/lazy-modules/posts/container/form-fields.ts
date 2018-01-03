
declare var angular: angular.IAngularStatic;
import { Inputs } from '../../../formly-fields/formly-fields';
import { Wrappers } from '../../../formly-fields/formly-wrappers';
import { MergeObject } from '../../../helpers/mergeobject';


const Theme = new Inputs.Text('theme', 'Enter Book Title', true);


const Post = new Inputs.WysiwygTextEditor('postContent', 'Your Takeaway');
Post.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
Post.templateOptions.htmlQuillEditor.placeholder = 'Share your biggest takeaway';
Post.templateOptions.htmlQuillEditor.mdMinWordCount = 1;
Post.validation.messages['minwords'] = ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
    return scope.to.label + ' is required';
}
Post.templateOptions.htmlQuillEditor.mdMaxWordCount = 90;


const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 }, true);
Image.templateOptions.imgUploader.mdBtnText = 'Add Book Image';
Image.className = Wrappers.FlexCenter50();

const Category = new Inputs.ChipOptions('categories', 'Category', 'name');

export const FIELDS = {

    THEME: (): Inputs.Text => angular.copy(Theme),
    POST: (): Inputs.WysiwygTextEditor => angular.copy(Post),
    IMAGE: (): Inputs.ImagePreviewerUpload => angular.copy(Image),
    CATEGORY: (): Inputs.ChipOptions => angular.copy(Category)
}