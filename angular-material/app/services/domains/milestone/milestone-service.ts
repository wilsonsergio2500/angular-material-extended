
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IHttpService } from '../../http-service/http-service';
import { IMilestone } from '../../../models/contracts/request/milestone/imilestone';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IGetList } from '../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../models/contracts/response/ilistresponse';

export interface IMilestoneService {
    Add(milestone: IMilestone): angular.IPromise<IActionResponse>;
}

namespace Services {

    const basePath = '/milestone';

    class MilestoneService implements IMilestoneService {
        static $inject = ['HttpService']
        constructor(private HttpService : IHttpService) {
        }

        Add(milestone: IMilestone) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/new`, milestone);
        }

        GetListByUser(request: IGetList) {
            return this.HttpService.get<IListResponse<IMilestone>>(`${basePath}/user/records/${request.skip}/${request.take}`);
        }

        GetList(request: IGetList) {
            return this.HttpService.get<IListResponse<IMilestone>>(`${basePath}/records/${request.skip}/${request.take}`);
        }
       
    }


    APP_MODULE.service('MilestoneService', MilestoneService);

}