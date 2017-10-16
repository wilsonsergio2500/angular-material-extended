"use strict";
var index_1 = require('../../../main/index');
var iformdefinition_1 = require('../../../models/iformdefinition');
var formly_fields_1 = require('../../../formly-fields/formly-fields');
var formly_wrappers_1 = require('../../../formly-fields/formly-wrappers');
var FormComponents;
(function (FormComponents) {
    var EditBioCtrl = (function () {
        function EditBioCtrl(UserService, ToasterService) {
            var _this = this;
            this.UserService = UserService;
            this.ToasterService = ToasterService;
            this.Init = function () {
                _this.working = false;
                _this.FD = new iformdefinition_1.FormDefinition();
                if (!!_this.record.bio) {
                    _this.FD.model.bio = _this.record.bio;
                }
                var Bio = new formly_fields_1.Inputs.WysiwygTextEditor('bio', 'Bio');
                Bio.templateOptions.htmlQuillEditor.toolbarTheme = formly_fields_1.Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
                Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';
                _this.FD.fields = [
                    formly_wrappers_1.Wrappers.RowWrapper([Bio])
                ];
            };
            this.onSubmit = function () {
                _this.working = true;
                _this.UserService.UpdateBio(_this.FD.model).then(function (response) {
                    if (response.state) {
                        _this.ToasterService.ShowAsStatus('Bio updated Succesfully');
                    }
                });
            };
            this.Init();
        }
        EditBioCtrl.$inject = ['UserService', 'ToasterService'];
        return EditBioCtrl;
    }());
    var template = require('!!raw-loader!./edit-bio.html');
    function profileEditBioForm() {
        return {
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: EditBioCtrl,
            scope: {
                record: '='
            }
        };
    }
    index_1.APP_MODULE.directive('profileEditBioForm', profileEditBioForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=edit-bio.js.map