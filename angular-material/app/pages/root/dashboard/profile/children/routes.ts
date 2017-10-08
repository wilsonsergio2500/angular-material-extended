
import { Route } from '../../../../../models/route';
import { DASHBOARD } from '../../route-names';
import { ProfileItemViewCtrl } from './profile-item-views/profile-item-views-ctrl'

namespace ProfileChildrenRoutes {

    export class ProfileCategoryTileViewRoute extends Route{
        template = require('!!raw-loader!./profile-item-views/profile-item-view.html');
        constructor() {
            super();
            this.name = DASHBOARD.NAMES.PROFILE.VIEWS.CATEGORY_TILE_VIEW;
            this.controller = ProfileItemViewCtrl;
            this.params = {
                userId: null,
                categoryId: null
            }
        }
    }

}

export const ProfileRoutes = [
    new ProfileChildrenRoutes.ProfileCategoryTileViewRoute()
]