
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

namespace Component.mdChipItems{


    export class MdChipItemCtrl {
        mdPlaceholder: string;
        mdQuery: (searchText: string) => angular.IPromise<any[]> | any[] ;
        mdFieldName: string;
        ngModel: string;
        constructor() {
        }
    }

    const template = require('!!raw-loader!./md-chip-items.html');
    function mdChipItems(){
        return <angular.IDirective>{
            bindToController: true,
            controller: MdChipItemCtrl,
            template: template,
            controllerAs: 'vm',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                mdPlaceholder: '@',
                mdFieldName:'@',
                mdQuery: '='
            }
        }
    }

    APP_MODULE.directive('mdChipItems', mdChipItems);

}