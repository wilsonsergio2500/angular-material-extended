import * as angular from 'angular'; 
import { APP_MODULE } from '../../main/index'

/*
usage: 
     <md-loading-button type="button" md-class="md-raised md-primary" md-busy="vm.working" md-on-click="vm.onClick()" md-disabled="vm.disableButton">
        <md-message>
            my button
        </md-message>
        <md-loading-message>
            Loading..
        </md-loading-message>
    </md-loading-button>
*/

namespace Components.LoadingButton {


    class LoadingButton {
        static $inject = ['$element'];
        mdClass: string;
        mdBusy: boolean;
        mdOnClick: Function;
        mdDisabled: string;
        type: string;

        IsDisabled: boolean;
        btnType: string;
        constructor(private $element: angular.IAugmentedJQuery) {
            this.Init();   
        }
        Init = () => {
            this.btnType = (!!this.type) ? this.type : 'button';
            this.IsDisabled = (!!this.mdDisabled) 
        }
        Click = () => {
            this.mdOnClick.call(this);
        }
    }

    const template = require('!!raw-loader!./loading-button.html');

     function mdLoadingButton(): ng.IDirective {
        return <ng.IDirective>{
            transclude: true,
            controller: LoadingButton,
            template: template,
            controllerAs: 'vm',
            
            bindToController: true,
            scope: {
                mdClass: '@',
                mdBusy: '=',
                mdOnClick: '&',
                mdDisabled: '=',
                type: '@'
            }

        }
    }

    APP_MODULE.directive("mdLoadingButton", mdLoadingButton);

}
