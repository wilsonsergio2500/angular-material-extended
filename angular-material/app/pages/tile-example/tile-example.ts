/// <reference path="../../services/index.ts" />

import '../../components/tile-view/tile-view';
import * as angular from 'angular';
import { Services } from '../../services/index'

interface ITileTileSize {
    width: number;
    height: number;
}

interface ITileOptions {
    templateUrl?: string;
    template?: string;
    tileSize?: ITileTileSize;
    padding?: number;

    alignHorizontal?: boolean;
    onScrollEnd?: Function;
    debounce?: number;

}

interface ITileDisplay {
    items: any[];
    options: ITileOptions;
}
interface IGridTileConfig {
    $mdMedia: angular.material.IMedia,
    $templateUrl?: string;
    $template?: string;
}

class GridTile<T> implements ITileDisplay {
    options: ITileOptions;
    items: T[];
    

    private Promise: angular.IPromise<T>;
    
    constructor(private Config: IGridTileConfig) {

        this.options = <ITileOptions>{ templateUrl: Config.$templateUrl, template: Config.$template, padding: 10 };
        this.items = [];
    }

    setTileSize(tileSize: ITileTileSize) {
        this.options.tileSize = tileSize;
    }

    addItem(Item: T) {
        this.items.push(Item);
    }
    addItems(List: T[]) {
        this.items = this.items.concat(List);
    }

    setOnScrollEndPromise(promise: angular.IPromise<T>) {
        this.Promise = promise;
        this.options.onScrollEnd = this.onScrollEnd;
    }

    onScrollEnd() {
        let that = this;
        if (!!this.Promise) {
            that.Promise.then((items) => {
                that.items = that.items.concat(items);
            });
        }
    }

    setOnScrollEnd(onScrollEnd: Function) {
        this.options.onScrollEnd = onScrollEnd;
    }
}

const tileItem = require('!!raw-loader!./tile-item/tile-item.html');

export class TileViewExamplePage {

    Tile: GridTile<any>;
    Items: any[];

    NumItem: number;
    Page: number;

    static $inject = ['$scope', '$mdMedia', 'ResizeDetectorService']
    constructor(private $scope: angular.IScope, private $mdMedia: angular.material.IMedia, private ResizeDetectorService : Services.IResizeDetectorService) {

        console.log(ResizeDetectorService);

        this.Page = 0;
        this.NumItem = 100;
        this.Init();
        console.log('component loaded');
    }
    Init() {
        this.Tile = new GridTile<any>(<IGridTileConfig>{ $mdMedia: this.$mdMedia, $template: tileItem });
        this.Tile.setTileSize({ width: 130, height: 130 });
        this.Tile.setOnScrollEnd(this.onscrollEnded);
        this.LoadItems();


        //this.$scope.$on('$destroy', this.OnDestroy);
    }

    InitDetector = () => {
        this.ResizeDetectorService.Subscribe(document.querySelector("#content"), this.onResizeDetectorChange);
    }
    onResizeDetectorChange = () => {
        console.log('changed');
    }

    OnDestroy = () => {
    }

    private LoadItems() {
        let offset = (this.Page * this.NumItem);
        let take = ((this.Page + 1) * this.NumItem);

        for (let i = 0; i < take; i++) {
            let element = {
                id: i,
                name: 'name ' + i
            }
            this.Tile.addItem(element);
            //this.Items.push(element);
        }
    }

    onscrollEnded() {
        console.log('scroll ended..');
    }


}