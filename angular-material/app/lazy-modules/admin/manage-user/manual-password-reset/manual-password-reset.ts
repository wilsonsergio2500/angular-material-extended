
declare var angular: angular.IAngularStatic;
import { IUserDisplay } from '../../../../models/contracts/request/user/iuserdisplay';
import { ADMIN_MODULE } from '../../module';
import { IFormDefinition, FormDefinition } from '../../../../models/iformdefinition';
import { Inputs } from '../../../../formly-fields/formly-fields';
import { IPasswordChangeBasedRequest } from '../../../../models/contracts/request/user/ipasswordchangebasedrequest';
import { IUserService } from '../../../../services/domains/user/user-service';
import { IToasterService  } from '../../../../services/toaster-service/toater-service';

namespace Components {


    class ManualPasswordResetCtrl {
        record: IUserDisplay;
        FD: IFormDefinition<any>;
        Busy: boolean;
        static $inject = ['$mdDialog', 'UserService', 'ToasterService', '$timeout']
        constructor(private $mdDialog: angular.material.IDialogService, private UserService: IUserService,
            private ToasterService: IToasterService, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {

            this.FD = new FormDefinition<any>();
            this.Busy = false;


            const password = new Inputs.Password('password', 'Password');
            password.templateOptions.placeholder = 'Enter New Password';
            password.validators = {
                'minlength': {
                    expression: ($viewvalue, $modelvalue) => {
                        let value: string = $modelvalue || $viewvalue;
                        return (value) ? value.length > 5 : false
                    },
                    message: ($viewvalue, $modelvalue, scope: AngularFormly.ITemplateScope) => {
                        return `${scope.to.label} must meet the minimun length of 6`;
                    }
                }
            }
            

            const passwordconfirmation = new Inputs.Password('password_confirm', 'New Password Confirmation');
            passwordconfirmation.templateOptions.placeholder = 'Re-enter New Password'
            passwordconfirmation.validators = {
                MatchPassword: {
                    expression: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {

                        return $viewValue == (scope.model as any)['password'];
                    },
                    message: '"Must match above password"'

                }
            }

            this.FD.fields = [
                password,
                passwordconfirmation
            ];

        }
        Cancel = () => {
            this.$mdDialog.hide();
        }
        Submit = ($model: any) => {

            const payload = <IPasswordChangeBasedRequest>{ email: this.record.email, password: $model.password };
            this.Busy = true;

            this.UserService.UpdateUserPassword(payload).then((R) => {
                if (R.state) {

                    this.ToasterService.ShowAsStatus('Password Updated');
                    this.$timeout(() => {
                        this.Busy = false;
                        this.$mdDialog.hide();
                    }, 1000)
                    this.$timeout(() => {
                        this.ToasterService.HideToaster();
                    }, 2000)

                }
            })
        }
    }

    const template = require('!!raw-loader!./manual-password-reset.html');
    function manualPasswordReset(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: ManualPasswordResetCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                record: '='
            }
        }
    }


    ADMIN_MODULE.directive('manualPasswordReset', manualPasswordReset)

}