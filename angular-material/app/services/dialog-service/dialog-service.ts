


import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { DialogRemoveLandmark } from './dialog-remove-milestone/dialog-remove-milestone';

export interface IDialogService {
    DisplayError(message: string, $event?: any): void;
    DisplayLandmarkActions($event: any): void;
    DisplayRemoveLandmarkConfirmation($event: any, milestone: any): angular.IPromise<any>;
}

namespace Services {
    const errorTemplate = require('!!raw-loader!./dialog-error/dialog-error.html');
    const actionsTemplate = require('!!raw-loader!./dialog-landmark-actions/dialog-landmark-actions.html');
    const removemilestone = require('!!raw-loader!./dialog-remove-milestone/dialog-remove-milestone.html');
  

    class DialogService implements IDialogService {
        static $inject = ['$mdDialog'];
        constructor(private $mdDialog: angular.material.IDialogService) {

        }

        DisplayError(message: string, $event: any = null) {
            var that = this;
            const mdoptions = <angular.material.IDialogOptions>{
                template: errorTemplate,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                controller: function(){
                    this.Close = () => {
                        that.$mdDialog.hide();
                    }
                    this.msg = message
                },
                controllerAs: 'vm'
                
                
            }

            if (!!$event) {
                mdoptions.targetEvent = $event;
            }

            this.$mdDialog.show(mdoptions);
        }

        DisplayLandmarkActions($event : any) {

            const mdoptions = <angular.material.IDialogOptions>{
                template: actionsTemplate,
                targetEvent: $event,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            }

            this.$mdDialog.show(mdoptions);
        }

        DisplayRemoveLandmarkConfirmation($event: any, milestone: any ) {

            const mdoptions = <angular.material.IDialogOptions>{
                template: removemilestone,
                targetEvent: $event,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                controller: DialogRemoveLandmark,
                controllerAs: 'vm',
                locals: { milestone }
            }

           return this.$mdDialog.show(mdoptions);
        }
    }

    APP_MODULE.service('DialogService', DialogService);
}