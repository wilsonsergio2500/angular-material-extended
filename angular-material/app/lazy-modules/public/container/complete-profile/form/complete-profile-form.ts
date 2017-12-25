
declare var angular: angular.IAngularStatic;
import { IFormDefinition, FormDefinition } from '../../../../../models/iformdefinition';
import { EXTERNAL_DISPLAY_MODULE } from '../../../module';
import { IUser } from '../../../../../models/contracts/request/user/iuser';
import { Fields } from './complete-profile-form-fields';
import { IInviteService } from '../../../../../services/domains/invite/invite-service';
import { IInviteCompletition } from '../../../../../models/contracts/request/invite/iinvitecompletition';

namespace Components.Public {

    export class CompleteProfileFormCtrl {
        FD: IFormDefinition<IUser>;
        model: any;
        Busy: boolean;
        static $inject = ['InviteService', '$timeout', '$state']
        constructor(private InviteService: IInviteService, private $timeout: angular.ITimeoutService, private $state: angular.ui.IStateService) {
            this.FD = new FormDefinition<IUser>();
            this.FD.fields = Fields;
            this.FD.model = <IUser>{
                email: this.model.email,
                Role: this.model.participationRoleType
            };
            this.Busy = false;
        }
        Submit($model: IUser) {
            console.log($model);

            this.Busy = true;

            const inviteModel = <IInviteCompletition>{
                user: this.FD.model,
                invitationId: this.model.id
            }

          
            

            this.InviteService.Complete(inviteModel).then((response) => {
                if (response.state) {
                    this.$timeout(() => {
                        this.$state.go('completed');
                    }, 500);
                }
            })


        }
    }

    const template = require('!!raw-loader!./complete-profile-form.html');
    function completeProfileForm() : angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: CompleteProfileFormCtrl,
            scope: {
                model: '='
            }
        }
    }

    EXTERNAL_DISPLAY_MODULE.directive('completeProfileForm', completeProfileForm)


}