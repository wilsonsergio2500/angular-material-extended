import { Route } from '../../../../models/route';
import { LazyLoad } from '../../../../helpers/lazyload';
import { POST_ROUTE_RESOLVES } from './route-resolves';
import { POSTS } from './route-names';

export namespace POST_ROUTES {

    class Book extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<book-post injected="vm.Injected" />')
        constructor() {
            super();
            this.name = POSTS.NAMES.BOOK;
            this.url = '/book';
            this.resolve = POST_ROUTE_RESOLVES.GlobalInjection.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }

    }

    class Podcast extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<podcast-post injected="vm.Injected"  />')
        constructor() {
            super();
            this.name = POSTS.NAMES.PODCAST;
            this.url = '/podcast';
            this.resolve = POST_ROUTE_RESOLVES.GlobalInjection.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }
    }

    class Lecture extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<lecture-post injected="vm.Injected"  />')
        constructor() {
            super();
            this.name = POSTS.NAMES.LECTURE;
            this.url = '/lecture';
            this.resolve = POST_ROUTE_RESOLVES.GlobalInjection.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }
    }

    class Milestone extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<landmark-post injected="vm.Injected"  />');
        constructor() {
            super();
            this.name = POSTS.NAMES.MILESTONE;
            this.url = '/milestone';
            this.resolve = POST_ROUTE_RESOLVES.GlobalInjection.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }
    }

    class BlogPost extends Route {
        template = LazyLoad.getTemplate(LazyLoad.MODULES.POSTS, '<blog-post injected="vm.Injected"  />');
        constructor() {
            super();
            this.name = POSTS.NAMES.BLOG_POST;
            this.url = '/postentry';
            this.resolve = POST_ROUTE_RESOLVES.GlobalInjection.Resolve;
            this.controller = LazyLoad.getInjectedInstance('Injected');
        }
    }


    export const ROUTES: Route[] = [
        new Book(),
        new Podcast(),
        new Lecture(),
        new Milestone(),
        new BlogPost()
    ]

}