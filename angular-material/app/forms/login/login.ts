
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
        static $inject = ['LoginService', '$state']
        constructor(private LoginService: ILoginService, private $state: angular.ui.IStateService) {
            this.Init();
        }
        Init = () => {
            this.working = false;
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
            const password = new Inputs.Password('password', 'Password');

            this.FD.fields = [
                username,
                password
            ];
        }

        onSubmit = () => {
            console.log(this.FD);

            const formController = (this.FD['name'] as any) as angular.IFormController;
            if (formController.$valid) {
                this.working = true;
                this.LoginService.Login(this.FD.model).then(() => {

                    this.$state.go(DASHBOARD.NAMES.FEED);
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