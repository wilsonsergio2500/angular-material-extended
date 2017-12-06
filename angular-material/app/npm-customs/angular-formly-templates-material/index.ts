import * as angular from 'angular';
import * as formly from 'AngularFormly';

import runs from './runs/index';
import wrappers from './wrappers/index';
import types from './types';

const ngModuleName = 'formlyMaterial';

angular.module(ngModuleName, ['ngMessages', 'ngMaterial', 'formly'])
  .config(['formlyConfigProvider', (formlyConfigProvider : formly.IFormlyConfig) => {
    const configs = [runs, wrappers, types];

    configs.forEach((config) => {
      let i = 0;
      for (; i < config.length; i++) {
        config[i](formlyConfigProvider);
      }
    });
  }]);

export default ngModuleName;
