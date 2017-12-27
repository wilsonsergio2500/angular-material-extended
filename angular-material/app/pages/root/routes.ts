
import { Route } from '../../models/route';
import { rootCtrl } from './root-view';
import { LoginCtrl } from './login/login-ctrl';
import { DashboardCtrl } from './dashboard/dashboard-ctrl'
import { dashboardRoutes } from './dashboard/routes';
import { ROOT_ITEMS } from './route-names';
import { RootRouteResolves } from './root-resolves';
import { LazyLoad } from '../../helpers/lazyload';
import { PUBLIC_ROUTES } from './public/routes'


export namespace RootRoutes {

    export class Root extends Route {
         template = require('!!raw-loader!./root-view.html');
        
        constructor() {
            super();
            this.controller = rootCtrl;
            this.name = 'root';
            this.children = [
                new RootChildrens.Login(),
                new RootChildrens.DashBoard(),
                new RootChildrens.Public()
            ]

        }
    }


    export namespace RootChildrens {
       
        export class Login extends Route {
            template = require('!!raw-loader!./login/login-view.html');
            constructor() {
                super();
                this.url = '/';
                this.controller = LoginCtrl;
                this.name = ROOT_ITEMS.NAMES.LOGIN;
                this.resolve = RootRouteResolves.Login.Resolve;
            }
            
        }


        export class DashBoard extends Route {
            template = require('!!raw-loader!./dashboard/dashboard-view.html');
            constructor() {
                super();
                this.url = '/dashboard';
                this.controller = DashboardCtrl;
                this.name = 'dashboard';
                this.children = dashboardRoutes;
                this.resolve = RootRouteResolves.Dashboard.Resolve;
                    
            }
        }

        export class Public extends Route {
            template = LazyLoad.getTemplate(LazyLoad.MODULES.PUBLIC, '<container-external flex layout="column" />')
            constructor() {
                super();
                this.url = '/landmark';
                this.name = 'landmark';
                this.children = PUBLIC_ROUTES.ROUTES;
            }
        }
    }

}

export const rootRoutes = [
   new RootRoutes.Root()
]