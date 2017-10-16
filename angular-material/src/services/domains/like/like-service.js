"use strict";
var index_1 = require('../../../main/index');
var Service;
(function (Service) {
    var basePath = '/Like';
    var LikeService = (function () {
        function LikeService(HttpService) {
            this.HttpService = HttpService;
        }
        LikeService.prototype.Like = function (milestoneId) {
            return this.HttpService.Post(basePath + "/like/" + milestoneId, {});
        };
        LikeService.prototype.Unlike = function (milestoneId) {
            return this.HttpService.Delete(basePath + "/unlike/" + milestoneId, {});
        };
        LikeService.$inject = ['HttpService'];
        return LikeService;
    }());
    index_1.APP_MODULE.service('LikeService', LikeService);
})(Service || (Service = {}));
//# sourceMappingURL=like-service.js.map