
interface ITileTileSize {
    width: number;
    height: number;
}

export interface ITileOptions {
    templateUrl?: string;
    template?: string;
    tileSize?: ITileTileSize;
    padding?: number;
    scrollEndOffset?: number;

    alignHorizontal?: boolean;
    onScrollEnd?: Function;
    debounce?: number;

}

export interface ITileDisplay {
    items: any[];
    options: ITileOptions;
}
interface IGridTileConfig {
    $mdMedia: angular.material.IMedia,
    $templateUrl?: string;
    $template?: string;
}

export interface IResponsiveDimension {
    minWidth: number;
    col: number;
}

export class GridTile<T>{
    items: T[];
    constructor(private config: ITileOptions) {
        this.config.padding = 10;
        this.config.scrollEndOffset = 1;
        this.config.tileSize = <ITileTileSize>{ width: 0, height: 0 };
        this.items = [];
    }
    setPadding(padding: number) {
        this.config.padding = padding;
    }
    setTileSize(tileSize: ITileTileSize) {
        this.config.tileSize = tileSize;
    }
    setTileWidth(width: number) {
        this.config.tileSize.width = width;
    }

    setOnScrollEnd(onScrollEnd: Function){
        this.config.onScrollEnd = onScrollEnd;
    }

    setItems(items: T[]) {
        this.items = items;
    }
    addRangeItems(items: T[]) {
        this.items = this.items.concat(items);
    }
    addRangeItemsTop(items: T[]) {
        this.items = items.concat(this.items);
    }
    addItem(item: T) {
        this.items.push(item);
    }
}