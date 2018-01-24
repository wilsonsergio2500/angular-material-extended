
declare var angular: angular.IAngularStatic;

import { ADMIN_MODULE } from '../../module';
import { IUserDisplay } from '../../../../models/contracts/request/user/iuserdisplay';
import { IFormDefinition, FormDefinition } from '../../../../models/iformdefinition';
import { Inputs  } from '../../../../formly-fields/formly-fields';
import { IRoleService } from '../../../../services/domains/role/role-service';
import { IRole } from '../../../../models/contracts/response/role/irole';
import { IToasterService } from '../../../../services/toaster-service/toater-service'
import { IUserService  } from '../../../../services/domains/user/user-service';

namespace Components {

     class FieldController {
        static $inject = ['$scope', 'RoleService'];
        constructor(private $scope: any, private RoleService: IRoleService) {
            this.Init();

        }
        Init = () => {
            this.RoleService.GetRoles().then((items: IRole[]) => {
                let options: AngularFormly.ISelectOption[] = [];
                items.forEach((ele: IRole) => {
                    options.push(<AngularFormly.ISelectOption>{ name: ele.name, value: ele.id });
                });
                this.$scope.to.options = options;
            });
        }
    }

    class UpdateRoleCtrl {
        record: IUserDisplay;
        FD: IFormDefinition<any>;
        Busy: boolean;
        static $inject = ['$mdDialog', 'UserService', 'ToasterService', '$timeout']
        constructor(private $mdDialog: angular.material.IDialogService, private UserService: IUserService, private ToasterService: IToasterService,
            private $timeout: angular.ITimeoutService
        ) {
            this.Init();

        }
        Init = () => {
            this.Busy = false;
            this.FD = new FormDefinition<any>();
            this.FD.model = this.record;

            const role = new Inputs.Select('role', 'Role Type', []);
            role.controller = FieldController;
            


            this.FD.fields = [
                role
            ]
        }
        Cancel = () => {
            this.$mdDialog.hide();
        }
        Submit = ($model: any) => {
            this.Busy = true;

            this.UserService.UpdateUserRole($model).then((R) => {
                if (R.state) {
                    this.ToasterService.ShowAsStatus('Role has been Updated');
                    this.$timeout(() => {
                        this.$mdDialog.hide();
                    }, 1000)
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500)
                }
            })
        }
    }

    const template = require('!!raw-loader!./update-role.html');
    function updateRole(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: UpdateRoleCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                'record': '='
            }
        }

    }

    ADMIN_MODULE.directive('updateRole', updateRole)

}