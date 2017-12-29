
declare var angular: angular.IAngularStatic;
import { IFormDefinition, FormDefinition } from '../../../../../models/iformdefinition';
import { EXTERNAL_DISPLAY_MODULE } from '../../../module';
import { IUser } from '../../../../../models/contracts/request/user/iuser';
import { IInviteService } from '../../../../../services/domains/invite/invite-service';
import { IInviteCompletition } from '../../../../../models/contracts/request/invite/iinvitecompletition';
import { IUserService } from '../../../../../services/domains/user/user-service';
import { Inputs } from '../../../../../formly-fields/formly-fields';
import { Wrappers } from '../../../../../formly-fields/formly-wrappers';
import { IActionResponse } from '../../../../../models/contracts/response/iactionresponse';

namespace Components.Public {

    export class CompleteProfileFormCtrl {
        FD: IFormDefinition<IUser>;
        model: any;
        Busy: boolean;
        static $inject = ['InviteService', '$timeout', '$state', 'UserService', '$q' ]
        constructor(private InviteService: IInviteService, private $timeout: angular.ITimeoutService,
            private $state: angular.ui.IStateService, private UserService: IUserService,
            private $q: angular.IQService
        ) {
            this.FD = new FormDefinition<IUser>();
            this.FD.fields = this.getFormFields();
            this.FD.model = <IUser>{
                email: this.model.email,
                Role: this.model.participationRoleType
            };
            this.Busy = false;
        }
        Submit($model: IUser) {
            console.log($model);

            this.Busy = true;

            const inviteModel = <IInviteCompletition>{
                user: this.FD.model,
                invitationId: this.model.id
            }

          
            

            this.InviteService.Complete(inviteModel).then((response) => {
                if (response.state) {
                    this.$timeout(() => {
                        this.$state.go('completed');
                    }, 500);
                }
            })


        }

        getFormFields =() => {

            const ImageUpload = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 200, h: 200 });
            ImageUpload.templateOptions.imgUploader.imgType = Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
            ImageUpload.className = Wrappers.FlexSize(33);

            const Bio = new Inputs.WysiwygTextEditor('bio', 'Bio');
            Bio.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
            Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';

            const Email = new Inputs.Email('email', 'Email', true);
            Email.className = Wrappers.FlexSize(66);
            Email.templateOptions.disabled = true;


            const Wrapper1 = <AngularFormly.IFieldGroup>{
                className: 'layout-row layout-xs-column layout-sm-column',
                fieldGroup: [ImageUpload, Bio]
            }

            const name = new Inputs.Text('name', 'Name', true);
            const lastName = new Inputs.Text('lastName', 'Last Name', true);
            const userName = new Inputs.Text('userName', 'User', true);
            userName.modelOptions = <AngularFormly.IModelOptions>{ debounce: 250 };
            userName.asyncValidators = {
                unique: {
                    expression: ($viewValue, $modelValue, scope) => {


                        this.FD.working = true;

                        return this.$q((resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {

                            
                            this.UserService.CheckUserNameUsed($viewValue).then((R: IActionResponse) => {
                                    if (R.state) {
                                        reject('category name taken');
                                      
                                    }
                                    resolve();
                                    this.FD.working = false;
                                });

                        });

                    },
                    message: ($viewvalue, $modelvalue) => {
                        return  `User name unavailable`;
                    }
                }
            }

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

            const Fields = [
                Wrapper1,
                Wrappers.RowWrapper([name, lastName]),
                userName,
                Email,
                Wrappers.RowWrapper([password, passwordconfirmation])
            ];
            return Fields;

        }
    }

    const template = require('!!raw-loader!./complete-profile-form.html');
    function completeProfileForm() : angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: CompleteProfileFormCtrl,
            scope: {
                model: '='
            }
        }
    }

    EXTERNAL_DISPLAY_MODULE.directive('completeProfileForm', completeProfileForm)


}