"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var angularwatch_1 = require('../../helpers/angularwatch');
var Components;
(function (Components) {
    var ThumbsUp;
    (function (ThumbsUp) {
        var ICONS;
        (function (ICONS) {
            ICONS[ICONS["TRANS"] = -1] = "TRANS";
            ICONS[ICONS["OFF"] = 0] = "OFF";
            ICONS[ICONS["ON"] = 1] = "ON";
        })(ICONS || (ICONS = {}));
        /**
         * Usage:
            <md-thumbs-up ng-model="vm.value"  md-on-like="vm.thumbsUpLike(123)" md-on-unlike="vm.thumbUpUnlike(1234)"></md-thumbs-up>
         */
        var ThumbsUpCtrl = (function () {
            function ThumbsUpCtrl($scope, $element, $timeout) {
                var _this = this;
                this.$scope = $scope;
                this.$element = $element;
                this.$timeout = $timeout;
                this.onColor = 'rgb(33,150,243)';
                this.Init = function () {
                    _this.ngModelController = _this.$element.controller('ngModel');
                    _this.working = false;
                    var modelValue = !!_this.ngModel;
                    _this.type = modelValue ? ICONS.ON : ICONS.OFF;
                    _this.ngModelController.$setViewValue(_this.type);
                    setTimeout(_this.setStyle, 100);
                    _this.AngularWatcher = new angularwatch_1.AngularWatch();
                    _this.AngularWatcher.Subscribe(_this.$scope, function () { return _this.ngModelController.$viewValue; }, function (newv, oldv) {
                        if (newv != oldv) {
                            _this.setStyle();
                        }
                    });
                    _this.$scope.$on('$destroy', _this.$onDestroy);
                };
                this.setStyle = function () {
                    var $iconWrapper = _this.$element[0].querySelector('.icon-wrapper');
                    var $value = _this.ngModelController.$viewValue;
                    if ($value == ICONS.ON) {
                        angular.element($iconWrapper).addClass('selected');
                    }
                };
                this.changeState = function () {
                    var $iconWrapper = _this.$element[0].querySelector('.icon-wrapper');
                    var $value = _this.ngModelController.$viewValue;
                    console.log($value);
                    if ($value == ICONS.OFF) {
                        _this.executeLike();
                    }
                    if ($value == ICONS.ON) {
                        _this.executeUnlike();
                    }
                };
                this.executeLike = function () {
                    _this.working = true;
                    if (!!_this.mdOnLike) {
                        _this.mdOnLike().then(function (response) {
                            _this.setAsLiked();
                        });
                    }
                };
                this.executeUnlike = function () {
                    _this.working = true;
                    if (!!_this.mdOnUnlike) {
                        _this.mdOnUnlike().then(function (response) {
                            _this.setAsDefault();
                        });
                    }
                };
                this.setAsLiked = function () {
                    _this.$timeout(function () {
                        _this.working = false;
                    }, 200)
                        .then(function () {
                        var $iconWrapper = _this.$element[0].querySelector('.icon-wrapper');
                        angular.element($iconWrapper).addClass('anim');
                        _this.ngModelController.$setViewValue(ICONS.ON);
                    });
                };
                this.setAsDefault = function () {
                    _this.$timeout(function () {
                        _this.working = false;
                        var $iconWrapper = _this.$element[0].querySelector('.icon-wrapper');
                        angular.element($iconWrapper).removeClass('anim');
                        angular.element($iconWrapper).removeClass('selected');
                        _this.ngModelController.$setViewValue(ICONS.OFF);
                    }, 100);
                };
                this.$onDestroy = function () {
                    _this.AngularWatcher.Unsubscribe();
                };
                this.Init();
            }
            ThumbsUpCtrl.$inject = ['$scope', '$element', '$timeout'];
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
                    mdOnLike: '&',
                    mdOnUnlike: '&'
                }
            };
        }
        index_1.APP_MODULE.directive('mdThumbsUp', mdThumbsUp);
    })(ThumbsUp = Components.ThumbsUp || (Components.ThumbsUp = {}));
})(Components || (Components = {}));
//# sourceMappingURL=thumbs-up.js.map