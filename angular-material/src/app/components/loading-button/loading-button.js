"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton_1) {
        var LoadingButton = (function () {
            function LoadingButton($element) {
                this.$element = $element;
                console.log(this.mdClass);
                console.log(this.mdBusy);
            }
            LoadingButton.$inject = ['$element'];
            return LoadingButton;
        }());
        var template = require('!!raw-loader!./loading-button.html');
        function mdLoadingButton() {
            return {
                transclude: true,
                controller: LoadingButton,
                template: template,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    mdClass: '@',
                    mdBusy: '='
                }
            };
        }
        index_1.APP_MODULE.directive("mdLoadingButton", mdLoadingButton);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=loading-button.js.map