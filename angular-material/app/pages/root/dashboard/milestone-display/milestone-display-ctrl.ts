import { IGridElement } from '../../../../models/contracts/response/milestone/igridelement';
export class MilestoneDisplayCtrl {

    static $inject = ['Injected']
    constructor(private Injected: IGridElement) {
        Injected.hasImg = !!Injected.milestone.image;
        //console.log(Injected);
    }
}