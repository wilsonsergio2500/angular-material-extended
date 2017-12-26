import * as angular from 'angular';
import { DASHBOARD } from './route-names';
import { ILoginService } from '../../../services/domains/login/login-service';
import { ADMIN_ROUTES } from  './admin/routes';
import { IUserRoleResponse} from '../../../models/contracts/response/user/iuserroleresponse';

export class DashboardCtrl {
    static $inject = ['$mdSidenav', '$state', 'LoginService', '$location', 'Injected'];
    admin: any;
    constructor(private $mdSidenav: angular.material.ISidenavService, private $state: angular.ui.IStateService, private LoginService: ILoginService,
        private $location: angular.ILocationService, private Injected: IUserRoleResponse) {
        this.Init();
    }
    Init = () => {
        this.admin = {};
        this.admin.sendInvite = this.adSendInvite;
        this.admin.LogOut = this.LoginService.LogOut;
        this.admin.AddCategory = this.adCategory;
    }
    adSendInvite = () => {
        this.$state.go(ADMIN_ROUTES.NAMES.NEW_INVITE);
    }
    adCategory = () => {
        this.$state.go(ADMIN_ROUTES.NAMES.NEW_CATEGORY);
    }
   

    toogleLeftNavBar = () => {
        this.$mdSidenav('left').toggle();
    }
    OpenProfileEditMenu = ($mdMenu : angular.material.IMenuService, $event : any) => {
        ($mdMenu as any).open($event);
    }
    goToEditImg = () => {
        this.$state.go(DASHBOARD.NAMES.PROFILE.EDIT_IMAGE);
    }
    goToEditBio = () => {
        this.$state.go(DASHBOARD.NAMES.PROFILE.EDIT_BIO);
    }

    goToMilestoneAdd = () => {
        this.$state.go(DASHBOARD.NAMES.MILESTONE.ADD);
    }
    goToAddPost = () => {
        this.$state.go(DASHBOARD.NAMES.WIZARD_ADD.MAIN);
    }
    goToFeed = () => {
        this.$state.go(DASHBOARD.NAMES.FEED);
    }

    
}