import * as angular from 'angular';
import { IFormDefinition } from '../../models/iformdefinition';
import { IInvite } from '../../models/contracts/request/invite/iinvite';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';
import { IRoleService } from '../../services/domains/role-service';

namespace FormComponents {

    interface IChipModelExample {
        name: string;
        id: number | string;
    }

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
        static $inject = ['$q', '$timeout'];
        constructor(private $q: angular.IQService, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = <IFormDefinition<IInvite>>{};
            this.FD.name = 'inviteform';

            const email = new Inputs.Email('Email', 'Email', true);
            const Roles = new Inputs.Select('RoleType', 'Role Type', []);
            Roles.controller = FieldController;

            //const editor = new Inputs.WysiwygTextEditor('post', 'Post');
            //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
            //editor.templateOptions.htmlQuillEditor.height = 250;

            //const Topics = new Inputs.ChipOptions('topics', 'Topics', 'name', this.getModels());
            //const Topics = new Inputs.ChipOptions('topics', 'Topics', 'name');
            //Topics.templateOptions.chipItem.optionsPromise = this.getQuery;
            //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
            //editor.templateOptions.htmlQuillEditor.height = 250;


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

        getQuery = (query: string): angular.IPromise<IChipModelExample[]> => {

            return this.$q((resolve: angular.IQResolveReject<IChipModelExample[]>, reject: angular.IQResolveReject<any>) => {
                this.$timeout(() => {

                    console.log(query);
                    resolve(this.getModels());

                }, 200);
            });
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

