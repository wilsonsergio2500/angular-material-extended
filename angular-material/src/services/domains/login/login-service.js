"use strict";
var index_1 = require('../../../main/index');
var route_names_1 = require('../../../pages/root/route-names');
exports.ROUTE_ERRORS = {
    AUTH_ERROR: 'AUTH_ERROR',
    LOGIN_VIEW_ERROR: 'LOGIN_VIEW_ERROR'
};
var Services;
(function (Services) {
    var basePath = '/login';
    var LoginService = (function () {
        function LoginService($auth, $q, HttpService, $state, $timeout) {
            var _this = this;
            this.$auth = $auth;
            this.$q = $q;
            this.HttpService = HttpService;
            this.$state = $state;
            this.$timeout = $timeout;
            this.LogOut = function () {
                _this.$auth.logout();
                _this.$timeout(function () {
                    _this.$state.go(route_names_1.ROOT_ITEMS.NAMES.LOGIN);
                }, 200);
            };
        }
        LoginService.prototype.Login = function (credentials) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.$auth.login(credentials).then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        LoginService.prototype.IsAuthenticated = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.HttpService.get(basePath + "/IsAuthenticated").then(resolve).catch(function (error) {
                    reject(exports.ROUTE_ERRORS.AUTH_ERROR);
                });
            });
        };
        LoginService.prototype.IsLoginViewAllowed = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                _this.HttpService.get(basePath + "/IsAuthenticated").then(function () {
                    reject(exports.ROUTE_ERRORS.LOGIN_VIEW_ERROR);
                }).catch(resolve);
            });
        };
        LoginService.$inject = ['$auth', '$q', 'HttpService', '$state', '$timeout'];
        return LoginService;
    }());
    index_1.APP_MODULE.service('LoginService', LoginService);
})(Services || (Services = {}));
//# sourceMappingURL=login-service.js.map