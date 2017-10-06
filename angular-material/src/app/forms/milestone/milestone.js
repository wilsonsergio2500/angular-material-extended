"use strict";
var index_1 = require('../../main/index');
var iformdefinition_1 = require('../../models/iformdefinition');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var formly_wrappers_1 = require('../../formly-fields/formly-wrappers');
var milestonetype_1 = require('../../models/contracts/request/milestone/milestonetype');
var FormComponents;
(function (FormComponents) {
    var MilestoneCtrl = (function () {
        function MilestoneCtrl($q, CategoryService, MilestoneService, ToasterService) {
            var _this = this;
            this.$q = $q;
            this.CategoryService = CategoryService;
            this.MilestoneService = MilestoneService;
            this.ToasterService = ToasterService;
            this.FD = new iformdefinition_1.FormDefinition();
            this.Init = function () {
                _this.working = false;
                var Image = new formly_fields_1.Inputs.ImagePreviewerUpload('image', 'Image', { w: 300, h: 135 });
                Image.className = formly_wrappers_1.Wrappers.FlexCenter50();
                var Theme = new formly_fields_1.Inputs.Text('theme', 'Theme', true);
                var Post = new formly_fields_1.Inputs.WysiwygTextEditor('postContent', 'Post');
                Post.templateOptions.htmlQuillEditor.toolbarTheme = formly_fields_1.Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
                Post.templateOptions.htmlQuillEditor.placeholder = 'write about your Landmark';
                var Category = new formly_fields_1.Inputs.ChipOptions('categories', 'Category', 'name');
                Category.templateOptions.chipItem.optionsPromise = _this.$categoryQuery;
                if (_this.milestoneType == milestonetype_1.MilestoneType.LandMark) {
                    _this.FD.fields = [
                        Image,
                        formly_wrappers_1.Wrappers.RowWrapper([Theme]),
                        formly_wrappers_1.Wrappers.RowWrapper([Category]),
                        formly_wrappers_1.Wrappers.RowWrapper([Post])
                    ];
                }
                if (_this.milestoneType == milestonetype_1.MilestoneType.Post) {
                    Post.templateOptions.htmlQuillEditor.toolbarTheme = formly_fields_1.Inputs.TEXT_EDITOR_TOOLBAR_THEMES.ALL;
                    _this.FD.fields = [
                        Image,
                        formly_wrappers_1.Wrappers.RowWrapper([Theme]),
                        formly_wrappers_1.Wrappers.RowWrapper([Post])
                    ];
                }
            };
            this.$categoryQuery = function (query) {
                return _this.CategoryService.MatchCategory(query);
            };
            this.onSubmit = function () {
                _this.working = true;
                _this.FD.model.type = _this.milestoneType;
                _this.MilestoneService.Add(_this.FD.model).then(function (reponse) {
                    if (reponse.state) {
                        _this.ToasterService.ShowAsStatus('Milestone Added Successfully');
                        _this.working = false;
                    }
                });
                console.log(_this.FD.model);
            };
            console.log(this.milestoneType);
            this.Init();
        }
        ;
        MilestoneCtrl.$inject = ['$q', 'CategoryService', 'MilestoneService', 'ToasterService'];
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
            scope: {
                milestoneType: '='
            }
        };
    }
    index_1.APP_MODULE.directive('milestoneForm', milestoneForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=milestone.js.map