
import * as angular from 'angular';
import { IMilestoneService } from '../../../../../../services/domains/milestone/milestone-service';
import { GridTile, ITileOptions, IResponsiveDimension } from '../../../../../../components/tile-view-responsive/interfaces/index';
import { IGetList } from '../../../../../../models/contracts/request/igetlist';
import { IGridElement } from '../../../../../../models/contracts/response/milestone/igridelement';
import { IListResponse } from '../../../../../../models/contracts/response/ilistresponse';

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

    static $inject = ['$stateParams', 'MilestoneService', '$timeout']
    constructor(private $stateParams : IViewRoute, private MilestoneService: IMilestoneService, private $timeout: angular.ITimeoutService) {
        this.Init();
    }
    Init = () => {
        this.Loading = true;
        this.$RouteParams = this.$stateParams;
        this.Page = 1;

        console.log(this.$stateParams);

        this.setGridTile();
    }

    setGridTile = () => {

        const options = <ITileOptions>{ template: template };
        this.gridTile = new GridTile<any>(options);
        this.gridTile.setTileSize({ width: 130, height: 500 });

        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 1200, col: 4 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 900, col: 6 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 600, col: 2 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 300, col: 1 });
        
        
        this.LoadItem();


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
                    element: gridItem
                }

                this.gridTile.addItem(element);

                counter++;

                this.$timeout(() => {
                    this.Loading = false;
                }, 200);

            });

        })
         
           
    }
    
}