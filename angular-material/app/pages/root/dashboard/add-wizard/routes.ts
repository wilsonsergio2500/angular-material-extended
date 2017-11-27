
import { Route, IRoute } from '../../../../models/route';
import { WIZARD_ADD } from './route-names';

import { TitleCtrl } from './children/title/wizard-title';

 namespace WizardAddChildrenRoutes {

    export class TitleRoute extends Route {
        template = require('!!raw-loader!./children/title/wizard-title.html');
        
        constructor() {
            super();
            this.name = WIZARD_ADD.NAMES.TITLE;
            this.controller = TitleCtrl;

        }
    }

}

export const WizardRoutes = [
    new WizardAddChildrenRoutes.TitleRoute()
]