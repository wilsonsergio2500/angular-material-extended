/// <reference path="../../services/index.ts" />
"use strict";
require('../../components/tile-view/tile-view');
var GridTile = (function () {
    function GridTile(Config) {
        this.Config = Config;
        this.options = { templateUrl: Config.$templateUrl, template: Config.$template, padding: 10 };
        this.items = [];
    }
    GridTile.prototype.setTileSize = function (tileSize) {
        this.options.tileSize = tileSize;
    };
    GridTile.prototype.addItem = function (Item) {
        this.items.push(Item);
    };
    GridTile.prototype.addItems = function (List) {
        this.items = this.items.concat(List);
    };
    GridTile.prototype.setOnScrollEndPromise = function (promise) {
        this.Promise = promise;
        this.options.onScrollEnd = this.onScrollEnd;
    };
    GridTile.prototype.onScrollEnd = function () {
        var that = this;
        if (!!this.Promise) {
            that.Promise.then(function (items) {
                that.items = that.items.concat(items);
            });
        }
    };
    GridTile.prototype.setOnScrollEnd = function (onScrollEnd) {
        this.options.onScrollEnd = onScrollEnd;
    };
    return GridTile;
}());
var tileItem = require('!!raw-loader!./tile-item/tile-item.html');
var TileViewExamplePage = (function () {
    function TileViewExamplePage($scope, $mdMedia, ResizeDetectorService) {
        var _this = this;
        this.$scope = $scope;
        this.$mdMedia = $mdMedia;
        this.ResizeDetectorService = ResizeDetectorService;
        this.InitDetector = function () {
            _this.ResizeDetectorService.Subscribe(document.querySelector("#content"), _this.onResizeDetectorChange);
        };
        this.onResizeDetectorChange = function () {
            console.log('changed');
        };
        this.OnDestroy = function () {
        };
        console.log(ResizeDetectorService);
        this.Page = 0;
        this.NumItem = 100;
        this.Init();
        console.log('component loaded');
    }
    TileViewExamplePage.prototype.Init = function () {
        this.Tile = new GridTile({ $mdMedia: this.$mdMedia, $template: tileItem });
        this.Tile.setTileSize({ width: 130, height: 130 });
        this.Tile.setOnScrollEnd(this.onscrollEnded);
        this.LoadItems();
        //this.$scope.$on('$destroy', this.OnDestroy);
    };
    TileViewExamplePage.prototype.LoadItems = function () {
        var offset = (this.Page * this.NumItem);
        var take = ((this.Page + 1) * this.NumItem);
        for (var i = 0; i < take; i++) {
            var element = {
                id: i,
                name: 'name ' + i
            };
            this.Tile.addItem(element);
        }
    };
    TileViewExamplePage.prototype.onscrollEnded = function () {
        console.log('scroll ended..');
    };
    TileViewExamplePage.$inject = ['$scope', '$mdMedia', 'ResizeDetectorService'];
    return TileViewExamplePage;
}());
exports.TileViewExamplePage = TileViewExamplePage;
//# sourceMappingURL=tile-example.js.map