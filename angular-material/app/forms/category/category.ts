
import * as angular from 'angular';
import { IFormDefinition } from '../../models/iformdefinition';
import { APP_MODULE } from '../../main/index';
import { Inputs } from '../../formly-fields/formly-fields';
import * as formly from 'AngularFormly';

import { ICategoryService } from '../../services/domains/category/category-service';
import { ICategory } from '../../models/contracts/request/category/icategory';
import { IToasterService, IToasterStatusMessages } from '../../services/toaster-service/toater-service';
import { IActionResponse } from '../../models/contracts/response/iactionresponse';

namespace FormComponents {

    const STATUS_MESSAGES: IToasterStatusMessages = {
        Success: 'Category Added',
        Error: 'Adding Record Failed'
    }

    export class CategoryFormCtrl {

        working: boolean;
        FD: IFormDefinition<ICategory>;
        static $inject = ['CategoryService', 'ToasterService', '$timeout']
        constructor(private CategoryService: ICategoryService, private ToasterService: IToasterService, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<ICategory>>{};
            this.FD.name = 'categoryForm';

            const categoryName = new Inputs.Text('Name', 'Category Name', true);
            categoryName.templateOptions.placeholder = 'Enter Category Name';
            categoryName.asyncValidators = {
                categoryUnique: {
                    expression: ($viewValue, $modelValue, scope) => {
                       return this.CategoryService.DoesNameExist($viewValue).then((R : IActionResponse) => {
                            if (R.state) {
                                throw new Error('category name taken');
                            }
                        })
                    },
                    message: '"Category Name already exist."'
                }
            }
           
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

        onSubmit = () => {
            this.working = true;
            this.CategoryService.Add(this.FD.model).then((response) => {
                if (response.state) {
                   this.ToasterService.ShowAsStatus('Category Added Successfully', 3000);
                }
                
            })

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