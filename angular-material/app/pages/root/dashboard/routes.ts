
import { Route } from '../../../models/route';
import { ComponentTest } from './components-test/components-test';
import { InviteCtrl } from './invite/invite-ctrl';
import { CategoryCtrl } from './category/category-ctrl';
import { MilestoneDisplayCtrl } from './milestone-display/milestone-display-ctrl'

import { RouteResolves } from './route-resolves';

import { InviteCompletCtrl } from './invite/complete/invite-complete';
import { ItemsCtrl } from './items/items-ctrl';
import { DASHBOARD } from './route-names';



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

    export class InviteCompleteRoute extends Route {
        template = require('!!raw-loader!./invite/complete/invite-complete.html');
        constructor() {
            super();
            this.name = 'invitecomplete';
            this.url = '/invite/complete/{Id}';
            this.resolve = RouteResolves.InviteComplete.Resolve;
            this.controller = InviteCompletCtrl;
        }
    }

    export class CategoryRoute extends Route {
        template = require('!!raw-loader!./category/category-view.html');
        constructor() {
            super();
            this.controller = CategoryCtrl;
            this.name = 'category'
            this.url = '/category' 
        }
    }

    export class ProfileRoute extends Route {
        template = require('!!raw-loader!./profile/profile-view.html');
        constructor() {
            super();
            this.name = 'profile';
            this.url = '/profile';
        }
    }

    export class ProfileEdiImageRoute extends Route {
        template = require('!!raw-loader!./profile/edit-image/edit-image-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.PROFILE.EDIT_IMAGE;
            this.url = '/profile/image/edit';

        }
    }

    export class MilestoneRoute extends Route {
        template = require('!!raw-loader!./milestone/milestone-view.html');
        constructor() {
            super();
            this.name = 'milestone';
            this.url = '/milestone';
        }
    }
    export class MilestonePost extends Route {
        template = require('!!raw-loader!./milestone-post/milestone-post-view.html');
        constructor() {
            super();
            this.name = 'post';
            this.url = '/post';
        }
    }
    export class MilestoneView extends Route {
        template = require('!!raw-loader!./milestone-display/milestone-display-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW; // 'milestone_view';
            this.url = '/milestone/view/{Id}'
            this.controller = MilestoneDisplayCtrl;
            this.resolve = RouteResolves.MilestoneView.Resolve;
        }
    }

    //export class BlogRoute extends Route {
    //    template = require('!!raw-loader!./blog/blog-view.html');
    //    constructor() {
    //        super();
    //        this.name = 'landmark';
    //        this.url = '/landmark';
    //    }
    //}

    export class ItemsRoute extends Route {
        template = require('!!raw-loader!./items/items-view.html');
        constructor() {
            super();
            this.name = 'items';
            this.url = '/items';
            this.controller = ItemsCtrl;
        }
    }
    
}

export const dashboardRoutes: Route[] = [
    new DashboardRoutes.ComponetTestRoute(),

    new DashboardRoutes.InviteRoute(),
    new DashboardRoutes.InviteCompleteRoute(),

    new DashboardRoutes.CategoryRoute(),

    new DashboardRoutes.ProfileRoute(),
    new DashboardRoutes.ProfileEdiImageRoute(),

    new DashboardRoutes.MilestoneRoute(),
    new DashboardRoutes.MilestonePost(),
    new DashboardRoutes.MilestoneView(),
    //new DashboardRoutes.BlogRoute(),

    new DashboardRoutes.ItemsRoute()
]