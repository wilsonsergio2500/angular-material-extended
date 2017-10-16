"use strict";
var index_1 = require('../../main/index');
var SecureRouteService = (function () {
    function SecureRouteService(LoginService) {
        this.LoginService = LoginService;
    }
    SecureRouteService.prototype.Secure = function (delegate) {
        var _this = this;
        if (delegate === void 0) { delegate = null; }
        if (!!delegate) {
            return this.LoginService.IsAuthenticated().then(function () {
                console.log('in then');
                return delegate.call(_this);
            });
        }
        else {
            return this.LoginService.IsAuthenticated();
        }
    };
    SecureRouteService.$inject = ['LoginService'];
    return SecureRouteService;
}());
index_1.APP_MODULE.service('SecureRouteService', SecureRouteService);
//# sourceMappingURL=secure-route.js.map