"use strict";
var RouteResolves;
(function (RouteResolves) {
    var InviteComplete = (function () {
        function InviteComplete() {
        }
        InviteComplete.Resolve = {
            Injected: ['$stateParams', 'InviteService',
                function ($stateParams, InviteService) {
                    return InviteService.Get($stateParams.Id);
                }
            ]
        };
        return InviteComplete;
    }());
    RouteResolves.InviteComplete = InviteComplete;
})(RouteResolves = exports.RouteResolves || (exports.RouteResolves = {}));
//# sourceMappingURL=route-resolves.js.map