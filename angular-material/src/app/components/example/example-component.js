"use strict";
var index_1 = require('../../main/index');
var template = require('!!raw-loader!./example-component.html');
var Components;
(function (Components) {
    var Example = (function () {
        function Example() {
            console.log('component constructor');
        }
        return Example;
    }());
    function ExampleDirective() {
        return {
            template: template,
            controller: Example,
            controllerAs: 'vm',
            scope: {
                message: "@"
            },
            bindToController: true
        };
    }
    Components.ExampleDirective = ExampleDirective;
    index_1.APP_MODULE.directive('exampleComponent', [ExampleDirective]);
})(Components || (Components = {}));
//# sourceMappingURL=example-component.js.map