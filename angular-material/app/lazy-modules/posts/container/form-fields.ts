
import { Inputs } from '../../../formly-fields/formly-fields';
import { Wrappers } from '../../../formly-fields/formly-wrappers';
import { MergeObject } from '../../../helpers/mergeobject';


const Theme = new Inputs.Text('theme', 'Enter Book Title', true);


const Post = new Inputs.WysiwygTextEditor('postContent', 'Your Takeaway');
Post.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
Post.templateOptions.htmlQuillEditor.placeholder = 'Share your biggest takeaway';
Post.templateOptions.htmlQuillEditor.mdMinWordCount = 40;
Post.templateOptions.htmlQuillEditor.mdMaxWordCount = 90;


const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 }, true);
Image.templateOptions.imgUploader.mdBtnText = 'Add Book Image';
Image.className = Wrappers.FlexCenter50();

const Category = new Inputs.ChipOptions('categories', 'Category', 'name');

export const FIELDS = {

    THEME: (): Inputs.Text => { return MergeObject<any, Inputs.Text>({}, Theme); },
    POST: (): Inputs.WysiwygTextEditor => { return MergeObject<any, Inputs.WysiwygTextEditor>({}, Post); },
    IMAGE: (): Inputs.ImagePreviewerUpload => { return MergeObject<any, Inputs.ImagePreviewerUpload>({}, Image); },
    CATEGORY: (): Inputs.ChipOptions => { return MergeObject<any, Inputs.ChipOptions>({}, Category); }
}