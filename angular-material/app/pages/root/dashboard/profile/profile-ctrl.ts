
import { DASHBOARD } from '../route-names';

export class ProfileCtrl {
    static $inject = ['Injected', '$state', '$stateParams']
    selectedTabIndex: number;
    constructor(private Injected: any, private $state: angular.ui.IStateService, private $stateParams: any) {
        this.Init();
    }
    Init = () => {
        this.selectedTabIndex = 0;
        this.setView();
    }
    setView = () => {

        const userId: string = this.$stateParams.Id;
        const categoryId: string = this.Injected.categoryTabs[this.selectedTabIndex].id;
        console.log(userId, categoryId);

        this.$state.go(DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW, { userId, categoryId });
    }
}