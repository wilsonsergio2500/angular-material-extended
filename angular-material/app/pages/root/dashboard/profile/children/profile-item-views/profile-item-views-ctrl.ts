
import * as angular from 'angular';
import { IMilestoneService } from '../../../../../../services/domains/milestone/milestone-service';
import { GridTile, ITileOptions, IResponsiveDimension } from '../../../../../../components/tile-view-responsive/interfaces/index';
import { IGetList } from '../../../../../../models/contracts/request/igetlist';
import { IGridElement } from '../../../../../../models/contracts/response/milestone/igridelement';
import { IListResponse } from '../../../../../../models/contracts/response/ilistresponse';
import { ILikeService } from '../../../../../../services/domains/like/like-service';
import { DASHBOARD } from '../../../route-names';
import { IToasterService } from '../../../../../../services/toaster-service/toater-service';
import { IDialogService } from '../../../../../../services/dialog-service/dialog-service';

export interface IViewRoute {
    userId: string;
    categoryId: string;
}

const recordsSize = 15;
const template = require('!!raw-loader!./grid-item/grid-item-template.html');
export class ProfileItemViewCtrl {
    Loading: boolean;
    

    Page: number;
    $RouteParams: IViewRoute;
    gridTile: GridTile<any>;
    Dimensions: IResponsiveDimension[] = [];
    Total: number;

    static $inject = ['$stateParams', 'MilestoneService', '$timeout', 'LikeService', '$state', 'ToasterService', 'DialogService']
    constructor(private $stateParams: IViewRoute, private MilestoneService: IMilestoneService, private $timeout: angular.ITimeoutService, private LikeService: ILikeService,
        private $state: angular.ui.IStateService, private ToasterService: IToasterService, private DialogService : IDialogService
    ) {
        this.Init();
    }
    Init = () => {
        this.Loading = true;
        this.$RouteParams = this.$stateParams;
        this.Page = 1;

        this.setGridTile();
    }

    setGridTile = () => {

        const options = <ITileOptions>{ template: template };
        this.gridTile = new GridTile<any>(options);
        this.gridTile.setTileSize({ width: 300, height: 430 });

        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 1200, col: 5 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 900, col: 3 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 600, col: 2 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 300, col: 1 });
        this.$timeout(() => {
            this.gridTile.setOnScrollEnd(this.OnScrollEnd);
        }, 3000);
        
        this.LoadItem();


    }
    OnScrollEnd = () => {
        const hasmore = this.Total > this.gridTile.getTotalCount();
        if (hasmore) {

            this.Page = this.Page + 1;
            this.Loading = true;
            this.ToasterService.ShowAsProgress('Loading additional records');
            this.LoadItem();

        }
        console.log(hasmore);
    }

    Like = (milestoneId: string) => {
        return this.LikeService.Like(milestoneId);
    }
    Unlike = (milestoneId: string) => {
        return this.LikeService.Unlike(milestoneId);
    }
    GoToTile = (item: any) => {
        item.Ctrl.working = true;
        const Id = item.element.milestone.id;
        this.$timeout(() => {
            this.$state.go(DASHBOARD.NAMES.MILESTONE.MILESTONE_VIEW, { Id });
        }, 500);
    }

    RemoveItem = ($event : any, griditem: IGridElement) => {
        this.DialogService.DisplayRemoveLandmarkConfirmation($event, griditem).then((response) => {

            if (response && !!response.removed) {
                const index = this.gridTile.items.map((i) => i.element.milestone.id).indexOf(response.removed);
                this.gridTile.removeAtIndex(index);
            }

        });
    }


    LoadItem = () => {

        const listr = <IGetList>{
            skip: ((this.Page - 1) * recordsSize),
            take: recordsSize
        }
        let counter = listr.skip;

        this.DisplayToaster();


        this.MilestoneService.GetListByCategory(this.$RouteParams.userId, this.$RouteParams.categoryId, listr).then((response :IListResponse<IGridElement>) => {

            this.Total = response.count;
            response.result.forEach((gridItem: IGridElement) => {

                let element = {
                    id: counter,
                    element: gridItem,
                    Ctrl: {
                        Like: () => this.Like(gridItem.milestone.id),
                        Unlike: () => this.Unlike(gridItem.milestone.id),
                        working: false,
                        GoTo: (item: any) => { return this.GoToTile(item) },
                        Remove: (event: any) => this.RemoveItem(event, gridItem)
                    }
                }

                this.gridTile.addItem(element);

                counter++;

            });


            this.$timeout(() => {
                this.Loading = false;
                this.ToasterService.HideToaster();
            }, 100);



        })
         
           
    }

    DisplayToaster = () => {
        const records = this.gridTile.getTotalCount();
        if (records == 0) {
            this.ToasterService.ShowAsProgress('Loading Category Records...');
        }
    }
}