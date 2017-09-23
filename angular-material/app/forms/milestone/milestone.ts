
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from '../../main/index';
import { IFormDefinition, FormDefinition } from '../../models/iformdefinition';
import { Inputs } from '../../formly-fields/formly-fields';
import { Wrappers } from '../../formly-fields/formly-wrappers'

namespace FormComponents {

    export class MilestoneCtrl {

        working: boolean;
        FD: IFormDefinition<any> = new FormDefinition<any>();;
        constructor() {
            this.Init();
        }
        Init = () => {
            this.working = false;

            const Image = new Inputs.ImagePreviewerUpload('Image', 'Image', <Inputs.IAspectRatio>{ w: 300, h: 135 });
            Image.className = Wrappers.FlexCenter50();

            this.FD.fields = [
                Image
            ]
            

            
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