"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var Animate;
    (function (Animate) {
        /*
         usage:
        <md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000"></md-animate>
        */
        var AnimateCtrl = (function () {
            function AnimateCtrl($timeout) {
                var _this = this;
                this.$timeout = $timeout;
                this.Init = function () {
                    _this.IsLoad = false;
                    var delay = parseInt(_this.mdDelay);
                    _this.$timeout(function () {
                        _this.IsLoad = true;
                    }, delay);
                };
                this.Init();
            }
            AnimateCtrl.$inject = ['$timeout'];
            return AnimateCtrl;
        }());
        var template = require('!!raw-loader!./animate.html');
        function mdAnimate() {
            return {
                template: template,
                bindToController: true,
                controllerAs: 'vm',
                controller: AnimateCtrl,
                transclude: true,
                replace: true,
                scope: {
                    mdAnimateClass: '@',
                    mdDelay: '@',
                    mdTranscludeClass: '@'
                }
            };
        }
        index_1.APP_MODULE.directive('mdAnimate', mdAnimate);
    })(Animate = Components.Animate || (Components.Animate = {}));
})(Components || (Components = {}));
//# sourceMappingURL=animate.js.map