"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var Component;
(function (Component) {
    var mdChipItems;
    (function (mdChipItems_1) {
        /**
    usage:
        <md-chip-items ng-model="vm.chipItems" md-placeholder="Categories" md-options="vm.ChipModels" md-promise="vm.getQuery($query)"
                               md-display-field="name" required>
                </md-chip-items>
     **/
        var MdChipItemCtrl = (function () {
            function MdChipItemCtrl($element, $timeout, $q) {
                var _this = this;
                this.$element = $element;
                this.$timeout = $timeout;
                this.$q = $q;
                this.Init = function () {
                    _this.setQuery();
                    if (!!!_this.ngModel) {
                        _this.ngModel = [];
                    }
                    _this.$timeout(_this.setEvents, 100);
                    _this.$timeout(_this.InitViewValue, 100);
                    _this.$timeout(_this.onItemsChange, 150);
                };
                this.InitViewValue = function () {
                    _this.ngModelController.$setViewValue(_this.ngModel);
                };
                this.onItemsChange = function () {
                    var IsValid = _this.ngModel.length > 0;
                    _this.ngModelController.$setValidity('empty', IsValid);
                };
                this.setQuery = function () {
                    if (!!_this.mdOptions && _this.mdOptions.length > 0) {
                        _this.Query = _this.queryst;
                    }
                    else {
                        _this.Query = _this.debouncedQuery;
                    }
                };
                this.setEvents = function () {
                    var mdChips = _this.$element[0].querySelector('md-chips');
                    console.log(angular.element(mdChips).data().$mdChipsController);
                    angular.element(mdChips).data().$mdChipsController.onAdd = _this.onItemsChange;
                    angular.element(mdChips).data().$mdChipsController.onRemove = _this.onItemsChange;
                    angular.element(mdChips).data().$mdChipsController.useOnAddExpression();
                    angular.element(mdChips).data().$mdChipsController.useOnRemoveExpression();
                    var Input = mdChips.querySelector('input');
                    angular.element(Input).on('blur', _this.$inputBlurEvent);
                };
                this.$inputBlurEvent = function () {
                    _this.$timeout(function () {
                        _this.ngModelController.$setTouched();
                    }, 50);
                };
                this.last = 0;
                this.pending = null;
                this.cancel = angular.noop;
                this.clearDebounce = function () {
                    _this.last = 0;
                    _this.pending = null;
                    _this.cancel = angular.noop;
                };
                this.debounce = function () {
                    var now = new Date().getMilliseconds();
                    _this.last = _this.last || now;
                    return ((now - _this.last) < 350);
                };
                this.debouncedQuery = function (query) {
                    var IsDebounced = _this.debounce();
                    if (!_this.pending || !IsDebounced) {
                        _this.cancel();
                        _this.pending = _this.$q(function (resolve, reject) {
                            _this.cancel = reject;
                            _this.mdPromise.call(_this, { $query: query }).then(resolve).catch(reject).then(_this.clearDebounce);
                        });
                        return _this.pending;
                    }
                    return _this.pending;
                };
                this.queryst = function (query) {
                    return (!!query && !!_this.mdDisplayField) ? _this.mdOptions.filter(function (g) { return _this.Filter(g[_this.mdDisplayField]); }) : [];
                };
                this.Filter = function (query) {
                    var queryString = angular.lowercase(query);
                    return function (name) {
                        return (name.toLowerCase().indexOf(queryString) != -1);
                    };
                };
                this.ngModelController = this.$element.controller('ngModel');
                $timeout(this.Init, 20);
            }
            MdChipItemCtrl.$inject = ['$element', '$timeout', '$q'];
            return MdChipItemCtrl;
        }());
        mdChipItems_1.MdChipItemCtrl = MdChipItemCtrl;
        var template = require('!!raw-loader!./md-chip-items.html');
        function mdChipItems() {
            return {
                bindToController: true,
                controller: MdChipItemCtrl,
                template: template,
                controllerAs: 'vm',
                require: 'ngModel',
                scope: {
                    ngModel: '=',
                    mdPlaceholder: '@',
                    mdDisplayField: '@',
                    mdOptions: '=',
                    mdPromise: '&'
                }
            };
        }
        index_1.APP_MODULE.directive('mdChipItems', mdChipItems);
    })(mdChipItems = Component.mdChipItems || (Component.mdChipItems = {}));
})(Component || (Component = {}));
//# sourceMappingURL=md-chip-items.js.map