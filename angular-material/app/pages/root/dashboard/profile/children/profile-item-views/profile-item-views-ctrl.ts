
import * as angular from 'angular';
import { IMilestoneService } from '../../../../../../services/domains/milestone/milestone-service';
import { GridTile, ITileOptions, IResponsiveDimension } from '../../../../../../components/tile-view-responsive/interfaces/index';
import { IGetList } from '../../../../../../models/contracts/request/igetlist';
import { IGridElement } from '../../../../../../models/contracts/response/milestone/igridelement';
import { IListResponse } from '../../../../../../models/contracts/response/ilistresponse';
import { ILikeService } from '../../../../../../services/domains/like/like-service';
import { DASHBOARD } from '../../../route-names';

export interface IViewRoute {
    userId: string;
    categoryId: string;
}

const recordsSize = 20;
const template = require('!!raw-loader!./grid-item/grid-item-template.html');
export class ProfileItemViewCtrl {
    Loading: boolean;
    

    Page: number;
    $RouteParams: IViewRoute;
    gridTile: GridTile<any>;
    Dimensions: IResponsiveDimension[] = [];
    Total: number;

    static $inject = ['$stateParams', 'MilestoneService', '$timeout', 'LikeService', '$state']
    constructor(private $stateParams: IViewRoute, private MilestoneService: IMilestoneService, private $timeout: angular.ITimeoutService, private LikeService: ILikeService,
        private $state: angular.ui.IStateService
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
        this.gridTile.setTileSize({ width: 300, height: 450 });

        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 1200, col: 5 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 900, col: 6 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 600, col: 2 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 300, col: 1 });
        
        
        this.LoadItem();


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


    LoadItem = () => {

        const listr = <IGetList>{
            skip: ((this.Page - 1) * recordsSize),
            take: recordsSize
        }
        let counter = listr.skip;

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
                    }
                }

                this.gridTile.addItem(element);

                counter++;

            });


            this.$timeout(() => {
                this.Loading = false;
            }, 100);



        })
         
           
    }
    
}