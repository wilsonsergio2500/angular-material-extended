
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
                defaultValue: [],
                ngModelAttrs: {
                    placeholder: {
                        attribute: 'placeholder'
                    },
                    secondaryPlaceholder: {
                        attribute: 'secondary-placeholder'
                    },
                    deleteButtonLabel: {
                        attribute: 'delete-button-label'
                    },
                    deleteHint: {
                        attribute: 'delete-hint'
                    },
                    onAdd: {
                        statement: 'md-on-add'
                    },
                    onRemove: {
                        statement: 'md-on-remove'
                    },
                    onSelect: {
                        statement: 'md-on-select'
                    }
                }
            },
            //defaultOptions: {
            //    templateOptions: {
            //        disabled: false
            //    },
            //    ngModelAttrs: {
            //        disabled: {
            //            bound: 'ng-disabled'
            //        },
                   
            //    }
            //}
        }

        this.formlyConfigProvider.setType(formlyOptions);
    }
}