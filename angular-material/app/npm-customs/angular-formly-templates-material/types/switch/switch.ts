import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./switch.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setType({
    template,
    name: 'switch',
    defaultOptions: {
      templateOptions: {
        disabled: false
      },
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
