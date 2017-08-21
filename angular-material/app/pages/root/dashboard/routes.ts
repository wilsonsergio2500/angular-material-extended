/// <reference path="invite/invite-ctrl.ts" />

import { Route } from '../../../models/route';
import { ComponentTest } from './components-test/components-test';
import { InviteCtrl } from './invite/invite-ctrl';

export namespace DashboardRoutes {


    export class ComponetTestRoute extends Route {
        template = require('!!raw-loader!./components-test/components-test.html');
        constructor() {
            super();
            this.controller = ComponentTest;
            this.name = 'test';
            this.url = '/test';
        }
        
    }


    export class InviteRoute extends Route {
        template = require('!!raw-loader!./invite/invite-view.html');
        constructor() {
            super();
            this.controller = InviteCtrl;
            this.name = 'invite';
            this.url = '/invite';

        }
    }
}

export const dashboardRoutes: Route[] = [
    new DashboardRoutes.ComponetTestRoute(),
    new DashboardRoutes.InviteRoute()
]