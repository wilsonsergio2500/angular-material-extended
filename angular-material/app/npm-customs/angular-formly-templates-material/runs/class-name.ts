import { ngModelAttrsTransformer } from './../helpers';

export default (formlyConfigProvider : any) => {
  // add only step attribute because min and max are both built-in
  formlyConfigProvider.extras.fieldTransform.push((fields : any) => {
    return ngModelAttrsTransformer(fields, (field : any) => (
      field.templateOptions && typeof field.templateOptions.className !== 'undefined'
    ), 'className', {
      bound: 'ng-class'
    });
  });
};
