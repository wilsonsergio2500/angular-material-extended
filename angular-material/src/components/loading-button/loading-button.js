"use strict";
var index_1 = require('../../main/index');
/*
usage:
     <md-loading-button type="button" md-class="md-raised md-primary" md-busy="vm.working" md-on-click="vm.onClick()" md-disabled="vm.disableButton">
        <md-message>
            my button
        </md-message>
        <md-loading-message>
            Loading..
        </md-loading-message>
    </md-loading-button>
*/
var Components;
(function (Components) {
    var LoadingButton;
    (function (LoadingButton_1) {
        var LoadingButton = (function () {
            function LoadingButton($element) {
                var _this = this;
                this.$element = $element;
                this.Init = function () {
                    var buttone = _this.$element.children('button')[0];
                    buttone.removeAttribute('type');
                    _this.btnType = (!!_this.type) ? _this.type : 'button';
                    buttone.setAttribute('type', _this.btnType);
                    _this.IsDisabled = (!!_this.mdDisabled);
                };
                this.Click = function () {
                    _this.mdOnClick.call(_this);
                };
                this.Init();
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
                    mdBusy: '=',
                    mdOnClick: '&',
                    mdDisabled: '=',
                    type: '@'
                }
            };
        }
        index_1.APP_MODULE.directive("mdLoadingButton", mdLoadingButton);
    })(LoadingButton = Components.LoadingButton || (Components.LoadingButton = {}));
})(Components || (Components = {}));
//# sourceMappingURL=loading-button.js.map