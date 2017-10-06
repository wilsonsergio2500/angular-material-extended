
import * as angular from 'angular';
import { IInviteService } from '../../../services/domains/invite/invite-service';

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

    

}