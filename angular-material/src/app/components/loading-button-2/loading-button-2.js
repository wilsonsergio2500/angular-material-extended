"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton) {
        var LoadingButton2 = (function () {
            function LoadingButton2($timeout) {
                this.$timeout = $timeout;
                this.Init();
            }
            LoadingButton2.prototype.Init = function () {
                this.LoadingText = (!!this.mdLoadingText) ? this.mdLoadingText : 'Loading..';
            };
            LoadingButton2.prototype.onClick = function () {
                if (!!this.mdOnClick) {
                    this.mdOnClick.call(this);
                }
            };
            LoadingButton2.$inject = ['$timeout'];
            return LoadingButton2;
        }());
        LoadingButton.LoadingButton2 = LoadingButton2;
        var template = require('!!raw-loader!./loading-button-2.html');
        function mdLoadingButton2() {
            return {
                controller: LoadingButton2,
                controllerAs: 'vm',
                bindToController: true,
                template: template,
                transclude: true,
                scope: {
                    mdClass: '@',
                    mdBusy: '=',
                    mdOnClick: '&',
                    mdLoadingText: '@',
                    mdDisabled: '='
                }
            };
        }
        index_1.APP_MODULE.directive('mdLoadingButton2', mdLoadingButton2);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=loading-button-2.js.map