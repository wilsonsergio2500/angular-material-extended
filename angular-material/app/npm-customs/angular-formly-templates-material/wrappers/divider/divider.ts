const template = require('!!raw-loader!./divider.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setWrapper({
    template,
    name: 'divider',
    apiCheck: (check : any) => ({
      templateOptions: {
        divider: check.oneOf(['before', 'after']).optional
      }
    })
  });
};
