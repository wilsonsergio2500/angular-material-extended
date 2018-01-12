
import { Route } from '../../../../models/route';
import { LazyLoad } from '../../../../helpers/lazyload';

export namespace ADMIN_ROUTES {

    export const NAMES = {
        NEW_INVITE: 'newinvite',
        NEW_CATEGORY: 'newcategory'
    }

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

    class Category extends Route {
        template = LazyLoad.CONTAINER_ONLY;
        constructor() {
            super();
            this.name = 'category';
            this.url = '/category';
            this.children = [
                new CATEGORY_CHILDREN.New()
            ];
        }
    }

     class ManageUsers extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.ADMIN, '<manage-users />');
        constructor() {
            super();
            this.name = 'manageusers';
            this.url = '/manageusers';
        }
       
    }


    namespace INVITE_CHILDREN {

        export class New extends Route {
            template = LazyLoad.getTemplate(LazyLoad.MODULES.ADMIN, '<admin-new-invite/>');
            constructor() {
                super();
                this.name = NAMES.NEW_INVITE;
                this.url = '/new';

            }
        }

    }

    namespace CATEGORY_CHILDREN {
        export class New extends Route {
            template = LazyLoad.getTemplate(LazyLoad.MODULES.ADMIN, '<admin-new-category/>');
            constructor() {
                super();
                this.name = NAMES.NEW_CATEGORY;
                this.url = '/new';
            }
        }
    }

    export const ROUTES: Route[] = [
        new Invite(),
        new Category(),
        new ManageUsers()
    ]

    
   
}