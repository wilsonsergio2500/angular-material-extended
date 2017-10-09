
import * as angular from 'angular';
import { IInvite } from '../../../../../models/contracts/request/invite/iinvite';
import { IFormDefinition, FormDefinition } from '../../../../../models/iformdefinition';
import { IUser } from '../../../../../models/contracts/request/user/iuser';
import { Wrappers } from '../../../../../formly-fields/formly-wrappers';
import { Inputs  } from '../../../../../formly-fields/formly-fields';
import * as formly from 'AngularFormly';
import { IInviteCompletition } from '../../../../../models/contracts/request/invite/iinvitecompletition';
import { IToasterService } from '../../../../../services/toaster-service/toater-service';
import { IInviteService } from '../../../../../services/domains/invite/invite-service';

export class InviteCompletCtrl {

    static $inject = ['Injected', 'ToasterService', 'InviteService', '$timeout']
    working: boolean;
    FD: IFormDefinition<IUser> = new FormDefinition<IUser>(); 
    constructor(private Injected: IInvite, private ToasterService: IToasterService,
        private InviteService: IInviteService, private $timeout: angular.ITimeoutService) {
        this.Init();
    }
    Init = () => {
        this.working = false;
        this.FD.model = <IUser>{
            email: this.Injected.email,
            Role: this.Injected.participationRoleType
        };

        const ImageUpload = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 200, h: 200 });
        ImageUpload.templateOptions.imgUploader.imgType = Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
        ImageUpload.className = Wrappers.FlexSize(33);

        const Bio = new Inputs.WysiwygTextEditor('bio', 'Bio');
        Bio.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
        Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';

        const Email = new Inputs.Email('email', 'Email', true);
        Email.className = Wrappers.FlexSize(66);


        const Wrapper1 = <formly.IFieldGroup>{
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
                expression: ($viewValue: any, $modelValue: any, scope: formly.ITemplateScope) => {
                  
                    return $viewValue == (scope.model as any)['password'];
                },
                message: '"The above value must match password field"'
                
            }
        }
        

        this.FD.fields = [
            Wrapper1,
            Wrappers.RowWrapper([name, lastName]),
            userName,
            Email,
            Wrappers.RowWrapper([password, passwordconfirmation])
        ];

    }
    onSubmit = () => {
        this.working = true;

        const inviteModel = <IInviteCompletition>{
            user: this.FD.model,
            invitationId: this.Injected.id
        }

        this.InviteService.Complete(inviteModel).then((response) => {
            if (response.state) {
                this.ToasterService.ShowAsStatus('Profile Completed');
                this.$timeout(() => {
                    this.working = false;
                }, 500);
            }
        })

        console.log(inviteModel);
    }
}