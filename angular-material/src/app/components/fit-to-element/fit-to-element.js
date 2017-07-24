"use strict";
var debounce_1 = require('../../helpers/debounce');
var index_1 = require('../../main/index');
var ResizeDetector = require('element-resize-detector');
var Components;
(function (Components) {
    var FitToElementCtrl = (function () {
        function FitToElementCtrl($scope, $window, $element, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$window = $window;
            this.$element = $element;
            this.$timeout = $timeout;
            this.onResize = function () {
                var that = _this;
                that.fitToItem();
            };
            this.fitToItem = function () {
                var that = _this;
                that.$element.children().eq(0).css({
                    width: that.container.clientWidth + 'px',
                    height: Math.round(that.container.clientHeight * 0.99) + 'px'
                });
            };
            this.Init();
        }
        FitToElementCtrl.prototype.Init = function () {
            this.$scope.$on('$destroy', this.OnDestroy);
            this.container = document.querySelector(this.fitSelector);
            console.log(this.$element);
            console.log(this.$element.children().eq(0));
            this.SizeDetector = new ResizeDetector();
            this.ResizeEvent = debounce_1.DeBounce(this.onResize, 250);
            this.SizeDetector.listenTo(this.container, this.ResizeEvent);
        };
        FitToElementCtrl.prototype.OnDestroy = function () {
            this.SizeDetector.removeListener(this.container, this.ResizeEvent);
        };
        FitToElementCtrl.$inject = ['$scope', '$window', '$element', '$timeout'];
        return FitToElementCtrl;
    }());
    var template = require('!!raw-loader!./fit-to-element.html');
    function fitToElement() {
        return {
            transclude: true,
            template: template,
            scope: {
                fitSelector: "@"
            },
            controller: FitToElementCtrl,
            controllerAs: 'vm',
            bindToController: true,
        };
    }
    index_1.APP_MODULE.directive('fitToElement', [fitToElement]);
})(Components || (Components = {}));
//# sourceMappingURL=fit-to-element.js.map