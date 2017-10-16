"use strict";
var index_1 = require('../../main/index');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var FormComponents;
(function (FormComponents) {
    var STATUS_MESSAGES = {
        Success: 'Category Added',
        Error: 'Adding Record Failed'
    };
    var CategoryFormCtrl = (function () {
        function CategoryFormCtrl(CategoryService, ToasterService, $timeout) {
            var _this = this;
            this.CategoryService = CategoryService;
            this.ToasterService = ToasterService;
            this.$timeout = $timeout;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'categoryForm';
                var categoryName = new formly_fields_1.Inputs.Text('Name', 'Category Name', true);
                categoryName.templateOptions.placeholder = 'Enter Category Name';
                categoryName.asyncValidators = {
                    categoryUnique: {
                        expression: function ($viewValue, $modelValue, scope) {
                            return _this.CategoryService.DoesNameExist($viewValue).then(function (R) {
                                if (R.state) {
                                    throw new Error('category name taken');
                                }
                            });
                        },
                        message: '"Category Name already exist."'
                    }
                };
                categoryName.validation = {
                    messages: {
                        required: function ($viewvalue, $modelvalue, scope) {
                            return scope.to.label + ' is required';
                        }
                    }
                };
                _this.FD.fields = [
                    categoryName
                ];
            };
            this.onSubmit = function () {
                _this.working = true;
                _this.CategoryService.Add(_this.FD.model).then(function (response) {
                    if (response.state) {
                        _this.ToasterService.ShowAsStatus('Category Added Successfully', 3000);
                    }
                });
            };
            this.Init();
        }
        CategoryFormCtrl.$inject = ['CategoryService', 'ToasterService', '$timeout'];
        return CategoryFormCtrl;
    }());
    FormComponents.CategoryFormCtrl = CategoryFormCtrl;
    var template = require('!!raw-loader!./category.html');
    function categoryForm() {
        return {
            controller: CategoryFormCtrl,
            controllerAs: 'vm',
            bindToController: template,
            template: template,
        };
    }
    index_1.APP_MODULE.directive('categoryForm', categoryForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=category.js.map