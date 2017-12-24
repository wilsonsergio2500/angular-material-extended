

export namespace LazyLoad {

    export const MODULES = {
        ADMIN: 'src/lazy-modules/admin/bundle.js',
    };

    export const getTemplate = (module: string, template: string): string => {

        return `<div flex layout="column">
                  <div oc-lazy-load="['${module}']">
                          ${template} 
                   </div>
                </div>`;
    }

  

    //export const CONTAINER_ONLY = `
    //                        <div layout="column" flex>
    //                            <div ui-view layout="column" flex></div> 
    //                        </div>`;
    export const CONTAINER_ONLY = `<div layout="column" flex  ui-view />`;

  

}