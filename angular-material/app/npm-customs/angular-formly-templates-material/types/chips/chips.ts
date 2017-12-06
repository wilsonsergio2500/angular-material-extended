import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./chips.html');


export function chipsType (formlyConfigProvider : any) {
  formlyConfigProvider.setType({
    template,
    name: 'chips',
    wrapper: ['label'],
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
    apiCheck: (check : any) => ({
      templateOptions: {
        placeholder: check.string.optional,
        secondaryPlaceholder: check.string.optional,
        deleteButtonLabel: check.string.optional,
        deleteHint: check.string.optional,
        onAdd: check.func.optional,
        onRemove: check.func.optional,
        onSelect: check.func.optional,
        theme: check.string.optional
      }
    })
  });
};
