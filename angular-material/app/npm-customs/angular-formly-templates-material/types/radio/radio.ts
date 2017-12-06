import * as formly from 'AngularFormly';
const template = require('!!raw-loader!./radio.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setType({
    template,
    name: 'radio',
    wrapper: ['label'],
    apiCheck: (check : any) => ({
      templateOptions: {
        options: check.arrayOf(check.object),
        labelProp: check.string.optional,
        valueProp: check.string.optional,
        theme: check.string.optional
      }
    })
  });
};
