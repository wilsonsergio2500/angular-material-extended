"use strict";
var index_1 = require('../../../main/index');
var Services;
(function (Services) {
    var basePath = '/milestone';
    var MilestoneService = (function () {
        function MilestoneService(HttpService) {
            this.HttpService = HttpService;
        }
        MilestoneService.prototype.Add = function (milestone) {
            return this.HttpService.Post(basePath + "/new", milestone);
        };
        MilestoneService.prototype.GetListByUser = function (request) {
            return this.HttpService.get(basePath + "/user/records/" + request.skip + "/" + request.take);
        };
        MilestoneService.prototype.GetList = function (request) {
            return this.HttpService.get(basePath + "/records/" + request.skip + "/" + request.take);
        };
        MilestoneService.$inject = ['HttpService'];
        return MilestoneService;
    }());
    index_1.APP_MODULE.service('MilestoneService', MilestoneService);
})(Services || (Services = {}));
//# sourceMappingURL=milestone-service.js.map