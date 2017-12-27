
import { Route } from '../../../models/route';
import { ComponentTest } from './components-test/components-test';
import { InviteCtrl } from './invite/invite-ctrl';
import { CategoryCtrl } from './category/category-ctrl';
import { MilestoneDisplayCtrl } from './milestone-display/milestone-display-ctrl';
import { MilestoneAddCtrl } from './milestone/milestone-add-ctrl';
import { EditBioCtrl } from './profile/edit-bio/edit-bio-ctrl';
import { ProfileCtrl } from './profile/profile-ctrl';
import { MilestoneAddPostCtrl } from './milestone-post/milestone-post-ctrl';
import { ItemGridCtrl } from './items-angulargrid/items-grid';
import { WizardAddCtrl } from './add-wizard/index';

import { RouteResolves } from './route-resolves';
import { ProfileRoutes } from './profile/children/routes'
import { WizardRoutes } from './add-wizard/routes';

import { InviteCompletCtrl } from './invite/complete/invite-complete';
import { ItemsCtrl } from './items/items-ctrl';
import { DASHBOARD } from './route-names';
import { ADMIN_ROUTES } from './admin/routes';
import {POST_ROUTES  } from './posts/routes'
import { LazyLoad } from '../../../helpers/lazyload';



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


   

    //export class InviteCompleteRoute extends Route {
    //    template = require('!!raw-loader!./invite/complete/invite-complete.html');
    //    constructor() {
    //        super();
    //        this.name = 'invitecomplete';
    //        this.url = '/invite/complete/{Id}';
    //        this.resolve = RouteResolves.InviteComplete.Resolve;
    //        this.controller = InviteCompletCtrl;
    //    }
    //}

    //export class CategoryRoute extends Route {
    //    template = require('!!raw-loader!./category/category-view.html');
    //    constructor() {
    //        super();
    //        this.controller = CategoryCtrl;
    //        this.name = DASHBOARD.NAMES.ADMIM.CATEGORY; 
    //        this.url = '/category' 
    //    }
    //}

    export class ProfileRoute extends Route {
        template = require('!!raw-loader!./profile/profile-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.PROFILE.VIEWS.MAIN; 
            this.url = '/profile/{Id}';
            this.resolve = RouteResolves.Profile.VIEWS.MAIN.Resolve;
            this.controller = ProfileCtrl;
            this.children = ProfileRoutes;
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
    export class ProfileEditBioRoute extends Route {
        template = require('!!raw-loader!./profile/edit-bio/edit-bio-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.PROFILE.EDIT_BIO;
            this.url = '/profile/bio/edit';
            this.resolve = RouteResolves.Profile.EditBio.Resolve;
            this.controller = EditBioCtrl;
        }
    }

    export class MilestoneAddRoute extends Route {
        template = require('!!raw-loader!./milestone/milestone-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.MILESTONE.ADD;
            this.resolve = RouteResolves.MilestoneResolves.ADD.Resolve;
            this.url = '/milestone';
            this.controller = MilestoneAddCtrl;
        }
    }
    export class MilestonePost extends Route {
        template = require('!!raw-loader!./milestone-post/milestone-post-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.MILESTONE.POST;
            this.resolve = RouteResolves.MilestoneResolves.ADD.Resolve;
            this.url = '/post';
            this.controller = MilestoneAddPostCtrl;
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


    export class ItemsRoute extends Route {
        template = require('!!raw-loader!./items/items-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.FEED;
            this.url = '/items';
            this.controller = ItemsCtrl;
            this.resolve = RouteResolves.Feed.Resolved;
        }
    }
    export class ItemsGridRoute extends Route {
        template = require('!!raw-loader!./items-angulargrid/items-grid.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.ITEMS_GRID;
            this.url = '/itemsgrid';
            this.controller = ItemGridCtrl;
            this.resolve = RouteResolves.Feed.Resolved;
        }
    }


    export class WizardAddRoute extends Route {
        template = require('!!raw-loader!./add-wizard/index.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.WIZARD_ADD.MAIN;
            this.url = '/add';
            this.controller = WizardAddCtrl;
            this.resolve = RouteResolves.WizardAdd.Main.Resolve;
            this.children = WizardRoutes;

        }
    }

    export class AdminRoute extends Route {

        template = LazyLoad.CONTAINER_ONLY;
        constructor() {
            super();

            this.name = 'admin';
            this.url = '/admin';
            this.children = ADMIN_ROUTES.ROUTES;
        }
    }

    export class PostRoute extends Route {
        template = LazyLoad.CONTAINER_ONLY;
        constructor() {
            super();
            this.name = 'post';
            this.url = '/post';
            this.children = POST_ROUTES.ROUTES;
        }
    }
}

export const dashboardRoutes: Route[] = [
    new DashboardRoutes.ComponetTestRoute(),

    //new DashboardRoutes.InviteCompleteRoute(),

    //new DashboardRoutes.CategoryRoute(),

    new DashboardRoutes.ProfileRoute(),
    new DashboardRoutes.ProfileEdiImageRoute(),
    new DashboardRoutes.ProfileEditBioRoute(),

    new DashboardRoutes.MilestoneAddRoute(),
    new DashboardRoutes.MilestonePost(),
    new DashboardRoutes.MilestoneView(),
    //new DashboardRoutes.BlogRoute(),

    new DashboardRoutes.ItemsRoute(),
    new DashboardRoutes.ItemsGridRoute(),

    new DashboardRoutes.WizardAddRoute(),

    new DashboardRoutes.AdminRoute(),
    new DashboardRoutes.PostRoute()
]