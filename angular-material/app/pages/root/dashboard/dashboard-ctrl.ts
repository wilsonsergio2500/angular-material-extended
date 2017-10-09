import * as angular from 'angular';
import { DASHBOARD } from './route-names';
import { ILoginService } from '../../../services/domains/login/login-service';

export class DashboardCtrl {
    static $inject = ['$mdSidenav', '$state', 'LoginService'];
    admin: any;
    constructor(private $mdSidenav: angular.material.ISidenavService, private $state: angular.ui.IStateService, private LoginService: ILoginService) {
        this.Init();
    }
    Init = () => {
        this.admin = {};
        this.admin.sendInvite = this.adSendInvite;
        this.admin.LogOut = this.LoginService.LogOut;
    }
    adSendInvite = () => {
        this.$state.go(DASHBOARD.NAMES.ADMIM.INVITE);
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
        this.$state.go(DASHBOARD.NAMES.MILESTONE.POST);
    }
    goToFeed = () => {
        this.$state.go(DASHBOARD.NAMES.FEED);
    }

    
}