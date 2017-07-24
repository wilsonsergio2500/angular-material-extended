"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main_1 = require('../pages/main/main');
var tile_example_1 = require('../pages/tile-example/tile-example');
var tile_view_responsive_page_1 = require('../pages/tile-view-responsive-page/tile-view-responsive-page');
var loading_button_page_1 = require('../pages/loading-button-page/loading-button-page');
var Routes;
(function (Routes) {
    var Route = (function () {
        function Route() {
            this.config = {};
            this.config.IsFullPage = false;
            this.config.IsLoginRequired = false;
        }
        return Route;
    }());
    Routes.Route = Route;
    var List;
    (function (List) {
        var Index = (function (_super) {
            __extends(Index, _super);
            function Index() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/main/main.html');
                this.Path = "/";
                this.config.template = this.template;
                this.config.controller = main_1.MainPageCtrl;
                this.config.controllerAs = 'vm';
            }
            return Index;
        }(Route));
        var TileExample = (function (_super) {
            __extends(TileExample, _super);
            function TileExample() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/tile-example/tile-example.html');
                this.Path = "/tileview";
                this.config.template = this.template;
                this.config.controller = tile_example_1.TileViewExamplePage;
                this.config.controllerAs = 'vm';
            }
            return TileExample;
        }(Route));
        var TileViewResponsive = (function (_super) {
            __extends(TileViewResponsive, _super);
            function TileViewResponsive() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/tile-view-responsive-page/tile-view-responsive-page.html');
                this.Path = '/tileviewresponsive';
                this.config.template = this.template;
                this.config.controller = tile_view_responsive_page_1.TileViewResponsivePage;
                this.config.controllerAs = 'vm';
                console.log(this.template);
            }
            return TileViewResponsive;
        }(Route));
        var LoadingButtonRoute = (function (_super) {
            __extends(LoadingButtonRoute, _super);
            function LoadingButtonRoute() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/loading-button-page/loading-button-page.html');
                this.Path = "/loadingbutton";
                this.config.template = this.template;
                this.config.controller = loading_button_page_1.LoadingButtonPage;
                this.config.controllerAs = 'vm';
            }
            return LoadingButtonRoute;
        }(Route));
        List.Items = [
            new Index(),
            new TileExample(),
            new TileViewResponsive(),
            new LoadingButtonRoute()
        ];
    })(List = Routes.List || (Routes.List = {}));
})(Routes = exports.Routes || (exports.Routes = {}));
//# sourceMappingURL=routes.js.map