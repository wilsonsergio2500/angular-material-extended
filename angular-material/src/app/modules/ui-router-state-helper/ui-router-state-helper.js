"use strict";
var angular = require('angular');
require('angular-route');
var StateProvider = (function () {
    function StateProvider($stateProvider) {
        var _this = this;
        this.$stateProvider = $stateProvider;
        this.$get = angular.noop;
        this.state = function (state, opts) {
            var options = {
                keepOriginalNames: true,
                siblingTraversal: false
            };
            if (!options.keepOriginalNames) {
                _this.fixStateName(state);
            }
            _this.$stateProvider.state(state);
            var that = _this;
            if (state.children && state.children.length) {
                state.children.forEach(function (childState) {
                    childState.parent = state;
                    that.state(childState, options);
                });
                if (options.siblingTraversal) {
                    _this.addSiblings(state);
                }
            }
            return _this;
        };
        this.fixStateName = function (state) {
            if (state.parent) {
                state.name = (angular.isObject(state.parent) ? state.parent.name : state.parent) + '.' + state.name;
                console.log(state.name);
            }
        };
        this.addSiblings = function (state) {
            state.children.forEach(function (childState, idx, array) {
                if (array[idx + 1]) {
                    childState.nextSibling = array[idx + 1].name;
                }
                if (array[idx - 1]) {
                    childState.previousSibling = array[idx - 1].name;
                }
            });
        };
    }
    StateProvider.$inject = ['$stateProvider'];
    return StateProvider;
}());
angular.module('ui.router.stateHelper', ['ui.router']).provider('$stateHelper', StateProvider);
//# sourceMappingURL=ui-router-state-helper.js.map