import * as angular from 'angular';

export class StyleInjector {

    static Create(key : string, name: string,  styles: string) {
        const $injector = angular.injector(['ng']);
        const $q: angular.IQService = $injector.get('$q') as angular.IQService;

        return $q((resolve : angular.IQResolveReject<any>, reject : angular.IQResolveReject<any>) => {
            const head = document.head || document.getElementsByTagName('head')[0];
            let style: HTMLStyleElement = document.querySelector(`#${key}`) as HTMLStyleElement;

            if (!!!style) {

                style = document.createElement('style') as HTMLStyleElement;
                const css = `${name} ${styles}`;
                style.type = 'text/css';
                style.id = key;
                const cssTxtNode = document.createTextNode(css);
                style.appendChild(cssTxtNode);
                head.appendChild(style);
            }


            setTimeout(() => {
                resolve(true);
            }, 5)
        });

    }

}