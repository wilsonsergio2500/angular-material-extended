"use strict";
var RootRouteResolves;
(function (RootRouteResolves) {
    var Login = (function () {
        function Login() {
        }
        Login.Resolve = {
            Injected: ['LoginService', function (LoginService) {
                    return LoginService.IsLoginViewAllowed();
                }]
        };
        return Login;
    }());
    RootRouteResolves.Login = Login;
})(RootRouteResolves = exports.RootRouteResolves || (exports.RootRouteResolves = {}));
//# sourceMappingURL=root-resolves.js.map