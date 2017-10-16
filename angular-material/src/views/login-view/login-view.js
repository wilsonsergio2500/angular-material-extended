"use strict";
var formly_fields_1 = require('../../formly-fields/formly-fields');
var index_1 = require('../../main/index');
var Views;
(function (Views) {
    var LoginView;
    (function (LoginView) {
        var LoginViewCtrl = (function () {
            function LoginViewCtrl() {
                var _this = this;
                this.Init = function () {
                    _this.working = false;
                    _this.FD = {};
                    _this.FD.name = 'loginform';
                    var username = new formly_fields_1.Inputs.Text('username', 'User Name', true);
                    username.validation = {
                        messages: {
                            required: function ($viewValue, $modelValue, scope) {
                                return scope.to.label + ' is required';
                            }
                        }
                    };
                    _this.FD.fields = [
                        username,
                        new formly_fields_1.Inputs.Password('password', 'Password')
                    ];
                    _this.FD.model = {};
                };
                this.onSubmit = function () {
                    _this.working = true;
                    console.log(_this.FD.model);
                };
                this.IsDisabled = function (form) {
                    console.log(form.$invalid);
                    return form.$invalid;
                };
                this.Init();
            }
            return LoginViewCtrl;
        }());
        var template = require('!!raw-loader!./login-view.html');
        function loginView() {
            return {
                controller: LoginViewCtrl,
                controllerAs: 'vm',
                bindToController: true,
                template: template,
                scope: true
            };
        }
        index_1.APP_MODULE.directive('loginView', loginView);
    })(LoginView = Views.LoginView || (Views.LoginView = {}));
})(Views || (Views = {}));
//# sourceMappingURL=login-view.js.map