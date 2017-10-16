"use strict";
var index_1 = require('../../../../components/tile-view-responsive/interfaces/index');
var route_names_1 = require('../route-names');
var tileItem = require('!!raw-loader!./item-template/item-template.html');
var recordsSize = 25;
var ItemsCtrl = (function () {
    function ItemsCtrl(MilestoneService, LikeService, $state, $timeout) {
        var _this = this;
        this.MilestoneService = MilestoneService;
        this.LikeService = LikeService;
        this.$state = $state;
        this.$timeout = $timeout;
        this.Total = 0;
        this.Dimensions = [];
        this.Init = function () {
            _this.Loading = true;
            _this.Page = 0;
            _this.NumItem = 100;
            var options = { template: tileItem };
            _this.gridTile = new index_1.GridTile(options);
            _this.gridTile.setTileSize({ width: 130, height: 500 });
            //this.gridTile.setItems(this.getItems());
            //this.gridTile.setOnScrollEnd(this.onScrollEnd);
            _this.Dimensions.push({ minWidth: 1200, col: 4 });
            _this.Dimensions.push({ minWidth: 900, col: 3 });
            _this.Dimensions.push({ minWidth: 600, col: 2 });
            _this.Dimensions.push({ minWidth: 300, col: 1 });
            _this.LoadItems();
        };
        this.LoadItems = function () {
            var request = {
                skip: (_this.Page * recordsSize),
                take: recordsSize
            };
            var counter = request.skip;
            _this.MilestoneService.GetList(request).then(function (response) {
                _this.Total = response.count;
                var gridElements = [];
                response.result.forEach(function (gridItem) {
                    var element = {
                        id: counter,
                        element: gridItem,
                        Ctrl: {
                            Like: function () { return _this.Like(gridItem.milestone.id); },
                            Unlike: function () { return _this.Unlike(gridItem.milestone.id); },
                            working: false,
                            GoTo: function (item) { return _this.GoToTile(item); },
                            GoToUser: function (item) { return _this.GoToUser(item); }
                        }
                    };
                    counter++;
                    gridElements.push(element);
                });
                _this.gridTile.addRangeItems(gridElements);
                console.log(gridElements);
            });
        };
        this.Like = function (milestoneId) {
            return _this.LikeService.Like(milestoneId);
        };
        this.Unlike = function (milestoneId) {
            return _this.LikeService.Unlike(milestoneId);
        };
        this.GoToTile = function (item) {
            item.Ctrl.working = true;
            console.log(item);
            var Id = item.element.milestone.id;
            _this.$timeout(function () {
                _this.$state.go(route_names_1.DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW, { Id: Id });
            }, 500);
        };
        this.GoToUser = function (item) {
            var Id = item.element.milestone.userId;
            _this.$timeout(function () {
                _this.$state.go(route_names_1.DASHBOARD.NAMES.PROFILE.VIEWS.MAIN, { Id: Id });
            }, 500);
        };
        this.onScrollEnd = function () {
            _this.Page = _this.Page + 1;
            _this.gridTile.addRangeItems(_this.getItems());
            console.log(' you scroll');
        };
        this.Init();
    }
    ItemsCtrl.prototype.getItems = function () {
        var offset = (this.Page * this.NumItem);
        var take = ((this.Page + 1) * this.NumItem);
        var items = [];
        for (var i = offset; i < take; i++) {
            var element = {
                id: i,
                name: 'name ' + i
            };
            items.push(element);
        }
        return items;
    };
    ItemsCtrl.$inject = ['MilestoneService', 'LikeService', '$state', '$timeout'];
    return ItemsCtrl;
}());
exports.ItemsCtrl = ItemsCtrl;
//# sourceMappingURL=items-ctrl.js.map