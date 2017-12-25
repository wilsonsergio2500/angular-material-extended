import * as angular from 'angular';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';
import { APP_MODULE } from '../../main/index'

namespace Components.JsonForm {

    class JsonFormCtrl {
        formDefinition: IFormDefinition<any>;
        buttonText: string;
        buttonTextBusy: string;
        buttonBusy: boolean;
        onFormSubmit: Function;
        constructor() {

        }
        onSubmit() {
            this.onFormSubmit.call(this, { $model: this.formDefinition.model });
        }

    }
    const template = require('!!raw-loader!./json-form.html');
    function jsonForm(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: JsonFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                formDefinition: '=',
                buttonText: '@',
                buttonTextBusy: '@',
                buttonBusy: '=',
                onFormSubmit: '&'
            }
        }
    }

    APP_MODULE.directive('jsonForm', jsonForm);
}