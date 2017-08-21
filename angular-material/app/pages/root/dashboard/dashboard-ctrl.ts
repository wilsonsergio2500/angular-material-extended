


export class DashboardCtrl {
    static $inject = ['$mdSidenav'];
    constructor(private $mdSidenav: angular.material.ISidenavService) {

    }

    toogleLeftNavBar = () => {
        this.$mdSidenav('left').toggle();
    }
}