
import * as angular from 'angular'
import { APP_MODULE } from '../../main/index';

namespace Components.ThumbsUp {

    enum ICONS {
        TRANS = -1,
        ON  = 0,
        OFF = 1
    }

    class ThumbsUpCtrl {

        static $inject = ['$element', '$timeout'];
        private ngModelController: angular.INgModelController;

        onColor: string = 'rgb(33,150,243)';
        offColor: string;
        ngModel: any;
        type: ICONS;
        fontSize: string;
        constructor(private $element: angular.IAugmentedJQuery, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.ngModelController = this.$element.controller('ngModel');
            

            const modelValue = !!this.ngModel;
            this.type = modelValue ? ICONS.ON : ICONS.OFF;
            console.log(this.type);

            setTimeout(this.Style, 100);
      
        }
        Style = () => {
            const size = (!!this.fontSize) ? parseInt(this.fontSize) + 'px' : '';
            this.$element[0].style.width = size;

            const elementOn = this.$element[0].querySelector(`.tmup-${ICONS.ON}`) as HTMLElement;
            const elementOff = this.$element[0].querySelector(`.tmup-${ICONS.OFF}`) as HTMLElement;
            console.log(elementOn, elementOn);
            elementOn.style.color = this.onColor;
            elementOn.style.cursor = 'pointer';
            elementOn.style.fontSize = size;
    
            elementOff.style.fontSize = size;
 
            console.log(this.fontSize);
        }
        setStatus = (value: ICONS) => {

            this.type = ICONS.TRANS;
            const model = !value;

            this.$timeout(() => {
                this.type = value;
                this.ngModelController.$setViewValue(model);
            }, 600);
        }
    }


    const template = require('!!raw-loader!./thumbs-up.html');
    function mdThumbsUp() {
        return <angular.IDirective>{
            controller: ThumbsUpCtrl,
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                ngModel: '=',
                fontSize: '@'
                
            }
        }
    }

    APP_MODULE.directive('mdThumbsUp', mdThumbsUp );
}