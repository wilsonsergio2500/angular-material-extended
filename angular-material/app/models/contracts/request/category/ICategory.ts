import { IBaseContract } from '../../ibasecontract';
export interface ICategory extends IBaseContract {
    Name: string;
    Active?: boolean;
    CreationDate?: number;
}