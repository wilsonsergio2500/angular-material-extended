

import { Route } from '../../../models/route';
import { LazyLoad } from '../../../helpers/lazyload';
import { PUBLIC_ROUTE_RESOLVES } from './route-resolves'

export namespace PUBLIC_ROUTES {

    class Complete extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.PUBLIC, '<complete-profile invite="vm.Injected" />');
        constructor() {
            super();
            this.name = 'complete';
            this.url = '/complete/{Id}';
            this.resolve = PUBLIC_ROUTE_RESOLVES.InviteComplete.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }
    }


    export const ROUTES: Route[] = [
        new Complete()
    ];
}