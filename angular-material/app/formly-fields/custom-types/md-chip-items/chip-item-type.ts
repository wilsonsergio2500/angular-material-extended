
import * as formly from 'AngularFormly';

export class mdChipItemType {

    constructor(private formlyConfigProvider: formly.IFormlyConfig) {
        this.setType();
    }
    private template = require('!!raw-loader!./chip-item-type.html');
    private setType() {
        const formlyOptions: formly.ITypeOptions = <formly.ITypeOptions>{
            template: this.template,
            name: 'chipItem',
            wrapper: ['messages', 'inputContainer'],
            defaultOptions: {
                templateOptions: {
                    disabled: false
                },
                ngModelAttrs: {
                    disabled: {
                        bound: 'ng-disabled'
                    },
                   
                }
            }
        }

        this.formlyConfigProvider.setType(formlyOptions);
    }
}