"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var route_1 = require('../../../../../models/route');
var route_names_1 = require('../../route-names');
var profile_item_views_ctrl_1 = require('./profile-item-views/profile-item-views-ctrl');
var ProfileChildrenRoutes;
(function (ProfileChildrenRoutes) {
    var ProfileCategoryTileViewRoute = (function (_super) {
        __extends(ProfileCategoryTileViewRoute, _super);
        function ProfileCategoryTileViewRoute() {
            _super.call(this);
            this.template = require('!!raw-loader!./profile-item-views/profile-item-view.html');
            this.name = route_names_1.DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW;
            this.controller = profile_item_views_ctrl_1.ProfileItemViewCtrl;
            this.params = {
                userId: null,
                categoryId: null
            };
        }
        return ProfileCategoryTileViewRoute;
    }(route_1.Route));
    ProfileChildrenRoutes.ProfileCategoryTileViewRoute = ProfileCategoryTileViewRoute;
})(ProfileChildrenRoutes || (ProfileChildrenRoutes = {}));
exports.ProfileRoutes = [
    new ProfileChildrenRoutes.ProfileCategoryTileViewRoute()
];
//# sourceMappingURL=routes.js.map