
declare var angular: angular.IAngularStatic;
import { FormTabWizard, IFormTabWizardItem  } from '../models/formtabwizard';
import { IMilestoneService } from '../../../services/domains/milestone/milestone-service';
import { IToasterService } from '../../../services/toaster-service/toater-service';
import { DASHBOARD } from '../../../pages/root/dashboard/route-names';
import { IMilestone } from '../../../models/contracts/request/milestone/imilestone';

export abstract class Base {

    protected Forms: FormTabWizard<any>;
    protected IsWorking: boolean;
    protected Model: IMilestone;

    constructor(protected MilestoneService: IMilestoneService, protected $timeout: angular.ITimeoutService,
        protected ToasterService: IToasterService, protected $state: angular.ui.IStateService
    ) {

        this.IsWorking = false;
        this.Model = <IMilestone>{ categories: [] };
    }

    protected onFinilized() {

        this.IsWorking = true;
        const model = this.Forms.getValue();

        //console.log(model);

        this.MilestoneService.Add(model).then((reponse) => {
            if (reponse.state) {
                this.ToasterService.ShowAsStatus('Milestone Added Successfully');
                this.IsWorking = false;
                this.$timeout(() => {
                    this.$state.go(DASHBOARD.NAMES.FEED);
                }, 300);
            }
        });

    }


}