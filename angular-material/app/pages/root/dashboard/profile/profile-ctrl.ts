
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

        const path = `${DASHBOARD.NAMES.PROFILE.VIEWS.MAIN}.${DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW}`;
        const userId: string = this.$stateParams.Id;
        const categoryId: string = this.Injected.categoryTabs[this.selectedTabIndex].id;
        console.log(userId, categoryId);

        this.$state.go(path, { userId, categoryId });
    }
}