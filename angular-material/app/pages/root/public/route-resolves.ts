import { IInviteService } from '../../../services/domains/invite/invite-service';
interface IStateParmBase {
    Id: string;
}

export namespace PUBLIC_ROUTE_RESOLVES  {

    export class InviteComplete {

        static Resolve = {
            Injected: ['$stateParams', 'InviteService',
                ($stateParams: IStateParmBase, InviteService: IInviteService) => {
                    return InviteService.Get($stateParams.Id);
                }
            ]
        }

    }

}