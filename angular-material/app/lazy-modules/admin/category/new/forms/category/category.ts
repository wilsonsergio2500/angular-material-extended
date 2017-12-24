
declare var angular: angular.IAngularStatic;
import { IFormDefinition, FormDefinition } from '../../../../../../models/iformdefinition';
import { IInvite } from '../../../../../../models/contracts/request/invite/iinvite';
import { IRole } from '../../../../../../models/contracts/response/role/irole';
import { IError } from '../../../../../../models/contracts/ierror';
import { Inputs } from '../../../../../../formly-fields/formly-fields';
import { IRoleService } from '../../../../../../services/domains/role/role-service';
import { IToasterService, IToasterStatusMessages } from '../../../../../../services/toaster-service/toater-service';
import { IDialogService } from '../../../../../../services/dialog-service/dialog-service';
import { IInviteService } from '../../../../../../services/domains/invite/invite-service';
import { ICategoryService } from '../../../../../../services/domains/category/category-service';
import { ICategory } from '../../../../../../models/contracts/request/category/icategory';
import { IActionResponse } from '../../../../../../models/contracts/response/iactionresponse';

import { ADMIN_MODULE } from '../../../../module';
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
            //this.FD.name = 'categoryForm';
            let categoryAsyncResponse: number = null;

            const categoryName = new Inputs.Text('Name', 'Category Name', true);
            categoryName.templateOptions.placeholder = 'Enter Category Name';
            categoryName.asyncValidators = {
                unique: {
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
                                    resolve();
                                    this.FD.working = false;
                                });

                            }, 200);
                        });
                      
                    },
                }
            }
          
           
            categoryName.validation = {
                messages: {
                    required: ($viewvalue: any, $modelvalue: any, scope: AngularFormly.ITemplateScope) => {
                        return scope.to.label + ' is required'; 
                    },
                    unique: '"Category Name already exist."'
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

    ADMIN_MODULE.directive('categoryForm', categoryForm);
}