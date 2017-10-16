"use strict";
var index_1 = require('../../../main/index');
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton) {
        var LoadingMessage = (function () {
            function LoadingMessage($scope, $timeout) {
            }
            LoadingMessage.$inject = ['$scope', '$timeout'];
            return LoadingMessage;
        }());
        var template = require('!!raw-loader!./loading-message.html');
        function mdLoadingMessage() {
            return {
                transclude: true,
                template: template,
                restrict: 'E',
                controller: LoadingMessage,
                require: '^mdLoadingButton',
                bindToController: true,
                scope: false
            };
        }
        index_1.APP_MODULE.directive('mdLoadingMessage', mdLoadingMessage);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=loading-message.js.map