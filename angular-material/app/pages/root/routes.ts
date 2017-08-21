
import { Route } from '../../models/route';
import { rootCtrl } from './root-view';
import { LoginCtrl } from './login/login-ctrl';
import { DashboardCtrl } from './dashboard/dashboard-ctrl'
import { dashboardRoutes } from './dashboard/routes';


export namespace RootRoutes {

    export class Root extends Route {
         template = require('!!raw-loader!./root-view.html');
        
        constructor() {
            super();
            this.controller = rootCtrl;
            this.name = 'root';
            this.children = [
                new RootChildrens.Login(),
                new RootChildrens.DashBoard()
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
                this.name = 'login';
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
                    
            }
        }
    }

}

export const rootRoutes = [
   new RootRoutes.Root()
]