"use strict";
var index_1 = require('../../../main/index');
var Services;
(function (Services) {
    var basePath = '/User';
    var UserService = (function () {
        function UserService(HttpService) {
            this.HttpService = HttpService;
        }
        UserService.prototype.GetUser = function (userId) {
            return this.HttpService.get(basePath + "/" + userId);
        };
        UserService.prototype.GetMe = function () {
            return this.HttpService.get(basePath + "/me");
        };
        UserService.prototype.UpateImage = function (image) {
            return this.HttpService.Put(basePath + "/me/image/" + image, {});
        };
        UserService.prototype.UpdatePassword = function (request) {
            return this.HttpService.Put(basePath + "/me/password/", request);
        };
        UserService.$inject = ['HttpService'];
        return UserService;
    }());
    index_1.APP_MODULE.service('UserService', UserService);
})(Services || (Services = {}));
//# sourceMappingURL=user-service.js.map