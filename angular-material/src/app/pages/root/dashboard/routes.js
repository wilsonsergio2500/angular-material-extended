"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var route_1 = require('../../../models/route');
var components_test_1 = require('./components-test/components-test');
var invite_ctrl_1 = require('./invite/invite-ctrl');
var category_ctrl_1 = require('./category/category-ctrl');
var DashboardRoutes;
(function (DashboardRoutes) {
    var ComponetTestRoute = (function (_super) {
        __extends(ComponetTestRoute, _super);
        function ComponetTestRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./components-test/components-test.html');
            this.controller = components_test_1.ComponentTest;
            this.name = 'test';
            this.url = '/test';
        }
        return ComponetTestRoute;
    }(route_1.Route));
    DashboardRoutes.ComponetTestRoute = ComponetTestRoute;
    var InviteRoute = (function (_super) {
        __extends(InviteRoute, _super);
        function InviteRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./invite/invite-view.html');
            this.controller = invite_ctrl_1.InviteCtrl;
            this.name = 'invite';
            this.url = '/invite';
        }
        return InviteRoute;
    }(route_1.Route));
    DashboardRoutes.InviteRoute = InviteRoute;
    var CategoryRoute = (function (_super) {
        __extends(CategoryRoute, _super);
        function CategoryRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./category/category-view.html');
            this.controller = category_ctrl_1.CategoryCtrl;
            this.name = 'category';
            this.url = '/category';
        }
        return CategoryRoute;
    }(route_1.Route));
    DashboardRoutes.CategoryRoute = CategoryRoute;
    var ProfileRoute = (function (_super) {
        __extends(ProfileRoute, _super);
        function ProfileRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./profile/profile-view.html');
            this.name = 'profile';
            this.url = '/profile';
        }
        return ProfileRoute;
    }(route_1.Route));
    DashboardRoutes.ProfileRoute = ProfileRoute;
    var MileStoneRoute = (function (_super) {
        __extends(MileStoneRoute, _super);
        function MileStoneRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone/milestone-view.html');
            this.name = 'milestone';
            this.url = '/milestone';
        }
        return MileStoneRoute;
    }(route_1.Route));
    DashboardRoutes.MileStoneRoute = MileStoneRoute;
})(DashboardRoutes = exports.DashboardRoutes || (exports.DashboardRoutes = {}));
exports.dashboardRoutes = [
    new DashboardRoutes.ComponetTestRoute(),
    new DashboardRoutes.InviteRoute(),
    new DashboardRoutes.CategoryRoute(),
    new DashboardRoutes.ProfileRoute(),
    new DashboardRoutes.MileStoneRoute()
];
//# sourceMappingURL=routes.js.map