"use strict";
var index_1 = require('../../../main/index');
var Services;
(function (Services) {
    var basePath = '/invite';
    var InviteService = (function () {
        function InviteService(HttpService) {
            this.HttpService = HttpService;
        }
        InviteService.prototype.Add = function (newInvite) {
            return this.HttpService.Post(basePath + "/new/" + newInvite.email + "/" + newInvite.participationRoleType, {});
        };
        InviteService.prototype.Get = function (id) {
            return this.HttpService.get(basePath + "/" + id, {});
        };
        InviteService.prototype.Complete = function (request) {
            return this.HttpService.Post(basePath + "/complete", request);
        };
        InviteService.$inject = ['HttpService'];
        return InviteService;
    }());
    Services.InviteService = InviteService;
    index_1.APP_MODULE.service('InviteService', InviteService);
})(Services || (Services = {}));
//# sourceMappingURL=invite-service.js.map