/// <reference path="../../../main/index.ts" />
"use strict";
var index_1 = require('../../../main/index');
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton) {
        function mdMessage() {
            return {
                transclude: true,
                template: '<span ng-show="!!vm.mdBusy"><ng-transclude></ng-transclude></span>',
                restrict: 'E',
                scope: false,
                controllerAs: 'vm',
            };
        }
        LoadingButton.mdMessage = mdMessage;
        index_1.APP_MODULE.directive("mdMessage", mdMessage);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=message.js.map