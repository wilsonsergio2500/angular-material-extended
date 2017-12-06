import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./textarea.html');

import { ngModelAttrsTransformer } from './../../helpers';

export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setType({
    template,
    name: 'textarea',
    wrapper: ['label', 'messages', 'inputContainer'],
    defaultOptions: {
      ngModelAttrs: {
        disabled: {
          bound: 'ng-disabled'
        },
        rows: {
          attribute: 'rows'
        },
        cols: {
          attribute: 'cols'
        }
      },
      templateOptions: {
        grow: true
      }
    },
    apiCheck: (check : any) => ({
      templateOptions: {
        disabled: check.bool.optional,
        rows: check.number.optional,
        cols: check.number.optional,
        grow: check.bool.optional,
        theme: check.string.optional
      }
    })
  });

  formlyConfigProvider.extras.fieldTransform.push((fields : any) => {
    return ngModelAttrsTransformer(fields, (field : any) => (
      field.type === 'textarea' &&
      field.templateOptions &&
      field.templateOptions.grow === false
    ), 'grow', {
      attribute: 'md-no-autogrow'
    });
  });
};
