import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./slider.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setType({
    template,
    name: 'slider',
    wrapper: ['label'],
    defaultOptions: {
      templateOptions: {
        disabled: false
      },
      ngModelAttrs: {
        disabled: {
          bound: 'ng-disabled'
        },
        min: {
          attribute: 'min'
        },
        max: {
          attribute: 'max'
        },
        step: {
          attribute: 'step'
        },
        discrete: {
          bound: 'md-discrete'
        }
      }
    },
    apiCheck: (check : any) => ({
      templateOptions: {
        disabled: check.bool.optional,
        min: check.number.optional,
        max: check.number.optional,
        step: check.number.optional,
        discrete: check.bool.optional,
        theme: check.string.optional
      }
    })
  });
};
