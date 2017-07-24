
import * as angular from 'angular';
import { APP_MODULE  } from './index';


namespace Root {

    export class rootCtrl{

        static $inject = ['$mdSidenav'];
        constructor(private $mdSidenav: angular.material.ISidenavService) {
        }
        toogleLeftNavBar = () => {
            this.$mdSidenav('left').toggle();
        }

    }

    APP_MODULE.controller('rootCtrl', rootCtrl);
}