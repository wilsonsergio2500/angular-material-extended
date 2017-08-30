
import * as angular from 'angular';
import { IFormDefinition } from '../../models/iformdefinition';
import { APP_MODULE } from '../../main/index';
import { Inputs } from '../../formly-fields/formly-fields';
import * as formly from 'AngularFormly';

namespace FormComponents {

    export class CategoryFormCtrl {

        working: boolean;
        FD: IFormDefinition<any>;
        constructor() {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<any>>{};
            this.FD.name = 'categoryForm';

            const categoryName = new Inputs.Text('category', 'Category Name', true);
            categoryName.templateOptions.placeholder = 'Enter Category Name';
            categoryName.validation = {
                messages: {
                    required: ($viewvalue: any, $modelvalue: any, scope: formly.ITemplateScope) => {
                        return scope.to.label + ' is required'; 
                    }
                }
            }

            this.FD.fields = [
                categoryName
            ];

        }
    }

    const template = require('!!raw-loader!./category.html');

    function categoryForm() {
        return <angular.IDirective>{
            controller: CategoryFormCtrl,
            controllerAs: 'vm',
            bindToController: template,
            template: template,
        }
    }

    APP_MODULE.directive('categoryForm', categoryForm);
}