"use strict";
var DASHBOARD;
(function (DASHBOARD) {
    var NAMES;
    (function (NAMES) {
        NAMES.FEED = 'items';
        var PROFILE;
        (function (PROFILE) {
            var VIEWS;
            (function (VIEWS) {
                VIEWS.MAIN = 'PROFILE';
                VIEWS.CATEGORY_TILE_VIEW = 'CATEGORY_TILE_VIEW';
            })(VIEWS = PROFILE.VIEWS || (PROFILE.VIEWS = {}));
            PROFILE.EDIT_IMAGE = 'profile_edit_image';
            PROFILE.EDIT_BIO = 'profile_edit_bio';
        })(PROFILE = NAMES.PROFILE || (NAMES.PROFILE = {}));
        var MILESTONE;
        (function (MILESTONE) {
            MILESTONE.ADD = 'MILESTONE_ADD';
            MILESTONE.POST = 'MILESTONE_POST';
            MILESTONE.MILESTONE_VIEW = 'milestone_view';
        })(MILESTONE = NAMES.MILESTONE || (NAMES.MILESTONE = {}));
        var ADMIM;
        (function (ADMIM) {
            ADMIM.INVITE = 'INVITE';
            ADMIM.CATEGORY = 'category';
        })(ADMIM = NAMES.ADMIM || (NAMES.ADMIM = {}));
    })(NAMES = DASHBOARD.NAMES || (DASHBOARD.NAMES = {}));
})(DASHBOARD = exports.DASHBOARD || (exports.DASHBOARD = {}));
//# sourceMappingURL=route-names.js.map