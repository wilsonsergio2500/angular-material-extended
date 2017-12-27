import { Route } from '../../../../models/route';
import { LazyLoad } from '../../../../helpers/lazyload';

export namespace POST_ROUTES {

    class Book extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<book-post />')
        constructor() {
            super();
            this.name = 'book';
            this.url = '/book';
        }

    }

    export const ROUTES: Route[] = [
        new Book()
    ]

}