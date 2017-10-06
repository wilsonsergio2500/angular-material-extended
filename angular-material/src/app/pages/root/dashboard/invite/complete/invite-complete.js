"use strict";
var iformdefinition_1 = require('../../../../../models/iformdefinition');
var formly_wrappers_1 = require('../../../../../formly-fields/formly-wrappers');
var formly_fields_1 = require('../../../../../formly-fields/formly-fields');
var InviteCompletCtrl = (function () {
    function InviteCompletCtrl(Injected, ToasterService, InviteService, $timeout) {
        var _this = this;
        this.Injected = Injected;
        this.ToasterService = ToasterService;
        this.InviteService = InviteService;
        this.$timeout = $timeout;
        this.FD = new iformdefinition_1.FormDefinition();
        this.Init = function () {
            _this.working = false;
            _this.FD.model = {
                email: _this.Injected.email,
                Role: _this.Injected.participationRoleType
            };
            var ImageUpload = new formly_fields_1.Inputs.ImagePreviewerUpload('image', 'Image', { w: 200, h: 200 });
            ImageUpload.templateOptions.imgUploader.imgType = formly_fields_1.Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
            ImageUpload.className = formly_wrappers_1.Wrappers.FlexSize(33);
            var Email = new formly_fields_1.Inputs.Email('email', 'Email', true);
            Email.className = formly_wrappers_1.Wrappers.FlexSize(66);
            var Wrapper1 = {
                className: 'layout-row layout-xs-column layout-sm-column',
                fieldGroup: [ImageUpload, Email]
            };
            var name = new formly_fields_1.Inputs.Text('name', 'Name', true);
            var lastName = new formly_fields_1.Inputs.Text('lastName', 'Last Name', true);
            var userName = new formly_fields_1.Inputs.Text('userName', 'User', true);
            var password = new formly_fields_1.Inputs.Password('password', 'Password');
            var passwordconfirmation = new formly_fields_1.Inputs.Password('password_confirm', 'Password Confirmation');
            passwordconfirmation.validators = {
                MatchPassword: {
                    expression: function ($viewValue, $modelValue, scope) {
                        return $viewValue == scope.model['password'];
                    },
                    message: '"The above value must match password field"'
                }
            };
            _this.FD.fields = [
                Wrapper1,
                formly_wrappers_1.Wrappers.RowWrapper([name, lastName]),
                userName,
                formly_wrappers_1.Wrappers.RowWrapper([password, passwordconfirmation])
            ];
        };
        this.onSubmit = function () {
            _this.working = true;
            var inviteModel = {
                user: _this.FD.model,
                invitationId: _this.Injected.id
            };
            _this.InviteService.Complete(inviteModel).then(function (response) {
                if (response.state) {
                    _this.ToasterService.ShowAsStatus('Profile Completed');
                    _this.$timeout(function () {
                        _this.working = false;
                    }, 500);
                }
            });
            console.log(inviteModel);
        };
        this.Init();
    }
    InviteCompletCtrl.$inject = ['Injected', 'ToasterService', 'InviteService', '$timeout'];
    return InviteCompletCtrl;
}());
exports.InviteCompletCtrl = InviteCompletCtrl;
//# sourceMappingURL=invite-complete.js.map