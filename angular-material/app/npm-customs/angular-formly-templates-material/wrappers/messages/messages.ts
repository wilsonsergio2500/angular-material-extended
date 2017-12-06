const template = require('!!raw-loader!./messages.html');

export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setWrapper({
    template,
    name: 'messages'
  });
};
