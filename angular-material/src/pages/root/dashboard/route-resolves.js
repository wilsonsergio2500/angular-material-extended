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
    var MilestoneView = (function () {
        function MilestoneView() {
        }
        MilestoneView.Resolve = {
            Injected: ['SecureRouteService', '$stateParams', '$q', 'MilestoneService',
                function (SecureRouteService, $stateParams, $q, MilestoneService) {
                    return SecureRouteService.Secure(function () {
                        return MilestoneService.Get($stateParams.Id);
                    });
                }]
        };
        return MilestoneView;
    }());
    RouteResolves.MilestoneView = MilestoneView;
    var MilestoneResolves;
    (function (MilestoneResolves) {
        var ADD = (function () {
            function ADD() {
            }
            ADD.Resolve = {
                Injected: ['SecureRouteService', 'UserService', function (SecureRouteService, UserService) {
                        return SecureRouteService.Secure(function () {
                            return UserService.GetMe();
                        });
                    }]
            };
            return ADD;
        }());
        MilestoneResolves.ADD = ADD;
    })(MilestoneResolves = RouteResolves.MilestoneResolves || (RouteResolves.MilestoneResolves = {}));
    var Profile;
    (function (Profile) {
        var VIEWS;
        (function (VIEWS) {
            var MAIN = (function () {
                function MAIN() {
                }
                MAIN.Resolve = {
                    Injected: ['SecureRouteService', '$stateParams', 'UserService', '$q', 'CategoryService',
                        function (SecureRouteService, $stateParams, UserService, $q, CategoryService) {
                            return SecureRouteService.Secure(function () {
                                return $q.all({
                                    user: UserService.GetUser($stateParams.Id),
                                    categoryTabs: CategoryService.GetTabs(),
                                });
                            });
                        }]
                };
                return MAIN;
            }());
            VIEWS.MAIN = MAIN;
        })(VIEWS = Profile.VIEWS || (Profile.VIEWS = {}));
        var EditBio = (function () {
            function EditBio() {
            }
            EditBio.Resolve = {
                Injected: ['SecureRouteService', 'UserService', function (SecureRouteService, UserService) {
                        return SecureRouteService.Secure(function () {
                            return UserService.GetMe();
                        });
                    }]
            };
            return EditBio;
        }());
        Profile.EditBio = EditBio;
    })(Profile = RouteResolves.Profile || (RouteResolves.Profile = {}));
    var Feed = (function () {
        function Feed() {
        }
        Feed.Resolved = {
            Injected: ['SecureRouteService', function (SecureRouteService) {
                    return SecureRouteService.Secure();
                }]
        };
        return Feed;
    }());
    RouteResolves.Feed = Feed;
})(RouteResolves = exports.RouteResolves || (exports.RouteResolves = {}));
//# sourceMappingURL=route-resolves.js.map