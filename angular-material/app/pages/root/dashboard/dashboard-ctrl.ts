import * as angular from 'angular';
import { DASHBOARD } from './route-names'

export class DashboardCtrl {
    static $inject = ['$mdSidenav', '$state'];
    constructor(private $mdSidenav: angular.material.ISidenavService, private $state: angular.ui.IStateService) {

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
    goToFeed = () => {
        this.$state.go(DASHBOARD.NAMES.FEED);
    }
}