import * as angular from 'angular';

export class StyleInjector {

    static Create(name: string, styles: string) {
        const $injector = angular.injector(['ng']);
        const $q: angular.IQService = $injector.get('$q') as angular.IQService;

        return $q((resolve : angular.IQResolveReject<any>, reject : angular.IQResolveReject<any>) => {
            const head = document.head || document.getElementsByTagName('head')[0];
            let style: HTMLStyleElement = document.createElement('style');

            const css = `${name} ${styles}`;
            style.type = 'text/css';
           
            

            const cssTxtNode = document.createTextNode(css);
            style.appendChild(cssTxtNode);

            head.appendChild(style);

            setTimeout(() => {
                resolve(true);
            }, 5)
        });

    }

}