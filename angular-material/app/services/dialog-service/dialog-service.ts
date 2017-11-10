
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';

export interface IDialogService {
    DisplayError($event?: any): void;
}

namespace Services {
    const errorTemplate = require('!!raw-loader!./dialog-error/dialog-error.html');

  

    class DialogService implements IDialogService {
        static $inject = ['$mdDialog'];
        constructor(private $mdDialog: angular.material.IDialogService) {

        }

        DisplayError($event: any = null) {
            var that = this;
            const mdoptions = <angular.material.IDialogOptions>{
                template: errorTemplate,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                controller: function(){
                    this.Close = () => {
                        that.$mdDialog.hide();
                    }
                },
                controllerAs: 'vm'
                
                
            }

            if (!!$event) {
                mdoptions.targetEvent = $event;
            }

            this.$mdDialog.show(mdoptions);
        }

    }

    APP_MODULE.service('DialogService', DialogService);
}