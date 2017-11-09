
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

export interface IDialogService {
    DisplayError(): void;
}

namespace Services {
    const errorTemplate = require('!!raw-loader!./dialog-error/dialog-error.html');

    class DialogService implements IDialogService {
        static $inject = ['$mdDialog'];
        constructor(private $mdDialog: angular.material.IDialogService) {

        }

        DisplayError() {
            this.$mdDialog.show({
                template: errorTemplate,
                parent: angular.element(document.body),
                clickOutsideToClose: false
            })
        }

    }

    APP_MODULE.service('DialogService', DialogService);
}