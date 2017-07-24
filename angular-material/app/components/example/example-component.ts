


import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

const template = require('!!raw-loader!./example-component.html');

namespace Components {

    interface IExample {
        message: string;
    }

    class Example implements IExample  {
        message: string;
        constructor() {
            console.log('component constructor');
        }

    }


    export function ExampleDirective(): angular.IDirective {

        return <angular.IDirective>{
            template: template,
            controller: Example,
            controllerAs: 'vm',
            scope: {
                message: "@"
            },
            bindToController: true
        }

    }

    APP_MODULE.directive('exampleComponent', [ExampleDirective]);
}
