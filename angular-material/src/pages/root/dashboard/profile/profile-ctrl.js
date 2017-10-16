"use strict";
var route_names_1 = require('../route-names');
var angularwatch_1 = require('../../../../helpers/angularwatch');
var ProfileCtrl = (function () {
    function ProfileCtrl($scope, Injected, $state, $stateParams) {
        var _this = this;
        this.$scope = $scope;
        this.Injected = Injected;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.Init = function () {
            _this.selectedTabIndex = 0;
            _this.setView();
            _this.$watcher = new angularwatch_1.AngularWatch();
            _this.$watcher.Subscribe(_this.$scope, function () { return _this.selectedTabIndex; }, function (n, o) {
                _this.setView();
            });
            _this.$scope.$on('$destroy', _this.$onDestroy);
        };
        this.setView = function () {
            var userId = _this.$stateParams.Id;
            var categoryId = _this.Injected.categoryTabs[_this.selectedTabIndex].id;
            console.log(userId, categoryId);
            _this.$state.go(route_names_1.DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW, { userId: userId, categoryId: categoryId });
        };
        this.$onDestroy = function () {
            _this.$watcher.Unsubscribe();
        };
        this.Init();
    }
    ProfileCtrl.$inject = ['$scope', 'Injected', '$state', '$stateParams'];
    return ProfileCtrl;
}());
exports.ProfileCtrl = ProfileCtrl;
//# sourceMappingURL=profile-ctrl.js.map