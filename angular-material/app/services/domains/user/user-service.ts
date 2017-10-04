
import * as angular from 'angular';
import { IHttpService } from '../../http-service/http-service';
import { APP_MODULE } from '../../../main/index';
import { IUserDisplay } from '../../../models/contracts/request/user/iuserdisplay';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IPasswordEdit } from '../../../models/contracts/request/user/ipasswordedit';

export interface IUserService {
    GetUser(userId: string): angular.IPromise<IUserDisplay>;
    GetMe(): angular.IPromise<IUserDisplay>;
    UpateImage(image: string): angular.IPromise<IActionResponse>;
    UpdatePassword(request: IPasswordEdit): angular.IPromise<IActionResponse>;
}

namespace Services {

    const basePath = '/User';

    class UserService {

        static $inject = ['HttpService']
        constructor(private HttpService: IHttpService) {

        }

        GetUser(userId: string) {
            return this.HttpService.get<IUserDisplay>(`${basePath}/${userId}`);
        }
        GetMe() {
            return this.HttpService.get<IUserDisplay>(`${basePath}/me`);
        }
        UpateImage(image: string) {
            return this.HttpService.Put<IActionResponse>(`${basePath}/me/image/${image}`, {});
        }
        UpdatePassword(request: IPasswordEdit) {
            return this.HttpService.Put<IActionResponse>(`${basePath}/me/password/`, request);
        }

    }

    APP_MODULE.service('UserService', UserService);
}