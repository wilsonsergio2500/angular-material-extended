import { IBaseContract } from '../../ibasecontract';
export interface IUser extends IBaseContract {
    name: string;
    lastName: string;
    email: string;
    userName: string;

    password: string;
    Role: number;
    Image: string;
}