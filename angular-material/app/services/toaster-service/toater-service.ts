
import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { IActionResponse } from '../../models/contracts/response/iactionresponse';

export interface IToasterPosition {
    BOTTOM_RIGHT: string,
    BOTTOM_LEFT: string,
    TOP_RIGHT: string,
    TOP_LEFT: string
}

export const TOASTER_POSITIONS : IToasterPosition = {
    BOTTOM_RIGHT: 'bottom right',
    BOTTOM_LEFT: 'bottom left',
    TOP_RIGHT: 'top right',
    TOP_LEFT: 'top left'
}

export interface IToasterStatusMessages {
    Success: string;
    Error: string;
}

export interface IToasterService {
    Show(Text: string, Position: string, Delay?: number): void;
    ShowSuccess(Text: string, Position: string, Delay?: number): void;
    ShowStatus(status: IActionResponse, MessageDefinition: IToasterStatusMessages): void;

    ShowAsStatus(Text: string, Delay? : number): void;
}

namespace Services {

    class ToasterService implements IToasterService {
        static inject = ['$mdToast']
        constructor(private $mdToast: angular.material.IToastService) {
        }

        Show(Text: string, Position: string, Delay: number = 3000) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent(Text).position(Position).hideDelay(Delay)
            )
        }

        ShowSuccess(Text: string, Position: string, Delay: number = 3000) {
            this.$mdToast.show(<angular.material.IToastOptions>{
                hideDelay: Delay,
                position: Position,
            })
        }

        ShowAsStatus(Text: string, Delay: number = 3000) {
            this.$mdToast.show(<angular.material.IToastOptions>{
                hideDelay: Delay,
                position: TOASTER_POSITIONS.TOP_RIGHT,
                template: '<md-toast><md-toaster-status md-status-text="vm.status"></md-toaster-status></md-toast>',
                controllerAs: 'vm',
                controller: function () {
                    this.status = Text;
                }
            })
        }

        ShowStatus(status: IActionResponse, MessageDefinition: IToasterStatusMessages) {

            
            if (status.state) {
                this.Show(MessageDefinition.Success, TOASTER_POSITIONS.TOP_RIGHT);
            }
            else {
                this.Show(MessageDefinition.Error, TOASTER_POSITIONS.TOP_RIGHT);
            }
        }
       
    }


    APP_MODULE.service('ToasterService', ToasterService);
}