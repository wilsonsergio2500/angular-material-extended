"use strict";
var index_1 = require('../../../../../../components/tile-view-responsive/interfaces/index');
var route_names_1 = require('../../../route-names');
var recordsSize = 20;
var template = require('!!raw-loader!./grid-item/grid-item-template.html');
var ProfileItemViewCtrl = (function () {
    function ProfileItemViewCtrl($stateParams, MilestoneService, $timeout, LikeService, $state) {
        var _this = this;
        this.$stateParams = $stateParams;
        this.MilestoneService = MilestoneService;
        this.$timeout = $timeout;
        this.LikeService = LikeService;
        this.$state = $state;
        this.Dimensions = [];
        this.Init = function () {
            _this.Loading = true;
            _this.$RouteParams = _this.$stateParams;
            _this.Page = 1;
            _this.setGridTile();
        };
        this.setGridTile = function () {
            var options = { template: template };
            _this.gridTile = new index_1.GridTile(options);
            _this.gridTile.setTileSize({ width: 300, height: 430 });
            _this.Dimensions.push({ minWidth: 1200, col: 5 });
            _this.Dimensions.push({ minWidth: 900, col: 3 });
            _this.Dimensions.push({ minWidth: 600, col: 2 });
            _this.Dimensions.push({ minWidth: 300, col: 1 });
            _this.LoadItem();
        };
        this.Like = function (milestoneId) {
            return _this.LikeService.Like(milestoneId);
        };
        this.Unlike = function (milestoneId) {
            return _this.LikeService.Unlike(milestoneId);
        };
        this.GoToTile = function (item) {
            item.Ctrl.working = true;
            var Id = item.element.milestone.id;
            _this.$timeout(function () {
                _this.$state.go(route_names_1.DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW, { Id: Id });
            }, 500);
        };
        this.LoadItem = function () {
            var listr = {
                skip: ((_this.Page - 1) * recordsSize),
                take: recordsSize
            };
            var counter = listr.skip;
            _this.MilestoneService.GetListByCategory(_this.$RouteParams.userId, _this.$RouteParams.categoryId, listr).then(function (response) {
                _this.Total = response.count;
                response.result.forEach(function (gridItem) {
                    var element = {
                        id: counter,
                        element: gridItem,
                        Ctrl: {
                            Like: function () { return _this.Like(gridItem.milestone.id); },
                            Unlike: function () { return _this.Unlike(gridItem.milestone.id); },
                            working: false,
                            GoTo: function (item) { return _this.GoToTile(item); },
                        }
                    };
                    _this.gridTile.addItem(element);
                    counter++;
                });
                _this.$timeout(function () {
                    _this.Loading = false;
                }, 100);
            });
        };
        this.Init();
    }
    ProfileItemViewCtrl.$inject = ['$stateParams', 'MilestoneService', '$timeout', 'LikeService', '$state'];
    return ProfileItemViewCtrl;
}());
exports.ProfileItemViewCtrl = ProfileItemViewCtrl;
//# sourceMappingURL=profile-item-views-ctrl.js.map