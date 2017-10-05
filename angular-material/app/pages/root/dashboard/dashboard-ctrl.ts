import * as angular from 'angular';


export class DashboardCtrl {
    static $inject = ['$mdSidenav'];
    constructor(private $mdSidenav: angular.material.ISidenavService) {

    }

    toogleLeftNavBar = () => {
        this.$mdSidenav('left').toggle();
    }
    OpenProfileEditMenu = ($mdMenu : angular.material.IMenuService, $event : any) => {
        ($mdMenu as any).open($event);
    }
}