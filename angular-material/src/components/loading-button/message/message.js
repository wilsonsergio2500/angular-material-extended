"use strict";
var index_1 = require('../../../main/index');
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton) {
        var Message = (function () {
            function Message($scope, $timeout) {
                this.onDestroy = function () {
                };
            }
            Message.$inject = ['$scope', '$timeout'];
            return Message;
        }());
        function mdMessage() {
            return {
                transclude: true,
                template: '<span ng-show="!$parent.vm.mdBusy"><ng-transclude></ng-transclude></span>',
                restrict: 'E',
                controller: Message,
                bindToController: true,
                scope: false,
                require: '^mdLoadingButton',
            };
        }
        LoadingButton.mdMessage = mdMessage;
        index_1.APP_MODULE.directive("mdMessage", mdMessage);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=message.js.map