"use strict";
var index_1 = require('../../main/index');
var Components;
(function (Components) {
    var Check;
    (function (Check) {
        var MdCheckAnimation = (function () {
            function MdCheckAnimation($timeout, $element) {
                var _this = this;
                this.$timeout = $timeout;
                this.$element = $element;
                this.Init = function () {
                    console.log(_this.$element);
                    var item = _this.$element[0];
                    _this.canvasElement = item.childNodes[0];
                    console.log(item);
                    _this.canvasElement.style.width = (_this.width || 50) + 'px';
                    _this.ref = {
                        Play: _this.Play,
                        Clear: _this.Clear
                    };
                    console.log(_this.ref.Play, _this.ref.Clear);
                    if (!!_this.playAfter) {
                        setTimeout(_this.Play, parseInt(_this.playAfter));
                    }
                };
                this.Clear = function () {
                    var ctx = _this.canvasElement.getContext('2d');
                    ctx.clearRect(0, 0, _this.canvasElement.width, _this.canvasElement.height);
                };
                this.Play = function () {
                    var color = (_this.color || 'rgba(0, 150, 0, 1)');
                    var start = 100;
                    var mid = 145;
                    var end = 250;
                    var width = 20;
                    var leftX = start;
                    var leftY = start;
                    var rightX = mid - (width / 2.7);
                    var rightY = mid + (width / 2.7);
                    var animationSpeed = (!!_this.speed) ? parseInt(_this.speed) : 5;
                    var ctx = _this.canvasElement.getContext('2d');
                    ctx.lineWidth = width;
                    ctx.strokeStyle = color;
                    for (var i = start; i < mid; i++) {
                        var drawLeft = window.setTimeout(function () {
                            ctx.beginPath();
                            ctx.moveTo(start, start);
                            ctx.lineTo(leftX, leftY);
                            ctx.stroke();
                            leftX++;
                            leftY++;
                        }, 1 + (i * animationSpeed) / 3);
                    }
                    for (var i = mid; i < end; i++) {
                        var drawRight = window.setTimeout(function () {
                            ctx.beginPath();
                            ctx.moveTo(leftX, leftY);
                            ctx.lineTo(rightX, rightY);
                            ctx.stroke();
                            rightX++;
                            rightY--;
                        }, 1 + (i * animationSpeed) / 3);
                    }
                };
                this.Init();
            }
            MdCheckAnimation.$inject = ['$timeout', '$element'];
            return MdCheckAnimation;
        }());
        var template = require('!!raw-loader!./check-animation.html');
        function mdCheckAnimation() {
            return {
                controller: MdCheckAnimation,
                template: template,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    ref: '=',
                    width: '@',
                    color: '@',
                    speed: '@',
                    playAfter: '@'
                }
            };
        }
        index_1.APP_MODULE.directive('mdCheckAnimation', mdCheckAnimation);
    })(Check = Components.Check || (Components.Check = {}));
})(Components || (Components = {}));
//# sourceMappingURL=check-animation.js.map