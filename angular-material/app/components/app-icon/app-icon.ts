
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

namespace Components.AppIcon {

    class AppIconCtl {

        color: string;
        width: string;

        static $inject = ['$element', '$templateCache']
        constructor(private $element: angular.IAugmentedJQuery, private $templateCache: angular.ITemplateCacheService) {
            this.Init();
        }
        Init = () => {
            const element = this.$element[0];

            const template = this.$templateCache.get('app-icon.html');
            angular.element(element).html(template as string);

            const svg = element.querySelector('svg') as any as HTMLObjectElement;
            svg.style.display = '';

            svg.setAttribute('width', parseInt(this.width) + 'px');
            svg.setAttribute('height', parseInt(this.width) + 'px');

            const paths = svg.querySelectorAll('path');
            angular.element(paths).attr('fill', this.color);
            const circles = svg.querySelectorAll('circle');
            angular.element(circles).attr('fill', this.color);
            
        }
    }


    function appIcon() {
        return <angular.IDirective>{
            controllerAs: 'vm',
            bindToController: true,
            controller: AppIconCtl,
            scope: {
                color: '@',
                width: '@'

            }
        }
    }

    APP_MODULE.directive('appIcon', appIcon);
}
