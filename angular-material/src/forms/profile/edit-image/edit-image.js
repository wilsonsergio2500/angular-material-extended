"use strict";
var index_1 = require('../../../main/index');
var iformdefinition_1 = require('../../../models/iformdefinition');
var formly_fields_1 = require('../../../formly-fields/formly-fields');
var formly_wrappers_1 = require('../../../formly-fields/formly-wrappers');
var FormComponents;
(function (FormComponents) {
    var ProfileEditImageCtrl = (function () {
        function ProfileEditImageCtrl(UserService, $timeout, ToasterService) {
            var _this = this;
            this.UserService = UserService;
            this.$timeout = $timeout;
            this.ToasterService = ToasterService;
            this.InitView = function () {
                _this.Loading = true;
                _this.FD = new iformdefinition_1.FormDefinition();
                _this.UserService.GetMe().then(function (response) {
                    _this.InitForm(response.image);
                    _this.$timeout(function () {
                        _this.Loading = false;
                    }, 200);
                });
            };
            this.InitForm = function (img) {
                _this.working = false;
                _this.FD.model.image = img;
                var Image = new formly_fields_1.Inputs.ImagePreviewerUpload('image', 'Image', { w: 200, h: 200 });
                Image.templateOptions.imgUploader.imgType = formly_fields_1.Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
                Image.className = formly_wrappers_1.Wrappers.FlexCenter50();
                var ImgWrapper = {
                    className: 'layout-row',
                    fieldGroup: [Image]
                };
                _this.FD.fields = [
                    ImgWrapper
                ];
            };
            this.onSubmit = function () {
                _this.working = true;
                _this.UserService.UpateImage(_this.FD.model).then(function (response) {
                    if (response.state) {
                        _this.ToasterService.ShowAsStatus('Image Updated Successfully');
                    }
                });
            };
            this.InitView();
        }
        ProfileEditImageCtrl.$inject = ['UserService', '$timeout', 'ToasterService'];
        return ProfileEditImageCtrl;
    }());
    var template = require('!!raw-loader!./edit-image.html');
    function profileEditImageForm() {
        return {
            controller: ProfileEditImageCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
        };
    }
    index_1.APP_MODULE.directive('profileEditImageForm', profileEditImageForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=edit-image.js.map