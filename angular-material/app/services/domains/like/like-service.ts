
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IHttpService } from '../../http-service/http-service';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { ITotalResponse } from '../../../models/contracts/response/itotalresponse';
import { IListResponse } from '../../../models/contracts/response/ilistresponse';
import { IUser } from '../../../models/contracts/request/user/iuser';

export interface ILikeService {
    Like(milestoneId: string): angular.IPromise<IActionResponse>;
    Unlike(milestoneId: string): angular.IPromise<IActionResponse>;
    GetPostCount(postId: string): angular.IPromise<ITotalResponse>;
    GetRecent(postId: string): angular.IPromise<IListResponse<IUser>>;
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
        GetPostCount(postId: string) {
            return this.HttpService.get<ITotalResponse>(`${basePath}/post/count/${postId}`, {});
        }
        GetRecent(postId: string) {
            return this.HttpService.get<IListResponse<IUser>>(`${basePath}/post/likes/most5/${postId}`, {})
        }
    }


    APP_MODULE.service('LikeService', LikeService);
}