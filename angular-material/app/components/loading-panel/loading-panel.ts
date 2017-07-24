
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

namespace Components.LoadingPanel{

    class LoadingPanel{
        mdShow: boolean;
        mdSize: string;

        ds: number;
        constructor(){
            this.Init();
        }
        Init = () => {
            this.ds = (!!this.mdSize) ? parseInt(this.mdSize) : 50
        }
    }


    const template = require('!!raw-loader!./loading-panel.html');
    function mdLoadingPanel(){
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            controller: LoadingPanel,
            transclude: true,
            scope: {
                mdShow: "=",
                mdSize: "="
            }
        }
    }

    APP_MODULE.directive('mdLoadingPanel', mdLoadingPanel);
}