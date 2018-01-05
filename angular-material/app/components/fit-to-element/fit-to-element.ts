import * as angular from 'angular';
import { DeBounce } from '../../helpers/debounce';
import { APP_MODULE } from '../../main/index';

import { ElementResizeDetector } from '../../custom-typings/element-resize-detector/element-resize-detector';
const ResizeDetector: any = (require('element-resize-detector') as any) ;

namespace Components {

    class FitToElementCtrl {
        container: Element;
        fitSelector: string;

        SizeDetector: ElementResizeDetector.IElementResizeDetector;
        ResizeEvent: Function;

        static $inject = ['$scope', '$window', '$element', '$timeout']
        constructor(private $scope: ng.IScope, private $window: ng.IWindowService, private $element: ng.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            this.Init();
        }
        Init() {
            this.$scope.$on('$destroy', this.OnDestroy);

            this.container = document.querySelector(this.fitSelector);
            //console.log(this.$element);
            //console.log(this.$element.children().eq(0));

            this.SizeDetector = new ResizeDetector();

            this.ResizeEvent = DeBounce(this.onResize, 250);
            this.SizeDetector.listenTo(this.container, this.ResizeEvent);

        }
        OnDestroy = ()  => {
            this.SizeDetector.removeListener(this.container, this.ResizeEvent);
        }
        onResize = () => {
            let that = this;
            that.fitToItem();
            
        }
        fitToItem = () => {
            let that = this;
            that.$element.children().eq(0).css({
                width: that.container.clientWidth + 'px',
                height: Math.round(that.container.clientHeight * 0.99) + 'px'
            });
        }
    }

    const template = require('!!raw-loader!./fit-to-element.html');

    function fitToElement(): ng.IDirective {

        return <ng.IDirective>{
            transclude: true,
            template: template,
            scope: {
                fitSelector: "@",
                transcludeClass: "@"
            },
            controller: FitToElementCtrl,
            controllerAs: 'vm',
            bindToController: true,

        }

    }

    APP_MODULE.directive('fitToElement', [fitToElement]);
}