
import * as angular from 'angular';
import 'angular-route';


export interface IStateChildren extends angular.ui.IState {
    children?: IStateChildren[];
}

export interface IStateProvider {
    state(state: IStateChildren): any;
}

class StateProvider implements IStateProvider {

    static $inject = ['$stateProvider']
    constructor(private $stateProvider: angular.ui.IStateProvider) {
        
    }

    $get = angular.noop; 

    state = (state: IStateChildren, opts? : any) => {
        let options = {
            keepOriginalNames: true,
            siblingTraversal: false
        }; 

        if (!options.keepOriginalNames) {
            this.fixStateName(state);
        }
        this.$stateProvider.state(state);
        
        let that = this;
        if (state.children && state.children.length) {
            state.children.forEach((childState) => {
                childState.parent = state;
                that.state(childState, options);
            });

            if (options.siblingTraversal) {
                this.addSiblings(state);
            }
        }

        return this;
    }

    private fixStateName = (state: angular.ui.IState) => {
        if (state.parent) {
            state.name = (angular.isObject(state.parent) ? (state.parent as any).name : state.parent) + '.' + state.name;
            console.log(state.name);
        }
       
    } 
  
    private addSiblings = (state : any) =>  {
    state.children.forEach(function (childState : any, idx : any, array : any) {
        if (array[idx + 1]) {
            childState.nextSibling = array[idx + 1].name;
        }
        if (array[idx - 1]) {
            childState.previousSibling = array[idx - 1].name;
        }
    });
}

}

angular.module('ui.router.stateHelper', ['ui.router']).provider('$stateHelper', StateProvider)