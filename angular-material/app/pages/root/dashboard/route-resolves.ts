
import * as angular from 'angular';
import { IInviteService } from '../../../services/domains/invite/invite-service';
import { IUserService } from '../../../services/domains/user/user-service';
import { IMilestoneService } from '../../../services/domains/milestone/milestone-service';

interface IStateParmBase {
    Id: string;
}

export namespace RouteResolves {

    export class InviteComplete  {

        static Resolve = {
            Injected: ['$stateParams', 'InviteService',
                ($stateParams: IStateParmBase, InviteService: IInviteService) => {
                    return InviteService.Get($stateParams.Id);
                }
            ]
        }

    }

    export class MilestoneView {
        static Resolve = {
            Injected: ['$stateParams', '$q',  'MilestoneService',
                ($stateParams: IStateParmBase, $q: angular.IQService,  MilestoneService: IMilestoneService) => {

                    return MilestoneService.Get($stateParams.Id);
            }]
        }
    }



    export namespace Profile {

        export class EditBio {
            static Resolve = {
                Injected: ['UserService', (UserService: IUserService) => {
                    return UserService.GetMe();
                }]
            }
        }
    }
}