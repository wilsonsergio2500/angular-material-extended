
import { GridTile, ITileOptions, IResponsiveDimension } from '../../../../components/tile-view-responsive/interfaces/index';
import { IMilestoneService } from '../../../../services/domains/milestone/milestone-service';
import { IGetList } from '../../../../models/contracts/request/igetlist';
import { IMilestone } from '../../../../models/contracts/request/milestone/imilestone';
import { IGridElement } from '../../../../models/contracts/response/milestone/igridelement';
import { ILikeService } from '../../../../services/domains/like/like-service';
import { DASHBOARD } from '../route-names'
import { IToasterService } from '../../../../services/toaster-service/toater-service';
import { IDialogService } from '../../../../services/dialog-service/dialog-service';

const tileItem = require('!!raw-loader!./item-template/item-template.html');

const recordsSize = 15;
export class ItemsCtrl {

    gridTile: GridTile<any>;
    Total: number = 0;
    NumItem: number;
    Page: number;

    Dimensions: IResponsiveDimension[] = [];

    Loading: boolean;
    static $inject = ['MilestoneService', 'LikeService', '$state', '$timeout', 'ToasterService', 'DialogService']
    constructor(private MilestoneService: IMilestoneService, private LikeService: ILikeService, private $state: angular.ui.IStateService,
        private $timeout: angular.ITimeoutService, private ToasterService: IToasterService,
        private DialogService : IDialogService
    ) {
        this.Init();
    }
    Init = () => {
        this.Loading = true;

        this.Page = 0;
        this.NumItem = 100;

        let options = <ITileOptions>{ template: tileItem };
        this.gridTile = new GridTile<any>(options);
        this.gridTile.setTileSize({ width: 130, height: 500 });
        this.$timeout(() => {
            this.gridTile.setOnScrollEnd(this.onScrollEnd);
        }, 3000);


        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 1200, col: 5 }); // it used to be 4
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 900, col: 3 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 600, col: 2 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 300, col: 1 });

        this.ToasterService.ShowAsProgress('Loading records..');
        

        this.LoadItems();

    }
    LoadItems = () => {


        const request = <IGetList>{
            skip: (this.Page * recordsSize),
            take: recordsSize
        };
        let counter = request.skip;
        this.MilestoneService.GetList(request).then((response) => {
            this.Total = response.count;
            let gridElements : any[] = [];

            response.result.forEach((gridItem: IGridElement) => {
                
                gridItem.hasImg = (!!gridItem.milestone.image);

                let element = {
                    id: counter,
                    element: gridItem,
                    Ctrl: {
                        Like: () => this.Like(gridItem.milestone.id),
                        Unlike: () => this.Unlike(gridItem.milestone.id),
                        working: false,
                        GoTo: (item: any) => { return this.GoToTile(item) },
                        GoToUser: (item: any) => { return this.GoToUser(item); }
                    }
                };
                counter++;
                
                gridElements.push(element);
            });

            this.gridTile.addRangeItems(gridElements);

            this.Loading = false;
            this.$timeout(() => {

                this.ToasterService.HideToaster();
                
            }, 200);

        });
    }

    Like = (milestoneId : string) => {
        return this.LikeService.Like(milestoneId);
    }
    Unlike = (milestoneId: string) => {
        return this.LikeService.Unlike(milestoneId);
    }
    GoToTile = (item: any) => {
        item.Ctrl.working = true;
        const Id = item.element.milestone.id;
        this.$timeout(() => {
            this.$state.go(DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW, {Id});
        }, 500);
    }
    GoToUser = (item: any) => {
        const Id = (item.element.milestone as IMilestone).userId;
        this.$timeout(() => {
            this.$state.go(DASHBOARD.NAMES.PROFILE.VIEWS.MAIN, { Id });
        }, 500);
    }
    private getItems() {
        let offset = (this.Page * this.NumItem);
        let take = ((this.Page + 1) * this.NumItem);

        let items: any[] = [];
        for (let i = offset; i < take; i++) {
            let element = {
                id: i,
                name: 'name ' + i
            }
            items.push(element);
        }

        return items;
    }

    onScrollEnd = () => {
        const hasmore = this.Total > this.gridTile.getTotalCount();
        if (hasmore) {
          
            this.Page = this.Page + 1;
            this.Loading = true;
            this.ToasterService.ShowAsProgress('Loading additional records');
            this.LoadItems();
        }
        
    }

    OpenAdd = ($event: any) => {
        this.DialogService.DisplayLandmarkActions($event);
    }
}