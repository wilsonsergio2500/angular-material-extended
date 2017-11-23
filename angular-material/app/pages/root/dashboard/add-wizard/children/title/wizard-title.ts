
import * as angular from 'angular';
import { WIZARD_ADD } from '../../route-names';
import { IFormDefinition, FormDefinition } from '../../../../../../models/iformdefinition';
import { Inputs } from '../../../../../../formly-fields/formly-fields'

export class TitleCtrl {

    working: boolean;
    FD: IFormDefinition<any> = new FormDefinition<any>();

    aspectRatio: Inputs.IAspectRatio;

    static $inject = ['$state']

    constructor(private $state: angular.ui.IStateService) {
        this.Init();
    }
    Init = () => {
        this.working = false;
        this.aspectRatio = <Inputs.IAspectRatio>{ w: 300, h: 135 };

    }

}