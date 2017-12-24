
import { Route } from '../../../../models/route';
import { LazyLoad } from '../../../../helpers/lazyload';

export namespace ADMIN_ROUTES {

    class Invite extends Route {
        template = LazyLoad.CONTAINER_ONLY;
        constructor() {
            super();
            this.name = 'invite';
            this.url = '/invite';
            this.children = [
                new INVITE_CHILDREN.New()
            ]
        }
    }

    namespace INVITE_CHILDREN {

        export class New extends Route {
            template = LazyLoad.getTemplate(LazyLoad.MODULES.ADMIN, '<admin-new-invite/>');
            constructor() {
                super();
                this.name = 'new';
                this.url = '/new';

            }
        }

    }

    export const ROUTES: Route[] = [
        new Invite()
    ]

    export const NAMES = {
        NEW: 'new',
    }
   
}