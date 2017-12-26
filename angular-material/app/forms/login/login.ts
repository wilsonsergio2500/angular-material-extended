
import * as angular from 'angular';
import { Inputs } from '../../formly-fields/formly-fields';
import { IFormDefinition } from '../../models/iformdefinition';
import { IUserCredential } from '../../models/contracts/request/user/iusercredential';
import { APP_MODULE } from '../../main/index';
import { ILoginService } from '../../services/domains/login/login-service';
import { ROOT_ITEMS } from '../../pages/root/route-names';
import { DASHBOARD } from '../../pages/root/dashboard/route-names'

namespace FormComponents {

    class LoginFormCtrl {
        working: boolean;
        FD: IFormDefinition<IUserCredential>;
        invalid: boolean;
        static $inject = ['LoginService', '$state', 'formlyConfig', '$timeout']
        constructor(private LoginService: ILoginService, private $state: angular.ui.IStateService,
            private formlyConfig: AngularFormly.IFormlyConfig, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.invalid = false;
            this.FD = <IFormDefinition<IUserCredential>>{};
            this.FD.name = 'loginform';

            const username = new Inputs.Text('name', 'User Name', true);
            username.validation = <Inputs.IFieldValidation>{
                messages: {
                    required: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        return scope.to.label + ' is required';
                    }
                }
            }
            username.ngModelAttrs = {
                'none': {
                    attribute: 'none',
                    value: 'autocapitalize'
                }
            };

            const password = new Inputs.Password('password', 'Password');

            this.FD.fields = [
                username,
                password
            ];

            this.formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

            
        }

        onSubmit = () => {
            console.log(this.FD);
            this.invalid = false;

            const formController = (this.FD['name'] as any) as angular.IFormController;
            if (formController.$valid) {
                this.working = true;
                this.LoginService.Login(this.FD.model).then(() => {

                    this.$state.go(DASHBOARD.NAMES.FEED);
                }).catch(() => {

                    this.$timeout(() => {
                        this.invalid = true;
                        }, 800)
                    this.working = false;

                    });
            }
            
        }
    }


    const template = require('!!raw-loader!./login.html');

    function loginForm() {
        return <ng.IDirective>{
            controller: LoginFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            scope: true
            
        }
    }

    APP_MODULE.directive('loginForm', loginForm);

}