﻿
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IHttpService } from '../../http-service/http-service';
import { IMilestone } from '../../../models/contracts/request/milestone/imilestone';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IGetList } from '../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../models/contracts/response/ilistresponse';
import { IGridElement } from '../../../models/contracts/response/milestone/igridelement'

export interface IMilestoneService {
    Get(id: string): angular.IPromise<IMilestone>;
    Add(milestone: IMilestone): angular.IPromise<IActionResponse>;
    GetList(request: IGetList): angular.IPromise<IListResponse<IGridElement>>;
    GetListByCategory(userId: string, categoryId: string, request: IGetList): angular.IPromise<IListResponse<IGridElement>>;
    RemoveItem(id: string): angular.IPromise<IActionResponse>;
}

namespace Services {

    const basePath = '/milestone';

    class MilestoneService implements IMilestoneService {
        static $inject = ['HttpService']
        constructor(private HttpService : IHttpService) {
        }

        Get(id: string) {
            return this.HttpService.get<IMilestone>(`${basePath}/record/item/${id}`, {});
        }

        Add(milestone: IMilestone) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/new`, milestone);
        }

        GetListByUser(request: IGetList) {
            return this.HttpService.get<IListResponse<IMilestone>>(`${basePath}/user/records/${request.skip}/${request.take}`);
        }

        GetList(request: IGetList) {
            return this.HttpService.get<IListResponse<IGridElement>>(`${basePath}/records/${request.skip}/${request.take}`);
        }
        GetListByCategory(userId: string, categoryId: string, request: IGetList) {
            return this.HttpService.get<IListResponse<IGridElement>>(`${basePath}/record/category/${userId}/${categoryId}/${request.skip}/${request.take}`);
        }
        RemoveItem(id: string) {
            return this.HttpService.Delete<IActionResponse>(`${basePath}/remove/item/${id}`, {})
        }
       
    }


    APP_MODULE.service('MilestoneService', MilestoneService);

}