"use strict";
var index_1 = require('../../main/index');
var RoleService = (function () {
    function RoleService($http, $q, $timeout) {
        var _this = this;
        this.$http = $http;
        this.$q = $q;
        this.$timeout = $timeout;
        this.getRoles = function () {
            var defer = _this.$q.defer();
            var items = [];
            items.push({ name: 'Member', value: "1" });
            items.push({ name: 'CEO', value: "2" });
            items.push({ name: 'Admin', value: "3" });
            setTimeout(function () {
                defer.resolve(items);
            }, 500);
            return defer.promise;
        };
    }
    RoleService.$inject = ['$http', '$q', '$timeout'];
    return RoleService;
}());
exports.RoleService = RoleService;
index_1.APP_MODULE.service('RoleService', RoleService);
//# sourceMappingURL=role-service.js.map