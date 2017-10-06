"use strict";
var index_1 = require('../../../main/index');
exports.AUTH_ERROR = 'AUTH_ERROR';
var Services;
(function (Services) {
    var basePath = '/login';
    var LoginService = (function () {
        function LoginService($auth, $q, HttpService) {
            this.$auth = $auth;
            this.$q = $q;
            this.HttpService = HttpService;
        }
        LoginService.prototype.Login = function (credentials) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.$auth.login(credentials).then(function (response) {
                    resolve(response);
                    console.log('login good');
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        LoginService.prototype.IsAuthenticated = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.HttpService.get(basePath + "/IsAuthenticated").then(resolve).catch(function (error) {
                    reject(exports.AUTH_ERROR);
                });
            });
        };
        LoginService.$inject = ['$auth', '$q', 'HttpService'];
        return LoginService;
    }());
    index_1.APP_MODULE.service('LoginService', LoginService);
})(Services || (Services = {}));
//# sourceMappingURL=login-service.js.map