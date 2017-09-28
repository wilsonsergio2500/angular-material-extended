
import { IBaseContract } from '../../ibasecontract';
import { ICategory } from '../category/icategory'

export interface IMilestone extends IBaseContract {
    theme: string;
    postContent: string;
    image: string;
    categories: ICategory[];
    userId: string;

}