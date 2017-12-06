
import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./datepicker.html');

export function datepickerType (formlyConfigProvider : any)  {
  formlyConfigProvider.setType({
    template,
    name: 'datepicker',
    wrapper: ['label', 'messages'],
    defaultOptions: {
      templateOptions: {
        disabled: false
      },
      ngModelAttrs: {
        disabled: {
          bound: 'ng-disabled'
        },
        placeholder: {
          attribute: 'md-placeholder'
        },
        minDate: {
          bound: 'md-min-date'
        },
        maxDate: {
          bound: 'md-max-date'
        },
        filterDate: {
          bound: 'md-date-filter'
        }
      }
    },
    apiCheck: (check : any) => ({
      templateOptions: {
        disabled: check.bool.optional,
        placeholder: check.string.optional,
        minDate: check.instanceOf(Date).optional,
        maxDate: check.instanceOf(Date).optional,
        filterDate: check.func.optional,
        theme: check.string.optional
      }
    })
  });
};
