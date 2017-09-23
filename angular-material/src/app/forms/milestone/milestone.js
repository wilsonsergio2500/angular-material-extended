"use strict";
var index_1 = require('../../main/index');
var iformdefinition_1 = require('../../models/iformdefinition');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var formly_wrappers_1 = require('../../formly-fields/formly-wrappers');
var FormComponents;
(function (FormComponents) {
    var MilestoneCtrl = (function () {
        function MilestoneCtrl() {
            var _this = this;
            this.FD = new iformdefinition_1.FormDefinition();
            this.Init = function () {
                _this.working = false;
                var Image = new formly_fields_1.Inputs.ImagePreviewerUpload('image', 'Image', { w: 300, h: 135 });
                Image.className = formly_wrappers_1.Wrappers.FlexCenter50();
                var Theme = new formly_fields_1.Inputs.Text('theme', 'Landmark', true);
                var Post = new formly_fields_1.Inputs.QuillTextEditor('post', 'Post');
                Post.templateOptions.htmlQuillEditor.toolbarTheme;
                _this.FD.fields = [
                    Image,
                    formly_wrappers_1.Wrappers.RowWrapper([Theme])
                ];
            };
            this.Init();
        }
        ;
        return MilestoneCtrl;
    }());
    FormComponents.MilestoneCtrl = MilestoneCtrl;
    var template = require('!!raw-loader!./milestone.html');
    function milestoneForm() {
        return {
            template: template,
            bindToController: true,
            controller: MilestoneCtrl,
            controllerAs: 'vm',
        };
    }
    index_1.APP_MODULE.directive('milestoneForm', milestoneForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=milestone.js.map