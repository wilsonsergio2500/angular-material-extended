import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { Inputs } from '../../../formly-fields/formly-fields';
import { Wrappers } from '../../../formly-fields/formly-wrappers';
import { IFormDefinition, FormDefinition } from '../../../models/iformdefinition'
import { IUserService } from '../../../services/domains/user/user-service';
import { IToasterService } from '../../../services/toaster-service/toater-service';
import { IDialogService } from '../../../services/dialog-service/dialog-service'

namespace FormComponents {

    class ProfileEditPasswordCtrl {
        FD: IFormDefinition<any>;
        model: any;
        Busy: boolean;

        static $inject = ['UserService', 'ToasterService', 'DialogService']
        constructor(private UserService: IUserService, private ToasterService: IToasterService, private DialogService: IDialogService) {
            this.InitForm();
        }

        InitForm = () => {
            this.Busy = false;

            const oldpassword = new Inputs.Password('currentPassword', 'Original Password');
            oldpassword.templateOptions.placeholder = 'Enter Current Password';

            const password = new Inputs.Password('password', 'New Password');
            password.templateOptions.placeholder = 'Enter New Password';

            const passwordconfirmation = new Inputs.Password('password_confirm', 'New Password Confirmation');
            passwordconfirmation.templateOptions.placeholder = 'Re-enter New Password'
            passwordconfirmation.validators = {
                MatchPassword: {
                    expression: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {

                        return $viewValue == (scope.model as any)['password'];
                    },
                    message: '"The above value must match password field"'

                }
            }

            this.FD = new FormDefinition<any>();
            this.FD.fields = [
                oldpassword,
                password,
                passwordconfirmation
            ];

        }

        Submit() {

            this.Busy = true;
            this.UserService.UpdatePassword(this.FD.model).then((R) => {
                if (R.state) {
                    this.ToasterService.ShowAsStatus('Password updated Succesfully');

                }
                else {
                    this.DialogService.DisplayError('Update Password Failed');
                }

                this.Busy = false;
                this.FD.model = {};
            }).catch(() => {

                this.DialogService.DisplayError('Update Password Failed');
                this.Busy = false;
                this.FD.model = {};

                })

            
        }
    }

    const template = require('!!raw-loader!./edit-password.html');
    function profileEditPasswordForm(): angular.IDirective{
        return <angular.IDirective>{
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            controller: ProfileEditPasswordCtrl,
            scope: {
            }
        }
    }

    APP_MODULE.directive('profileEditPasswordForm', profileEditPasswordForm);
}