import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./checkbox.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setType({
    template,
    name: 'checkbox',
    defaultOptions: {
      ngModelAttrs: {
        disabled: {
          bound: 'ng-disabled'
        }
      }
    },
    apiCheck: (check : any) => ({
      templateOptions: {
        disabled: check.bool.optional,
        theme: check.string.optional
      }
    })
  });
};
