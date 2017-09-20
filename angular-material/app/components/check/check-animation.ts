
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';


/*
    usage:
     <md-check-animation ref="vm.acheck" speed="5" color="rgba(0, 150, 0, 1)" play-after="2000" ></md-check-animation>
*/

export interface IMdCheckAnimationRef {
    Play: () => void;
    Clear: () => void;
}

namespace Components.Check {

    class MdCheckAnimation {

        ref: IMdCheckAnimationRef;
        width: string;
        color: string;
        speed: string;
        playAfter: string;

        canvasElement: HTMLCanvasElement;
        static $inject = ['$timeout', '$element']
        constructor(private $timeout: angular.ITimeoutService, private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            console.log(this.$element);
            const item = this.$element[0];

            this.canvasElement = item.childNodes[0] as HTMLCanvasElement;


            console.log(item);
            this.canvasElement.style.width = (this.width || 50) + 'px';
            this.ref = <IMdCheckAnimationRef>{
                Play: this.Play,
                Clear: this.Clear
            };

            console.log(this.ref.Play, this.ref.Clear);

            if (!!this.playAfter) {
                setTimeout(this.Play, parseInt(this.playAfter));
            }     
            
        }
        Clear = () => {
            const ctx = this.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        Play = () => {

            const color = (this.color || 'rgba(0, 150, 0, 1)');

            let start = 100;
            let mid = 145;
            let end = 250;
            let width = 20;
            let leftX = start;
            let leftY = start;
            let rightX = mid - (width / 2.7);
            let rightY = mid + (width / 2.7);
            let animationSpeed = (!!this.speed) ? parseInt(this.speed) : 5;

            let ctx = this.canvasElement.getContext('2d');
            ctx.lineWidth = width;
            ctx.strokeStyle = color;

            for (let i = start; i < mid; i++) {
                var drawLeft = window.setTimeout(function () {
                    ctx.beginPath();
                    ctx.moveTo(start, start);
                    ctx.lineTo(leftX, leftY);
                    ctx.stroke();
                    leftX++;
                    leftY++;
                }, 1 + (i * animationSpeed) / 3);
            }

            for (let i = mid; i < end; i++) {
                var drawRight = window.setTimeout(function () {
                    ctx.beginPath();
                    ctx.moveTo(leftX, leftY);
                    ctx.lineTo(rightX, rightY);
                    ctx.stroke();
                    rightX++;
                    rightY--;
                }, 1 + (i * animationSpeed) / 3);
            }
        }

    }
    const template = require('!!raw-loader!./check-animation.html');
    function mdCheckAnimation() {
        return <angular.IDirective>{
            controller: MdCheckAnimation,
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                ref: '=',
                width: '@',
                color: '@',
                speed: '@',
                playAfter: '@'
                
            }
        }
    }

    APP_MODULE.directive('mdCheckAnimation', mdCheckAnimation);
}