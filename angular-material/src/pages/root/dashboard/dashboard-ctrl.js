"use strict";
var route_names_1 = require('./route-names');
var DashboardCtrl = (function () {
    function DashboardCtrl($mdSidenav, $state, LoginService) {
        var _this = this;
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.LoginService = LoginService;
        this.Init = function () {
            _this.admin = {};
            _this.admin.sendInvite = _this.adSendInvite;
            _this.admin.LogOut = _this.LoginService.LogOut;
            _this.admin.AddCategory = _this.adCategory;
        };
        this.adSendInvite = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.ADMIM.INVITE);
        };
        this.adCategory = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.ADMIM.CATEGORY);
        };
        this.toogleLeftNavBar = function () {
            _this.$mdSidenav('left').toggle();
        };
        this.OpenProfileEditMenu = function ($mdMenu, $event) {
            $mdMenu.open($event);
        };
        this.goToEditImg = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.PROFILE.EDIT_IMAGE);
        };
        this.goToEditBio = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.PROFILE.EDIT_BIO);
        };
        this.goToMilestoneAdd = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.MILESTONE.ADD);
        };
        this.goToAddPost = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.MILESTONE.POST);
        };
        this.goToFeed = function () {
            _this.$state.go(route_names_1.DASHBOARD.NAMES.FEED);
        };
        this.Init();
    }
    DashboardCtrl.$inject = ['$mdSidenav', '$state', 'LoginService'];
    return DashboardCtrl;
}());
exports.DashboardCtrl = DashboardCtrl;
//# sourceMappingURL=dashboard-ctrl.js.map