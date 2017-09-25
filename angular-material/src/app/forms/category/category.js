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
        function CategoryFormCtrl(CategoryService, ToasterService) {
            var _this = this;
            this.CategoryService = CategoryService;
            this.ToasterService = ToasterService;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'categoryForm';
                var categoryName = new formly_fields_1.Inputs.Text('Name', 'Category Name', true);
                categoryName.templateOptions.placeholder = 'Enter Category Name';
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
                _this.CategoryService.Add(_this.FD.model).then(function (R) {
                    _this.ToasterService.ShowStatus(R, STATUS_MESSAGES);
                });
            };
            this.Init();
        }
        CategoryFormCtrl.$inject = ['CategoryService', 'ToasterService'];
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