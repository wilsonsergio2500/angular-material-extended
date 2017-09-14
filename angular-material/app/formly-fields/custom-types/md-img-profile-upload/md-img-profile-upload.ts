
import * as formly from 'AngularFormly';

export class mdImageProfileUpload {

    private template = require('!!raw-loader!./md-img-profile-upload.html');
    constructor(private formlyConfigProvider : formly.IFormlyConfig) {
        this.setType();
    }

    private setType() {
        const formlyOptions: formly.ITypeOptions = <formly.ITypeOptions>{
            template: this.template,
            name: 'mdImgProfileUpload',
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