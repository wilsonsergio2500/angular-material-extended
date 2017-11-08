
import * as angular from 'angular';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';
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
        static $inject = ['CategoryService', 'ToasterService', '$timeout', '$q']
        constructor(private CategoryService: ICategoryService, private ToasterService: IToasterService, private $timeout: angular.ITimeoutService, private $q: angular.IQService) {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = new FormDefinition<ICategory>(); 
            this.FD.name = 'categoryForm';
            let categoryAsyncResponse: number = null;

            const categoryName = new Inputs.Text('Name', 'Category Name', true);
            categoryName.templateOptions.placeholder = 'Enter Category Name';
            categoryName.asyncValidators = {
                categoryUnique: {
                    expression: ($viewValue, $modelValue, scope) => {

                        clearTimeout(categoryAsyncResponse);

                        this.FD.working = true;

                        return this.$q((resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                            categoryAsyncResponse = setTimeout(() => {

                                this.CategoryService.DoesNameExist($viewValue).then((R: IActionResponse) => {
                                    if (R.state) {
                                        reject('category name taken');
                                        //after blur I might want to blur in order to signal error
                                    }
                                    this.FD.working = false;
                                });

                            }, 200);
                        });
                      
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