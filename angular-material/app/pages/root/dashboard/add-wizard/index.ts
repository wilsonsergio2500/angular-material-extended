import * as angular from 'angular';
import { WIZARD_ADD } from './route-names';

export class WizardAddCtrl {

    static $inject = ['Injected', '$state']
    constructor(private Injected: any, private $state: angular.ui.IStateService) {
        this.Init();
    }
    Init = () => {
        this.$state.go(WIZARD_ADD.NAMES.TITLE);
    }
}