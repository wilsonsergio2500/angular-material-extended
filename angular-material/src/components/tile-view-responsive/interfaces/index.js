"use strict";
var GridTile = (function () {
    function GridTile(config) {
        this.config = config;
        this.config.padding = 10;
        this.config.scrollEndOffset = 1;
        this.config.tileSize = { width: 0, height: 0 };
        this.items = [];
    }
    GridTile.prototype.setPadding = function (padding) {
        this.config.padding = padding;
    };
    GridTile.prototype.setTileSize = function (tileSize) {
        this.config.tileSize = tileSize;
    };
    GridTile.prototype.setTileWidth = function (width) {
        this.config.tileSize.width = width;
    };
    GridTile.prototype.setOnScrollEnd = function (onScrollEnd) {
        this.config.onScrollEnd = onScrollEnd;
    };
    GridTile.prototype.setItems = function (items) {
        this.items = items;
    };
    GridTile.prototype.addRangeItems = function (items) {
        this.items = this.items.concat(items);
    };
    GridTile.prototype.addRangeItemsTop = function (items) {
        this.items = items.concat(this.items);
    };
    GridTile.prototype.addItem = function (item) {
        this.items.push(item);
    };
    return GridTile;
}());
exports.GridTile = GridTile;
//# sourceMappingURL=index.js.map