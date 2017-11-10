import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { IFormDefinition } from '../../models/iformdefinition';
import { IInvite } from '../../models/contracts/request/invite/iinvite';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';
import { IRoleService } from '../../services/domains/role/role-service';
import { IRole } from '../../models/contracts/response/role/irole';
import { IInviteService } from '../../services/domains/invite/invite-service';
import { IToasterService } from '../../services/toaster-service/toater-service';
import { IDialogService } from '../../services/dialog-service/dialog-service';

namespace FormComponents {

    interface IChipModelExample {
        name: string;
        id: number | string;
    }

    export class FieldController{
        static $inject = ['$scope', 'RoleService'];
        constructor(private $scope: any, private RoleService: IRoleService) {
            this.Init();
            
        }
        Init = () => {
            this.RoleService.GetRoles().then((items: IRole[]) => {
                console.log(items);
                let options: formly.ISelectOption[] = [];
                items.forEach((ele: IRole) => {
                    options.push(<formly.ISelectOption>{ name: ele.name, value: ele.id });
                });
                this.$scope.to.options = options;
            });
        }
    }

    export class InviteFormCtrl {

        working: boolean
        FD: IFormDefinition<IInvite>;
        static $inject = ['$q', '$timeout', 'InviteService', 'ToasterService', 'DialogService'];
        constructor(private $q: angular.IQService, private $timeout: angular.ITimeoutService, private InviteService: IInviteService,
            private ToasterService: IToasterService, private DialogService: IDialogService
        ) {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<IInvite>>{};
            this.FD.name = 'inviteform';

            const email = new Inputs.Email('email', 'Email', true);
            const Roles = new Inputs.Select('participationRoleType', 'Role Type', []);
            Roles.controller = FieldController;

            this.DialogService.DisplayError()


            this.FD.fields = [
                email,
                Roles,
                //editor,
                //Topics
            ];
        }
        getModels = () => {
            const models: IChipModelExample[] = [
                { name: 'sergio', id: 1 },
                { name: 'gioboy', id: 2 },
                { name: 'gioboy12', id: 3 },
                { name: 'giogoi', id: 4 }
            ];

            return models;
        }

        

        onSubmit = ($event: any) => {
            console.log($event);

            this.working = true;
            this.InviteService.Add(this.FD.model).then((response) => {
                if (response.state) {
                    this.ToasterService.ShowAsStatus('Invite Sent', 3000);
                }
                this.working = false;
            })
            console.log(this.FD.model);
            //this.InviteService.Add(
            //console.log(this.FD.model);

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

