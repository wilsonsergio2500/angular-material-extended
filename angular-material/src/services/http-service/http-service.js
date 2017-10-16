"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var isProd = process.env.NODE_ENV === 'production';
var apiPath = '/api';
var apiDomain = (isProd) ? "/" : 'http://localhost:46037';
exports.basePath = "" + apiDomain + apiPath;
var ENDPOINT = {
    BUILD: function (path) {
        return exports.basePath + path;
    }
};
var PromiseSolver = (function () {
    function PromiseSolver(resolve, reject) {
        var _this = this;
        this.resolve = resolve;
        this.reject = reject;
        //do something with the ErrorPayload
        this.Rejector = function (ErrorPayload, reject) {
            reject(ErrorPayload);
        };
        this.Resolver = function (payload, resolve) {
            resolve(payload.data);
        };
        this.Solve = function (Promise) {
            Promise.then(function (response) { _this.Resolver(response, _this.resolve); }).catch(function (error) { _this.Rejector(error, _this.reject); });
        };
    }
    return PromiseSolver;
}());
exports.PromiseSolver = PromiseSolver;
var HttpService = (function () {
    function HttpService($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.Rejector = function (ErrorPayload, reject) {
            //do something with the ErrorPayload
            reject(ErrorPayload);
        };
        this.Resolver = function (payload, resolve) {
            resolve(payload.data);
        };
    }
    HttpService.prototype.get = function (path, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.$q(function (resolve, reject) {
            new PromiseSolver(resolve, reject).Solve(_this.$http({ url: ENDPOINT.BUILD(path), method: 'GET', params: data }));
        });
    };
    HttpService.prototype.Post = function (path, data) {
        var _this = this;
        return this.$q(function (resolve, reject) {
            new PromiseSolver(resolve, reject).Solve(_this.$http.post(ENDPOINT.BUILD(path), data));
        });
    };
    HttpService.prototype.Put = function (path, data) {
        var _this = this;
        return this.$q(function (resolve, reject) {
            new PromiseSolver(resolve, reject).Solve(_this.$http.put(ENDPOINT.BUILD(path), data));
        });
    };
    HttpService.prototype.Delete = function (path, data) {
        var _this = this;
        return this.$q(function (resolve, reject) {
            new PromiseSolver(resolve, reject).Solve(_this.$http.delete(ENDPOINT.BUILD(path)));
        });
    };
    HttpService.prototype.FileUpload = function (path, data) {
        var _this = this;
        //let defer = this.$q.defer();
        var fd = new FormData();
        fd.append('file', data.File);
        angular.forEach(data.Params, function (value, key) {
            fd.append(key, value);
        });
        return this.$q(function (resolve, reject) {
            new PromiseSolver(resolve, reject).Solve(_this.$http.post(ENDPOINT.BUILD(path), fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
            }));
        });
        //this.$http.post<T1>(ENDPOINT.BUILD(path), fd, <angular.IRequestShortcutConfig>{
        //    transformRequest: angular.identity,
        //    headers: { 'Content-Type': undefined },
        //}).success(defer.resolve).error(defer.reject);
        //return defer.promise;
    };
    HttpService.$inject = ['$http', '$q'];
    return HttpService;
}());
exports.HttpService = HttpService;
index_1.APP_MODULE.service('HttpService', HttpService);
//# sourceMappingURL=http-service.js.map