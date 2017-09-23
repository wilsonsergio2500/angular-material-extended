"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var ThumbsUp;
    (function (ThumbsUp) {
        var ICONS;
        (function (ICONS) {
            ICONS[ICONS["TRANS"] = -1] = "TRANS";
            ICONS[ICONS["ON"] = 0] = "ON";
            ICONS[ICONS["OFF"] = 1] = "OFF";
        })(ICONS || (ICONS = {}));
        var ThumbsUpCtrl = (function () {
            function ThumbsUpCtrl($element, $timeout) {
                var _this = this;
                this.$element = $element;
                this.$timeout = $timeout;
                this.onColor = 'rgb(33,150,243)';
                this.Init = function () {
                    _this.ngModelController = _this.$element.controller('ngModel');
                    var modelValue = !!_this.ngModel;
                    _this.type = modelValue ? ICONS.ON : ICONS.OFF;
                    console.log(_this.type);
                    setTimeout(_this.Style, 100);
                };
                this.Style = function () {
                    var size = (!!_this.fontSize) ? parseInt(_this.fontSize) + 'px' : '';
                    _this.$element[0].style.width = size;
                    var elementOn = _this.$element[0].querySelector(".tmup-" + ICONS.ON);
                    var elementOff = _this.$element[0].querySelector(".tmup-" + ICONS.OFF);
                    console.log(elementOn, elementOn);
                    elementOn.style.color = _this.onColor;
                    elementOn.style.cursor = 'pointer';
                    elementOn.style.fontSize = size;
                    elementOff.style.fontSize = size;
                    console.log(_this.fontSize);
                };
                this.setStatus = function (value) {
                    _this.type = ICONS.TRANS;
                    var model = !value;
                    _this.$timeout(function () {
                        _this.type = value;
                        _this.ngModelController.$setViewValue(model);
                    }, 600);
                };
                this.Init();
            }
            ThumbsUpCtrl.$inject = ['$element', '$timeout'];
            return ThumbsUpCtrl;
        }());
        var template = require('!!raw-loader!./thumbs-up.html');
        function mdThumbsUp() {
            return {
                controller: ThumbsUpCtrl,
                template: template,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    ngModel: '=',
                    fontSize: '@'
                }
            };
        }
        index_1.APP_MODULE.directive('mdThumbsUp', mdThumbsUp);
    })(ThumbsUp = Components.ThumbsUp || (Components.ThumbsUp = {}));
})(Components || (Components = {}));
//# sourceMappingURL=thumbs-up.js.map