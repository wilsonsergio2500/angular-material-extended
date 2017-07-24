
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { IFormDefinition } from '../../models/iformdefinition';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';

namespace Views.LoginView {


    class LoginViewCtrl {
        working: boolean;
        FD: IFormDefinition<any>;
        constructor() {
            this.Init();
        }   
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<any>>{};
            this.FD.name = 'loginform';

            const username = new Inputs.Text('username', 'User Name', true);
            username.validation = <Inputs.IFieldValidation>{
                messages: {
                    required: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        return scope.to.label + ' is required';
                    }
                }
            }

            this.FD.fields = [
                username,
                new Inputs.Password('password', 'Password')
            ];
            this.FD.model = {};

        }
        onSubmit = () => {
            this.working = true;
            console.log(this.FD.model);
        }
        IsDisabled = (form: angular.IFormController) => {
            console.log(form.$invalid);
            return form.$invalid;
        }
    }

    const template = require('!!raw-loader!./login-view.html');
    function loginView() {
        return <angular.IDirective>{
            controller: LoginViewCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            scope: true
        }
    }

    APP_MODULE.directive('loginView', loginView);
}
