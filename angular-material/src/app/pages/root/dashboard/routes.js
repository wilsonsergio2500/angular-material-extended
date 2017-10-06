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
var route_resolves_1 = require('./route-resolves');
var invite_complete_1 = require('./invite/complete/invite-complete');
var items_ctrl_1 = require('./items/items-ctrl');
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
    var InviteCompleteRoute = (function (_super) {
        __extends(InviteCompleteRoute, _super);
        function InviteCompleteRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./invite/complete/invite-complete.html');
            this.name = 'invitecomplete';
            this.url = '/invite/complete/{Id}';
            this.resolve = route_resolves_1.RouteResolves.InviteComplete.Resolve;
            this.controller = invite_complete_1.InviteCompletCtrl;
        }
        return InviteCompleteRoute;
    }(route_1.Route));
    DashboardRoutes.InviteCompleteRoute = InviteCompleteRoute;
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
    var ProfileEdiImageRoute = (function (_super) {
        __extends(ProfileEdiImageRoute, _super);
        function ProfileEdiImageRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./profile/edit-image/edit-image-view.html');
            this.name = 'profile_edit_image';
            this.url = '/profile/image/edit';
        }
        return ProfileEdiImageRoute;
    }(route_1.Route));
    DashboardRoutes.ProfileEdiImageRoute = ProfileEdiImageRoute;
    var MilestoneRoute = (function (_super) {
        __extends(MilestoneRoute, _super);
        function MilestoneRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone/milestone-view.html');
            this.name = 'milestone';
            this.url = '/milestone';
        }
        return MilestoneRoute;
    }(route_1.Route));
    DashboardRoutes.MilestoneRoute = MilestoneRoute;
    var MilestonePost = (function (_super) {
        __extends(MilestonePost, _super);
        function MilestonePost() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone-post/milestone-post-view.html');
            this.name = 'post';
            this.url = '/post';
        }
        return MilestonePost;
    }(route_1.Route));
    DashboardRoutes.MilestonePost = MilestonePost;
    var BlogRoute = (function (_super) {
        __extends(BlogRoute, _super);
        function BlogRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./blog/blog-view.html');
            this.name = 'landmark';
            this.url = '/landmark';
        }
        return BlogRoute;
    }(route_1.Route));
    DashboardRoutes.BlogRoute = BlogRoute;
    var ItemsRoute = (function (_super) {
        __extends(ItemsRoute, _super);
        function ItemsRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./items/items-view.html');
            this.name = 'items';
            this.url = '/items';
            this.controller = items_ctrl_1.ItemsCtrl;
        }
        return ItemsRoute;
    }(route_1.Route));
    DashboardRoutes.ItemsRoute = ItemsRoute;
})(DashboardRoutes = exports.DashboardRoutes || (exports.DashboardRoutes = {}));
exports.dashboardRoutes = [
    new DashboardRoutes.ComponetTestRoute(),
    new DashboardRoutes.InviteRoute(),
    new DashboardRoutes.InviteCompleteRoute(),
    new DashboardRoutes.CategoryRoute(),
    new DashboardRoutes.ProfileRoute(),
    new DashboardRoutes.ProfileEdiImageRoute(),
    new DashboardRoutes.MilestoneRoute(),
    new DashboardRoutes.MilestonePost(),
    new DashboardRoutes.BlogRoute(),
    new DashboardRoutes.ItemsRoute()
];
//# sourceMappingURL=routes.js.map