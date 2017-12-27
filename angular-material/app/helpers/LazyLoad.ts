

export namespace LazyLoad {

    export const MODULES = {
        ADMIN: 'src/lazy-modules/admin/bundle.js',
        PUBLIC: 'src/lazy-modules/public/bundle.js',
        POSTS: 'src/lazy-modules/posts/bundle.js'
    };

    export const getTemplate = (module: string, template: string): string => {

        return `<div flex layout="column" flex>
                  <div class="layout-column flex" oc-lazy-load="['${module}']">
                          ${template} 
                   </div>
                </div>`;
    }

  

    //export const CONTAINER_ONLY = `
    //                        <div layout="column" flex>
    //                            <div ui-view layout="column" flex></div> 
    //                        </div>`;
    export const CONTAINER_ONLY = `<div layout="column" flex  ui-view />`;

  
    export const getInjectedInstance = (Injected: string) => {

        class InjectionInstance {
            static $inject = [Injected]
            constructor(private Injected : any) {
            }
        }

        return InjectionInstance;
    }
}