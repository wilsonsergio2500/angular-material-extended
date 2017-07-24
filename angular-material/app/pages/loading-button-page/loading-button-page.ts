import * as angular from 'angular';

export class LoadingButtonPage {

    working: boolean;
    disableButton: boolean;

    static $inject = ['$timeout'];
    constructor(private $timeout: angular.ITimeoutService) {
        this.working = false;
        this.disableButton = false;
    }
    onClick = () => {
        

        this.working = true;
        this.$timeout(() => {
            this.working = false;
        }, 8000);
    }
}