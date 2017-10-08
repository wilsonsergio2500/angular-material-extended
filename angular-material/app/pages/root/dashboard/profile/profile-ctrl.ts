
import { DASHBOARD } from '../route-names';
import { AngularWatch } from '../../../../helpers/angularwatch'

export class ProfileCtrl {
    static $inject = ['$scope', 'Injected', '$state', '$stateParams']
    selectedTabIndex: number;

    $watcher: AngularWatch;
    constructor(private $scope: angular.IScope, private Injected: any, private $state: angular.ui.IStateService, private $stateParams: any) {
        this.Init();
    }
    Init = () => {
        this.selectedTabIndex = 0;
        this.setView();

        this.$watcher = new AngularWatch();
        this.$watcher.Subscribe(this.$scope, () => this.selectedTabIndex, (n, o) => {

            this.setView();
        })
        this.$scope.$on('$destroy', this.$onDestroy);
    }
    setView = () => {

        const userId: string = this.$stateParams.Id;
        const categoryId: string = this.Injected.categoryTabs[this.selectedTabIndex].id;
        console.log(userId, categoryId);

        this.$state.go(DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW, { userId, categoryId });
    }
    $onDestroy = () => {

        this.$watcher.Unsubscribe();
       
    }
}