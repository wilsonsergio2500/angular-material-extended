import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./input.html');

import { ngModelAttrsTransformer } from './../../helpers';

export function inputType (formlyConfigProvider : any)  {
  formlyConfigProvider.setType({
    template,
    name: 'input',
    wrapper: ['label', 'messages', 'inputContainer'],
    defaultOptions: {
      templateOptions: {
        type: 'text',
        disabled: false
      },
      ngModelAttrs: {
        mdMaxlength: {
          bound: 'md-maxlength'
        },
        // XXX angular-formly#8042d2a so we want to keep it compatible
        // with angular-formly releases before that commit
        step: {
          attribute: 'step'
        },
        disabled: {
          bound: 'ng-disabled'
        },
        pattern: {
          bound: 'ng-pattern'
        }
      }
    },
    apiCheck: (check : any) => {
      return {
        templateOptions: {
          disabled: check.bool.optional,
          type: check.string,
          step: check.number.optional,
          pattern: check.oneOfType([
            check.string,
            check.instanceOf(RegExp)
          ]).optional,
          theme: check.string.optional
        }
      };
    }
  });
};
