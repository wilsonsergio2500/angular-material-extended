"use strict";
var iformdefinition_1 = require('../../models/iformdefinition');
var formly_fields_1 = require('../../formly-fields/formly-fields');
var index_1 = require('../../main/index');
var formly_wrappers_1 = require('../../formly-fields/formly-wrappers');
var FormComponents;
(function (FormComponents) {
    var ProfileFormCtrl = (function () {
        function ProfileFormCtrl($timeout) {
            var _this = this;
            this.$timeout = $timeout;
            this.FD = new iformdefinition_1.FormDefinition();
            this.Init = function () {
                var Image = new formly_fields_1.Inputs.ImagePreviewerUpload('Image', 'Image', { w: 200, h: 200 });
                Image.templateOptions.imgUploader.imgType = formly_fields_1.Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
                Image.className = formly_wrappers_1.Wrappers.FlexCenter50();
                var FirstName = new formly_fields_1.Inputs.Text('FirstName', 'First Name', true);
                FirstName.className = formly_wrappers_1.Wrappers.FlexPadding();
                var LastName = new formly_fields_1.Inputs.Text('LastName', 'Last Name', true);
                LastName.className = formly_wrappers_1.Wrappers.FlexPadding();
                var Email = new formly_fields_1.Inputs.Email('Email', 'Email', true);
                Email.className = formly_wrappers_1.Wrappers.FlexPadding();
                var UserName = new formly_fields_1.Inputs.Email('UserName', 'User Name', true);
                UserName.className = formly_wrappers_1.Wrappers.FlexPadding();
                var Password = new formly_fields_1.Inputs.Password('Password', 'Pasword');
                var ImgWrapper = {
                    className: 'layout-row',
                    fieldGroup: [Image]
                };
                _this.FD.fields = [
                    ImgWrapper,
                    formly_wrappers_1.Wrappers.RowWrapper([FirstName, LastName]),
                    formly_wrappers_1.Wrappers.RowWrapper([UserName, Email])
                ];
            };
            this.Init();
        }
        ProfileFormCtrl.$inject = ['$timeout'];
        return ProfileFormCtrl;
    }());
    FormComponents.ProfileFormCtrl = ProfileFormCtrl;
    var template = require('!!raw-loader!./profile.html');
    function profileForm() {
        return {
            controller: ProfileFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
        };
    }
    index_1.APP_MODULE.directive('profileForm', profileForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=profile.js.map