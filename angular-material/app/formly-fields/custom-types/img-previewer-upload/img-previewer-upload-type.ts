﻿
import * as formly from 'AngularFormly';

export class mdImagePreviewUpload {

    constructor(private formlyConfigProvider: formly.IFormlyConfig) {
        this.setType();
    }
    private template = require('!!raw-loader!./img-previewer-upload-type.html');
    private setType() {
        const formlyOptions: formly.ITypeOptions = <formly.ITypeOptions>{
            template: this.template,
            name: 'Image-Preview-Uploader',
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