import * as formly from 'AngularFormly';

export class quillTextEditor {

    constructor(private formlyConfigProvider: formly.IFormlyConfig) {
        this.setType();   
    }

    private template = require('!!raw-loader!./quill-text-editor.html');
    private setType() {
        const formlyOptions: formly.ITypeOptions = <formly.ITypeOptions>{
            template: this.template,
            name: 'quillTextEditor',
            wrapper: ['messages', 'inputContainer'],
            defaultOptions: {
                templateOptions: {
                    disabled: false
                },
                ngModelAttrs: {
                    disabled: {
                        bound: 'ng-disabled'
                    }
                }
            }
        }

        this.formlyConfigProvider.setType(formlyOptions);
    }
}