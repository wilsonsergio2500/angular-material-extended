import * as angular from 'angular';
import { IMilestoneService } from '../../domains/milestone/milestone-service';
import { IToasterService } from '../../toaster-service/toater-service';

export class DialogRemoveLandmark {

    static $inject = ['$timeout', 'MilestoneService', '$mdDialog', 'ToasterService', 'milestone']
    working: boolean;
    constructor(private $timeout: angular.ITimeoutService, private MilestoneService: IMilestoneService,
        private $mdDialog: angular.material.IDialogService, private ToasterService: IToasterService,
        private milestone: any
    ) {
      
        this.Init();
    }
    Init = () => {
        this.working = false;
    }

    onClick = () => {
        this.working = true;

        const { milestone } = this.milestone; 
        const { id } = milestone;


        this.MilestoneService.RemoveItem(id).then((R) => {

            if (R.state) {

                this.$mdDialog.hide({ removed: id });
                this.$timeout(() => {

                    this.ToasterService.ShowAsStatus('Item has been removed')

                }, 200)

            } else {
                // show toaster as failed..
            }
        })
            .catch(() => {
                //show toaster as failed..
            })
        

    }
}