"use strict";
var iformdefinition_1 = require('../../models/iformdefinition');
var index_1 = require('../../main/index');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var formly_wrappers_1 = require('../../formly-fields/formly-wrappers');
var FormComponents;
(function (FormComponents) {
    var BlogCtrl = (function () {
        function BlogCtrl() {
            var _this = this;
            this.FD = new iformdefinition_1.FormDefinition();
            this.Init = function () {
                _this.working = false;
                var Image = new formly_fields_1.Inputs.ImagePreviewerUpload('image', 'Image', { w: 300, h: 135 });
                Image.className = formly_wrappers_1.Wrappers.FlexCenter50();
                var Theme = new formly_fields_1.Inputs.Text('theme', 'Theme', true);
                var Post = new formly_fields_1.Inputs.WysiwygTextEditor('post', 'Post');
                Post.templateOptions.htmlQuillEditor.placeholder = 'write about your Landmark';
                _this.FD.fields = [
                    Image,
                    formly_wrappers_1.Wrappers.RowWrapper([Theme]),
                    formly_wrappers_1.Wrappers.RowWrapper([Post])
                ];
            };
            this.Init();
        }
        ;
        return BlogCtrl;
    }());
    FormComponents.BlogCtrl = BlogCtrl;
    var template = require('!!raw-loader!./blog.html');
    function blogForm() {
        return {
            template: template,
            bindToController: true,
            controller: BlogCtrl,
            controllerAs: 'vm',
        };
    }
    index_1.APP_MODULE.directive('blogForm', blogForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=blog.js.map