
import * as angular from 'angular';
import { IMilestoneService } from '../../../../services/domains/milestone/milestone-service';
import { IGetList } from '../../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../../models/contracts/response/ilistresponse';
import { IGridElement } from '../../../../models/contracts/response/milestone/igridelement';
import { IToasterService } from '../../../../services/toaster-service/toater-service';

const recordsSize = 25;
export class ItemGridCtrl {
    Loading: boolean;
    Page: number;

    Items: any[]

    static $inject = ['MilestoneService', 'ToasterService']
    constructor(private MilestoneService: IMilestoneService, private ToasterService: ) {
        this.Init();
    }
    Init = () => {
        this.Loading = true;

        this.Page = 0;
        this.Items = [];

        this.LoadMore();

    }
    LoadMore = () => {
        const request = <IGetList>{
            skip: (this.Page * recordsSize),
            take: recordsSize
        };
        let counter = request.skip;

        this.MilestoneService.GetList(request).then((response: IListResponse<IGridElement>) => {

            response.result.forEach((gridItem: IGridElement) => {
                let element = {
                    id: counter,
                    element: gridItem,
                    //Ctrl: {
                    //    Like: () => this.Like(gridItem.milestone.id),
                    //    Unlike: () => this.Unlike(gridItem.milestone.id),
                    //    working: false,
                    //    GoTo: (item: any) => { return this.GoToTile(item) },
                    //    GoToUser: (item: any) => { return this.GoToUser(item); }
                    //}
                };
                counter++;

                this.Items.push(element);
            });

            console.log(this.Items);

        });

    }
}