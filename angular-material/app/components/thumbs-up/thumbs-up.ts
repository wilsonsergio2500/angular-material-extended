
import * as angular from 'angular'
import { APP_MODULE } from '../../main/index';

namespace Components.ThumbsUp {

    enum ICONS {
        TRANS = -1,
        OFF = 0,
        ON = 1,
    }
    /**
     * Usage:
        <md-thumbs-up ng-model="vm.value"  md-on-like="vm.thumbsUpLike(123)" md-on-unlike="vm.thumbUpUnlike(1234)"></md-thumbs-up>
     */

    class ThumbsUpCtrl {

        static $inject = ['$element', '$timeout'];
        private ngModelController: angular.INgModelController;

        onColor: string = 'rgb(33,150,243)';
        offColor: string;
        ngModel: any;
        type: ICONS;
        //fontSize: string;

        working: boolean;
     
        mdOnLike: () => angular.IPromise<any>;
        mdOnUnlike: () => angular.IPromise<any>;
        constructor(private $element: angular.IAugmentedJQuery, private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {
            this.ngModelController = this.$element.controller('ngModel');
            this.working = false;
           

            const modelValue = !!this.ngModel;
            this.type = modelValue ? ICONS.ON : ICONS.OFF;
            this.ngModelController.$setViewValue(this.type);
            console.log(this.type);

            setTimeout(this.setStyle, 100);
      
        }
        setStyle = () => {
            const $iconWrapper = this.$element[0].querySelector('.icon-wrapper');
            const $value = this.ngModelController.$viewValue;
            if ($value == ICONS.ON) {
                angular.element($iconWrapper).addClass('selected');
            }
           
        }
        
      
        changeState = () => {
            let $iconWrapper = this.$element[0].querySelector('.icon-wrapper');
            const $value = this.ngModelController.$viewValue;
            console.log($value);
            if ($value == ICONS.OFF) {
                this.executeLike();
            }
            if ($value == ICONS.ON) {
                this.executeUnlike();
            }

           
        }
        private executeLike = () => {
            this.working = true;
            if (!!this.mdOnLike) {
                this.mdOnLike().then((response) => {
                    this.setAsLiked();
                });
            }
        }
        private executeUnlike = () => {
            this.working = true;
            if (!!this.mdOnUnlike) {
                this.mdOnUnlike().then((response) => {
                    this.setAsDefault();
                })
            }
        }
       private setAsLiked = () => {
            this.$timeout(() => {
                this.working = false;
            }, 200)
                .then(() => {
                    const $iconWrapper = this.$element[0].querySelector('.icon-wrapper');
                    angular.element($iconWrapper).addClass('anim');
                    this.ngModelController.$setViewValue(ICONS.ON);
                })

        }
        private setAsDefault = () => {
            this.$timeout(() => {
                this.working = false;
                const $iconWrapper = this.$element[0].querySelector('.icon-wrapper');
                angular.element($iconWrapper).removeClass('anim');
                angular.element($iconWrapper).removeClass('selected');
                this.ngModelController.$setViewValue(ICONS.OFF);
            }, 100)
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
                mdOnLike: '&',
                mdOnUnlike: '&'
            }
        }
    }

    APP_MODULE.directive('mdThumbsUp', mdThumbsUp );
}