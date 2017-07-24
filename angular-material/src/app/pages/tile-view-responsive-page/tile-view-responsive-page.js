"use strict";
var index_1 = require('../../components/tile-view-responsive/interfaces/index');
var tileItem = require('!!raw-loader!./item-template/item-template.html');
var TileViewResponsivePage = (function () {
    function TileViewResponsivePage() {
        var _this = this;
        this.Dimensions = [];
        this.init = function () {
            _this.Page = 0;
            _this.NumItem = 100;
            var options = { template: tileItem };
            _this.gridTile = new index_1.GridTile(options);
            _this.gridTile.setTileSize({ width: 130, height: 130 });
            _this.gridTile.setItems(_this.getItems());
            _this.gridTile.setOnScrollEnd(_this.onScrollEnd);
            _this.Dimensions.push({ minWidth: 300, col: 2 });
            _this.Dimensions.push({ minWidth: 1200, col: 9 });
            _this.Dimensions.push({ minWidth: 900, col: 6 });
            _this.Dimensions.push({ minWidth: 600, col: 4 });
        };
        this.onScrollEnd = function () {
            _this.Page = _this.Page + 1;
            _this.gridTile.addRangeItems(_this.getItems());
            console.log(' you scroll');
        };
        this.init();
    }
    TileViewResponsivePage.prototype.getItems = function () {
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
    return TileViewResponsivePage;
}());
exports.TileViewResponsivePage = TileViewResponsivePage;
//# sourceMappingURL=tile-view-responsive-page.js.map