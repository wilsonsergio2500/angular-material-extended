
import { IBaseContract } from '../../ibasecontract';
import { ICategory } from '../category/icategory'
import { MilestoneType } from './milestonetype'

export interface IMilestone extends IBaseContract {
    theme: string;
    postContent: string;
    image: string;
    type: MilestoneType;
    categories: ICategory[];
    userId: string;

}