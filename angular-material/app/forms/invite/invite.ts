import * as angular from 'angular';
import { IFormDefinition } from '../../models/iformdefinition';
import { IInvite } from '../../models/contracts/request/invite/iinvite';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';
import { IRoleService } from '../../services/domains/role-service';

namespace FormComponents {


    export class FieldController{
        static $inject = ['$scope', 'RoleService'];
        constructor(private $scope: any, private RoleService : IRoleService) {
            this.Init();
            
        }
        Init = () => {
            this.RoleService.getRoles().then((items) => {
                this.$scope.to.options = items;
            });
        }
    }

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
            const Roles = new Inputs.Select('RoleType', 'Role Type', []);
            Roles.controller = FieldController;

            const editor = new Inputs.QuillTextEditor('post', 'Post');
            //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
            //editor.templateOptions.htmlQuillEditor.height = 250;

            this.FD.fields = [
                email,
                Roles,
                editor
            ];
        }

        onSubmit = () => {
            this.working = true;
            console.log(this.FD.model);

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

