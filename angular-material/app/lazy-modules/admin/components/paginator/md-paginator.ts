
declare var angular: angular.IAngularStatic;
import { ADMIN_MODULE } from '../../module';

namespace Components {

    class MdPaginatorCtrl {

        clPages: number;
        clAlignModel: string;
        clPageChanged: Function;
        clSteps: number;
        clCurrentPage: number;

        first = '<<';
        last = '>>';

        index = 0;
        page: any[];
        stepInfo: any[];

        constructor() {
            this.Init();
        }
        Init =() => {
            this.setPages();
            this.setStepInfo();

        }
        setPages = () => {
            this.page = [];
            for (var i = 1; i <= this.clPages; i++) {
                this.page.push(i);
            }
        }
        setStepInfo = () => {
            this.stepInfo = [];
            for (var i = 0; i < this.clSteps; i++) {
                this.stepInfo.push(i)
            }

        }

        goto = (index : number) => {
            this.clCurrentPage = this.page[index];
        };

        gotoPrev = function () {
            this.clCurrentPage = this.index;
            this.index -= this.clSteps;
        };

        gotoNext = function () {
            this.index += this.clSteps;
            this.clCurrentPage = this.index + 1;
        };

        gotoFirst = function () {
            this.index = 0;
            this.clCurrentPage = 1;
        };

        gotoLast = function () {
            this.index = (this.clPages / this.clSteps) * this.clSteps;
            this.index === this.clPages ? this.index = this.index - this.clSteps : '';
            this.clCurrentPage = this.clPages;
        };

    }


    const template = require('!!raw-loader!./md-paginator.html');
    export function mdPaginator() : angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: MdPaginatorCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                clPages: '=',
                clAlignModel: '=',
                clPageChanged: '&',
                clSteps: '=',
                clCurrentPage: '='
            },
        }
    }

    ADMIN_MODULE.directive('mdPaginator', mdPaginator)

}