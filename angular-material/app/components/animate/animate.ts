
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index'

namespace Components.Animate {

    /*
     usage:
    <md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000"></md-animate>
    */

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