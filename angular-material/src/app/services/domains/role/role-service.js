"use strict";
var index_1 = require('../../../main/index');
var Services;
(function (Services) {
    var basePath = '/role';
    var RoleService = (function () {
        function RoleService(HttpService) {
            this.HttpService = HttpService;
        }
        RoleService.prototype.GetRoles = function () {
            return this.HttpService.get(basePath + "/list");
        };
        RoleService.$inject = ['HttpService'];
        return RoleService;
    }());
    index_1.APP_MODULE.service('RoleService', RoleService);
})(Services || (Services = {}));
//# sourceMappingURL=role-service.js.map