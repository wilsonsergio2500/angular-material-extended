"use strict";
var formly_fields_1 = require('../../formly-fields/formly-fields');
var index_1 = require('../../main/index');
var route_names_1 = require('../../pages/root/dashboard/route-names');
var FormComponents;
(function (FormComponents) {
    var LoginFormCtrl = (function () {
        function LoginFormCtrl(LoginService, $state) {
            var _this = this;
            this.LoginService = LoginService;
            this.$state = $state;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'loginform';
                var username = new formly_fields_1.Inputs.Text('name', 'User Name', true);
                username.validation = {
                    messages: {
                        required: function ($viewValue, $modelValue, scope) {
                            return scope.to.label + ' is required';
                        }
                    }
                };
                var password = new formly_fields_1.Inputs.Password('password', 'Password');
                _this.FD.fields = [
                    username,
                    password
                ];
            };
            this.onSubmit = function () {
                _this.working = true;
                _this.LoginService.Login(_this.FD.model).then(function () {
                    _this.$state.go(route_names_1.DASHBOARD.NAMES.FEED);
                });
            };
            this.Init();
        }
        LoginFormCtrl.$inject = ['LoginService', '$state'];
        return LoginFormCtrl;
    }());
    var template = require('!!raw-loader!./login.html');
    function loginForm() {
        return {
            controller: LoginFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            scope: true
        };
    }
    index_1.APP_MODULE.directive('loginForm', loginForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=login.js.map