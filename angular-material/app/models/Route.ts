﻿
import { IStateChildren } from '../modules/ui-router-state-helper/ui-router-state-helper';




export interface IRoute extends IStateChildren {

    name: string;
    url: string;
    template: string;
    controller: Function | string | Array<string | Function>;
    controllerAs: string;
    children?: IRoute[];
}

export class Route implements IRoute  {
    name: string;
    url: string;
    template: string;
    controller: Function | string | Array<string | Function>;
    controllerAs: string;
    children?: Route[];
    constructor() {
        this.controllerAs = 'vm';
        this.children = [];
        
        
    }
}