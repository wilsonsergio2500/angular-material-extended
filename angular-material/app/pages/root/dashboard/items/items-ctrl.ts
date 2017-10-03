
import { GridTile, ITileOptions, IResponsiveDimension } from '../../../../components/tile-view-responsive/interfaces/index';

const tileItem = require('!!raw-loader!./item-template/item-template.html');
export class ItemsCtrl {

    gridTile: GridTile<any>;
    NumItem: number;
    Page: number;

    Dimensions: IResponsiveDimension[] = [];

    Loading: boolean;
    constructor() {
        this.Init();
    }
    Init = () => {
        this.Loading = true;

        this.Page = 0;
        this.NumItem = 100;

        let options = <ITileOptions>{ template: tileItem };
        this.gridTile = new GridTile<any>(options);
        this.gridTile.setTileSize({ width: 130, height: 130 });
        this.gridTile.setItems(this.getItems());
        this.gridTile.setOnScrollEnd(this.onScrollEnd);


        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 1200, col: 9 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 900, col: 6 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 600, col: 4 });
        this.Dimensions.push(<IResponsiveDimension>{ minWidth: 300, col: 2 });

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
        this.Page = this.Page + 1;
        this.gridTile.addRangeItems(this.getItems());
        console.log(' you scroll');
    }
}