
import { Inputs } from '../../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../../formly-fields/formly-wrappers';

const ImageUpload = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 200, h: 200 });
ImageUpload.templateOptions.imgUploader.imgType = Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
ImageUpload.className = Wrappers.FlexSize(33);

const Bio = new Inputs.WysiwygTextEditor('bio', 'Bio');
Bio.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';

const Email = new Inputs.Email('email', 'Email', true);
Email.className = Wrappers.FlexSize(66);


const Wrapper1 = <AngularFormly.IFieldGroup>{
    className: 'layout-row layout-xs-column layout-sm-column',
    fieldGroup: [ImageUpload, Bio]
}

const name = new Inputs.Text('name', 'Name', true);
const lastName = new Inputs.Text('lastName', 'Last Name', true);
const userName = new Inputs.Text('userName', 'User', true);

const password = new Inputs.Password('password', 'Password');
const passwordconfirmation = new Inputs.Password('password_confirm', 'Password Confirmation');
passwordconfirmation.validators = {
    MatchPassword: {
        expression: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {

            return $viewValue == (scope.model as any)['password'];
        },
        message: '"The above value must match password field"'

    }
}

export const Fields = [
    Wrapper1,
    Wrappers.RowWrapper([name, lastName]),
    userName,
    Email,
    Wrappers.RowWrapper([password, passwordconfirmation])
]