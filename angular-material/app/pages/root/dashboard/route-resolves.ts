
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
            Injected: ['$stateParams', '$q', 'UserService', 'MilestoneService',
                ($stateParams: IStateParmBase, $q: angular.IQService, UserService: IUserService, MilestoneService: IMilestoneService) => {

                    return $q.all({

                    });
            }]
        }
    }
    

}