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

    class Podcast extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<podcast-post />')
        constructor() {
            super();
            this.name = 'podcast';
            this.url = '/podcast';
        }
    }

    class Lecture extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<lecture-post />')
        constructor() {
            super();
            this.name = 'lecture';
            this.url = '/lecture';
        }
    }

    export const ROUTES: Route[] = [
        new Book(),
        new Podcast(),
        new Lecture()
    ]

}