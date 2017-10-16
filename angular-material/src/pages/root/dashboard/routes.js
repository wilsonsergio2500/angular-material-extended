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
var milestone_display_ctrl_1 = require('./milestone-display/milestone-display-ctrl');
var milestone_add_ctrl_1 = require('./milestone/milestone-add-ctrl');
var edit_bio_ctrl_1 = require('./profile/edit-bio/edit-bio-ctrl');
var profile_ctrl_1 = require('./profile/profile-ctrl');
var milestone_post_ctrl_1 = require('./milestone-post/milestone-post-ctrl');
var route_resolves_1 = require('./route-resolves');
var routes_1 = require('./profile/children/routes');
var invite_complete_1 = require('./invite/complete/invite-complete');
var items_ctrl_1 = require('./items/items-ctrl');
var route_names_1 = require('./route-names');
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
            this.name = route_names_1.DASHBOARD.NAMES.ADMIM.INVITE;
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
            this.name = route_names_1.DASHBOARD.NAMES.ADMIM.CATEGORY;
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
            this.name = route_names_1.DASHBOARD.NAMES.PROFILE.VIEWS.MAIN;
            this.url = '/profile/{Id}';
            this.resolve = route_resolves_1.RouteResolves.Profile.VIEWS.MAIN.Resolve;
            this.controller = profile_ctrl_1.ProfileCtrl;
            this.children = routes_1.ProfileRoutes;
        }
        return ProfileRoute;
    }(route_1.Route));
    DashboardRoutes.ProfileRoute = ProfileRoute;
    var ProfileEdiImageRoute = (function (_super) {
        __extends(ProfileEdiImageRoute, _super);
        function ProfileEdiImageRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./profile/edit-image/edit-image-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.PROFILE.EDIT_IMAGE;
            this.url = '/profile/image/edit';
        }
        return ProfileEdiImageRoute;
    }(route_1.Route));
    DashboardRoutes.ProfileEdiImageRoute = ProfileEdiImageRoute;
    var ProfileEditBioRoute = (function (_super) {
        __extends(ProfileEditBioRoute, _super);
        function ProfileEditBioRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./profile/edit-bio/edit-bio-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.PROFILE.EDIT_BIO;
            this.url = '/profile/bio/edit';
            this.resolve = route_resolves_1.RouteResolves.Profile.EditBio.Resolve;
            this.controller = edit_bio_ctrl_1.EditBioCtrl;
        }
        return ProfileEditBioRoute;
    }(route_1.Route));
    DashboardRoutes.ProfileEditBioRoute = ProfileEditBioRoute;
    var MilestoneAddRoute = (function (_super) {
        __extends(MilestoneAddRoute, _super);
        function MilestoneAddRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone/milestone-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.MILESTONE.ADD;
            this.resolve = route_resolves_1.RouteResolves.MilestoneResolves.ADD.Resolve;
            this.url = '/milestone';
            this.controller = milestone_add_ctrl_1.MilestoneAddCtrl;
        }
        return MilestoneAddRoute;
    }(route_1.Route));
    DashboardRoutes.MilestoneAddRoute = MilestoneAddRoute;
    var MilestonePost = (function (_super) {
        __extends(MilestonePost, _super);
        function MilestonePost() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone-post/milestone-post-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.MILESTONE.POST;
            this.resolve = route_resolves_1.RouteResolves.MilestoneResolves.ADD.Resolve;
            this.url = '/post';
            this.controller = milestone_post_ctrl_1.MilestoneAddPostCtrl;
        }
        return MilestonePost;
    }(route_1.Route));
    DashboardRoutes.MilestonePost = MilestonePost;
    var MilestoneView = (function (_super) {
        __extends(MilestoneView, _super);
        function MilestoneView() {
            _super.call(this);
            this.template = require('!!raw-loader!./milestone-display/milestone-display-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW; // 'milestone_view';
            this.url = '/milestone/view/{Id}';
            this.controller = milestone_display_ctrl_1.MilestoneDisplayCtrl;
            this.resolve = route_resolves_1.RouteResolves.MilestoneView.Resolve;
        }
        return MilestoneView;
    }(route_1.Route));
    DashboardRoutes.MilestoneView = MilestoneView;
    //export class BlogRoute extends Route {
    //    template = require('!!raw-loader!./blog/blog-view.html');
    //    constructor() {
    //        super();
    //        this.name = 'landmark';
    //        this.url = '/landmark';
    //    }
    //}
    var ItemsRoute = (function (_super) {
        __extends(ItemsRoute, _super);
        function ItemsRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./items/items-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.FEED;
            this.url = '/items';
            this.controller = items_ctrl_1.ItemsCtrl;
            this.resolve = route_resolves_1.RouteResolves.Feed.Resolved;
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
    new DashboardRoutes.ProfileEditBioRoute(),
    new DashboardRoutes.MilestoneAddRoute(),
    new DashboardRoutes.MilestonePost(),
    new DashboardRoutes.MilestoneView(),
    //new DashboardRoutes.BlogRoute(),
    new DashboardRoutes.ItemsRoute()
];
//# sourceMappingURL=routes.js.map