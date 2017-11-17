
import * as angular from 'angular';
import { IMilestoneService } from '../../../../services/domains/milestone/milestone-service';
import { IGetList } from '../../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../../models/contracts/response/ilistresponse';
import { IGridElement } from '../../../../models/contracts/response/milestone/igridelement';
import { IToasterService } from '../../../../services/toaster-service/toater-service';
import { ILikeService } from '../../../../services/domains/like/like-service';
import { DASHBOARD  } from '../route-names';

const recordsSize = 25;
export class ItemGridCtrl {
    Loading: boolean;
    Page: number;

    Items: any[]

    static $inject = ['MilestoneService', 'ToasterService', 'LikeService', '$state', '$timeout']
    constructor(private MilestoneService: IMilestoneService, private ToasterService: IToasterService,
        private LikeService: ILikeService, private $state: angular.ui.IStateService,
        private $timeout: angular.ITimeoutService
    ) {
        this.Init();
    }
    Init = () => {
        this.Loading = false;

        this.Page = 0;
        this.Items = [];

        this.ToasterService.ShowAsProgress('Loading Progress..');

        this.LoadMore();

    }
    LoadMore = () => {
        this.Loading = true;

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
                    Ctrl: {
                        //Like: () => this.Like(gridItem.milestone.id),
                        //Unlike: () => this.Unlike(gridItem.milestone.id),
                        //working: false,
                        //GoTo: (item: any) => { return this.GoToTile(item) },
                        //GoToUser: (item: any) => { return this.GoToUser(item); }
                    }
                };
                counter++;

                this.Items.push(element);
                
            });

            this.$timeout(() => {
                this.ToasterService.HideToaster();
            }, 200);

            this.Loading = false;

            //console.log(this.Items);

        });

    }

    Like = (milestoneId: string) => {
        return this.LikeService.Like(milestoneId);
    }
    Unlike = (milestoneId: string) => {
        return this.LikeService.Unlike(milestoneId);
    }
    GoToTile = (item: any) => {
        item.Ctrl.working = true;
        console.log(item);
        const Id = item.element.milestone.id;
        this.$timeout(() => {
            this.$state.go(DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW, { Id });
        }, 500);
    }
}