
import * as angular from 'angular';
import { IMilestoneService } from '../../../../../../services/domains/milestone/milestone-service';
import { IResponsiveDimension } from '../../../../../../components/tile-view-responsive/interfaces/index';


export class ProfileItemViewCtrl {
    Loading: boolean;
    constructor() {
        console.log('entered');
        this.Init();
    }
    Init = () => {
        this.Loading = true;
    }
}