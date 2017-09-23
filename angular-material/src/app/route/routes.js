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
var image_uploader_page_1 = require('../pages/image-uploader-page/image-uploader-page');
var test_page_1 = require('../pages/test-page/test-page');
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
                this.config.url = "/";
                this.config.template = this.template;
                this.config.controller = main_1.MainPageCtrl;
                this.config.controllerAs = 'vm';
                this.config.name = 'index';
            }
            return Index;
        }(Route));
        var TileExample = (function (_super) {
            __extends(TileExample, _super);
            function TileExample() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/tile-example/tile-example.html');
                this.config.url = "/tileview";
                this.config.template = this.template;
                this.config.controller = tile_example_1.TileViewExamplePage;
                this.config.controllerAs = 'vm';
                this.config.name = 'tile';
            }
            return TileExample;
        }(Route));
        var TileViewResponsive = (function (_super) {
            __extends(TileViewResponsive, _super);
            function TileViewResponsive() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/tile-view-responsive-page/tile-view-responsive-page.html');
                this.config.url = '/tileviewresponsive';
                this.config.template = this.template;
                this.config.controller = tile_view_responsive_page_1.TileViewResponsivePage;
                this.config.controllerAs = 'vm';
                this.config.name = 'tileresponsive';
                console.log(this.template);
            }
            return TileViewResponsive;
        }(Route));
        var LoadingButtonRoute = (function (_super) {
            __extends(LoadingButtonRoute, _super);
            function LoadingButtonRoute() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/loading-button-page/loading-button-page.html');
                this.config.url = "/loadingbutton";
                this.config.template = this.template;
                this.config.controller = loading_button_page_1.LoadingButtonPage;
                this.config.controllerAs = 'vm';
                this.config.name = 'loadingbtn';
            }
            return LoadingButtonRoute;
        }(Route));
        var ImageUploaderRoute = (function (_super) {
            __extends(ImageUploaderRoute, _super);
            function ImageUploaderRoute() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/image-uploader-page/image-uploader-page.html');
                this.config.url = '/imageUpload';
                this.config.template = this.template;
                this.config.controller = image_uploader_page_1.ImageUploaderPage;
                this.config.controllerAs = 'vm';
                this.config.name = 'imageupload';
            }
            return ImageUploaderRoute;
        }(Route));
        var TestRoute = (function (_super) {
            __extends(TestRoute, _super);
            function TestRoute() {
                _super.call(this);
                this.template = require('!!raw-loader!../pages/test-page/test-page.html');
                this.config.url = '/test';
                this.config.template = this.template;
                this.config.controller = test_page_1.TestPage;
                this.config.controllerAs = 'vm';
                this.config.name = 'test';
            }
            return TestRoute;
        }(Route));
        List.Items = [
            new Index(),
            new TileExample(),
            new TileViewResponsive(),
            new LoadingButtonRoute(),
            new ImageUploaderRoute(),
            new TestRoute()
        ];
    })(List = Routes.List || (Routes.List = {}));
})(Routes = exports.Routes || (exports.Routes = {}));
//# sourceMappingURL=routes.js.map