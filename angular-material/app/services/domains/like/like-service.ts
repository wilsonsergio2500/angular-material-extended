
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IHttpService } from '../../http-service/http-service';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';

export interface ILikeService {
    Like(milestoneId: string): angular.IPromise<IActionResponse>;
    Unlike(milestoneId: string): angular.IPromise<IActionResponse>;
}

namespace Service {

    const basePath = '/Like'

    class LikeService {
        static $inject = ['HttpService']
        constructor(private HttpService: IHttpService ) {

        }
        Like(milestoneId: string) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/like/${milestoneId}`, {});
        }
        Unlike(milestoneId: string) {
            return this.HttpService.Delete<IActionResponse>(`${basePath}/unlike/${milestoneId}`, {});
        }
    }


    APP_MODULE.service('LikeService', LikeService);
}