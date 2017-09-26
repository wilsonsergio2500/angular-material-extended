
import { IBaseContract } from '../../ibasecontract';

export interface IInvite extends IBaseContract {
    email: string;
    participationRoleType: number;

    inviteStatus?: number;
    createdDate?: number;
    active?: boolean;

}