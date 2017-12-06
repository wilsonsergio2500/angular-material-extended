const template = require('!!raw-loader!./input-container.html');


export default (formlyConfigProvider : any) => {
  formlyConfigProvider.setWrapper({
    template,
    name: 'inputContainer'
  });
};
