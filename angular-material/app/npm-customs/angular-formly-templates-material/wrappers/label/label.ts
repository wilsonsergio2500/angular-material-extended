const template = require('!!raw-loader!./label.html');

export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setWrapper({
    template,
    name: 'label',
    apiCheck: (check : any) => ({
      templateOptions: {
        label: check.string
      }
    })
  });
};
