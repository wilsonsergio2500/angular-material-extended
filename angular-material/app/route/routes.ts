
import * as angular from 'angular';
import { APP_MODULE } from '../main/index';
import { ngRoute } from '../custom-typings/angular-route/route';

import { MainPageCtrl } from '../pages/main/main';
import { TileViewExamplePage } from '../pages/tile-example/tile-example';
import { TileViewResponsivePage } from '../pages/tile-view-responsive-page/tile-view-responsive-page';
import { LoadingButtonPage } from '../pages/loading-button-page/loading-button-page';
import { ImageUploaderPage } from '../pages/image-uploader-page/image-uploader-page';
import { TestPage } from '../pages/test-page/test-page';

export module Routes {
    
    interface IRouteConfig extends ngRoute.IRoute {
        IsFullPage: boolean;
        title: string;
        IsLoginRequired: boolean;
    }

    export class Route {
        
        config: IRouteConfig;
        Path: string;
        constructor() {
            this.config = <IRouteConfig>{};
            this.config.IsFullPage = false;
            this.config.IsLoginRequired = false;
        }
    }


   export namespace List {


       class Index extends Route {
           private template = require('!!raw-loader!../pages/main/main.html');
            constructor() {
                super();
                this.Path = "/";
                this.config.template = this.template;
                this.config.controller = MainPageCtrl;
                this.config.controllerAs = 'vm';
                
            }
        }

       class TileExample extends Route {
           private template = require('!!raw-loader!../pages/tile-example/tile-example.html');
           
           constructor() {
               super();
               this.Path = "/tileview";
               this.config.template = this.template;
               this.config.controller = TileViewExamplePage;
               this.config.controllerAs = 'vm';
           }
       }

       class TileViewResponsive extends Route {
           private template = require('!!raw-loader!../pages/tile-view-responsive-page/tile-view-responsive-page.html');
           constructor() {
               super();
               this.Path = '/tileviewresponsive';
               this.config.template = this.template;
               this.config.controller = TileViewResponsivePage;
               this.config.controllerAs = 'vm';
               console.log(this.template);
           }
       }

       class LoadingButtonRoute extends Route {
           private template = require('!!raw-loader!../pages/loading-button-page/loading-button-page.html');
           constructor() {
               super();
               this.Path = "/loadingbutton";
               this.config.template = this.template;
               this.config.controller = LoadingButtonPage;
               this.config.controllerAs = 'vm';
           }
       }

       class ImageUploaderRoute extends Route {
           private template = require('!!raw-loader!../pages/image-uploader-page/image-uploader-page.html');
           constructor() {
               super();
               this.Path = '/imageUpload'
               this.config.template = this.template;
               this.config.controller = ImageUploaderPage;
               this.config.controllerAs = 'vm';
                  
                   
           }
       }

       class TestRoute extends Route {
           private template = require('!!raw-loader!../pages/test-page/test-page.html');
           constructor() {
               super();
               this.Path = '/test';
               this.config.template = this.template;
               this.config.controller = TestPage;
               this.config.controllerAs = 'vm';
              
           }

       }

        export const Items: Route[] = [
            new Index()
            , new TileExample()
            , new TileViewResponsive()
            , new LoadingButtonRoute()
            , new ImageUploaderRoute()
            , new TestRoute
        ]
    }




}