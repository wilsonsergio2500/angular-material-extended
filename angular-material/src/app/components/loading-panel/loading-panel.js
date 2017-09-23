"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var LoadingPanel;
    (function (LoadingPanel_1) {
        var LoadingPanel = (function () {
            function LoadingPanel() {
                var _this = this;
                this.Init = function () {
                    _this.ds = (!!_this.mdSize) ? parseInt(_this.mdSize) : 50;
                };
                this.Init();
            }
            return LoadingPanel;
        }());
        var template = require('!!raw-loader!./loading-panel.html');
        function mdLoadingPanel() {
            return {
                template: template,
                controllerAs: 'vm',
                bindToController: true,
                controller: LoadingPanel,
                transclude: true,
                scope: {
                    mdShow: "=",
                    mdSize: "="
                }
            };
        }
        index_1.APP_MODULE.directive('mdLoadingPanel', mdLoadingPanel);
    })(LoadingPanel = Components.LoadingPanel || (Components.LoadingPanel = {}));
})(Components || (Components = {}));
//# sourceMappingURL=loading-panel.js.map