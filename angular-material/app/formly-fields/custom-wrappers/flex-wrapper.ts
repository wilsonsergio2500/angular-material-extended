import * as formly from 'AngularFormly';

export class FlexWrapper {
    private template = require('!!raw-loader!./flex-wrapper.html');
    constructor(private formlyConfigProvider: formly.IFormlyConfig) {
        this.setWrapper();
    }
    private setWrapper() {
        this.formlyConfigProvider.setWrapper(<formly.IWrapperOptions>{
            name: 'flex',
            
            template: this.template,
            
        });
    }
}