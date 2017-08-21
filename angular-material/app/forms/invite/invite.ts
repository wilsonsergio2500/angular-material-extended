import * as angular from 'angular';
import { IFormDefinition } from '../../models/iformdefinition';
import { IInvite } from '../../models/contracts/request/invite/iinvite';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';

namespace FormComponents {

    export class InviteFormCtrl {

        working: boolean
        FD: IFormDefinition<IInvite>;
        constructor() {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<IInvite>>{};
            this.FD.name = 'inviteform';

            const email = new Inputs.Email('Email', 'Email', true);

            this.FD.fields = [
                email
            ];
        }

        onSubmit = () => {
            this.working = true;
        }
    }

    const template = require('!!raw-loader!./invite.html');
    function inviteForm() {
        return <angular.IDirective>{
            controller: InviteFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template
        }
    }

    APP_MODULE.directive('inviteForm', inviteForm);
}

