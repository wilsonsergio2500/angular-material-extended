
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index'

namespace Components.Animate {


    class AnimateCtrl {

        static $inject = ['$timeout']
        mdDelay: string;
        IsLoad: boolean;
        constructor(private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.IsLoad = false;

            const delay = parseInt(this.mdDelay);
            this.$timeout(() => {
                this.IsLoad = true;
            }, delay);
        }

    }

     const template = require('!!raw-loader!./animate.html');
    function mdAnimate() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: AnimateCtrl,
            transclude: true,
            scope: {
                mdAnimateClass: '@',
                mdDelay: '@'
            }
            
            
        }
    }

    APP_MODULE.directive('mdAnimate', mdAnimate);
}