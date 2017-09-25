"use strict";
var index_1 = require('../../../main/index');
var Services;
(function (Services) {
    var basePath = '/category';
    var CategoryService = (function () {
        function CategoryService(HttpService) {
            this.HttpService = HttpService;
        }
        CategoryService.prototype.Add = function (category) {
            return this.HttpService.Post(basePath + "/new/" + category.Name, {});
        };
        CategoryService.prototype.GetList = function (request) {
            return this.HttpService.get(basePath + "/records/" + request.skip + "/" + request.take, {});
        };
        CategoryService.prototype.DoesNameExist = function (name) {
            return this.HttpService.get("exist/" + name);
        };
        CategoryService.$inject = ['HttpService'];
        return CategoryService;
    }());
    index_1.APP_MODULE.service('CategoryService', CategoryService);
})(Services || (Services = {}));
//# sourceMappingURL=category-service.js.map