"use strict";
var index_1 = require('../../main/index');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var FormComponents;
(function (FormComponents) {
    var CategoryFormCtrl = (function () {
        function CategoryFormCtrl() {
            var _this = this;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'categoryForm';
                var categoryName = new formly_fields_1.Inputs.Text('category', 'Category Name', true);
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
            this.Init();
        }
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