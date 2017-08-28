
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

namespace Component.mdChipItems{


    export class MdChipItemCtrl {
        mdPlaceholder: string;
        Query: (searchText: string) => angular.IPromise<any[]> | any[] ;
        mdDisplayField: string;
        ngModel: any[];
        mdOptions: any[];

        mdPromise: (searchText: string) => angular.IPromise<any[]>;
        ngModelController: angular.INgModelController;
        static  $inject = ['$element', '$timeout', '$q']
        constructor(private $element: angular.IAugmentedJQuery, private $timeout: angular.ITimeoutService, private $q: ng.IQService) {

            this.ngModelController = this.$element.controller('ngModel');
            $timeout(this.Init, 20);

            

        }
        Init = () => {
           
            this.setQuery();
            
            if (!!!this.ngModel) {
                this.ngModel = [];
            }
            this.$timeout(this.setEvents, 100);
            this.$timeout(this.InitViewValue, 100);
            this.$timeout(this.onItemsChange, 150);
        }
        InitViewValue = () => {
            this.ngModelController.$setViewValue(this.ngModel);
        }

        onItemsChange = () => {
            
            const IsValid = this.ngModel.length > 0;
            this.ngModelController.$setValidity('empty', IsValid);
        }

        setQuery = () => {
            if (!!this.mdPromise) {
                console.log(this.mdPromise);
                this.Query = this.debouncedQuery;
            }
            else {
                this.Query = this.queryst;
            }
        }

        setEvents = () => {
            const mdChips = this.$element[0].querySelector('md-chips');
            console.log(angular.element(mdChips).data().$mdChipsController);
            angular.element(mdChips).data().$mdChipsController.onAdd = this.onItemsChange;
            angular.element(mdChips).data().$mdChipsController.onRemove = this.onItemsChange;
            angular.element(mdChips).data().$mdChipsController.useOnAddExpression();
            angular.element(mdChips).data().$mdChipsController.useOnRemoveExpression();
        }

        private last = 0;
        private pending: any = null;
        private cancel : () => void = angular.noop
        private clearDebounce = () => {
            this.last = 0;
            this.pending = null;
            this.cancel = angular.noop;
        }
        private debounce = () => {
            let now = new Date().getMilliseconds();
            this.last = this.last || now;
            return ((now - this.last) < 300)

        }
        private debouncedQuery = (query: string) => {
            const IsDebounced = this.debounce();
            
            if (!this.pending || !IsDebounced) {
                this.cancel();

                this.pending = this.$q((resolve : angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {

                    this.cancel = reject;

                    this.mdPromise(query).then(resolve).catch(reject).then(this.clearDebounce);

                });
                return this.pending;

            }

            return this.pending;
        }

        private queryst = (query: string) => {
            return (!!query && !!this.mdDisplayField) ? this.mdOptions.filter(g => this.Filter(g[this.mdDisplayField])) : [];
        }
        private Filter = (query: string) => {
            const queryString = angular.lowercase(query)

            return (name: string) => {
                return (name.toLowerCase().indexOf(queryString) != -1)
            }
        }

    }

    const template = require('!!raw-loader!./md-chip-items.html');
    function mdChipItems(){
        return <angular.IDirective>{
            bindToController: true,
            controller: MdChipItemCtrl,
            template: template,
            controllerAs: 'vm',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                mdPlaceholder: '@',
                mdDisplayField: '@',
                mdIdField: '@',
                mdOptions: '=',
                mdPromise: '='
            }
        }
    }

    APP_MODULE.directive('mdChipItems', mdChipItems);

}