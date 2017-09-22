/// <reference path="../../models/iformdefinition.ts" />

import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from '../../main/index';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';

namespace FormComponents {

    export class MilestoneCtrl {

        working: boolean;
        FD: IFormDefinition<any> = new FormDefinition<any>();;
        constructor() {
            this.Init();
        }
        Init = () => {
            this.working = false;



            
        }
    }

 const template = require('!!raw-loader!./milestone.html');
    function milestoneForm() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controller: MilestoneCtrl,
            controllerAs: 'vm',
        }
    }

    APP_MODULE.directive('milestoneForm', milestoneForm);
}