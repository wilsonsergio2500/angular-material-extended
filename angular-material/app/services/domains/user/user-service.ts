
import * as angular from 'angular';
import { IHttpService } from '../../http-service/http-service';
import { APP_MODULE } from '../../../main/index';
import { IUserDisplay } from '../../../models/contracts/request/user/iuserdisplay';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IPasswordEdit } from '../../../models/contracts/request/user/ipasswordedit';
import { IImageEdit } from '../../../models/contracts/request/user/iimageedit';
import { IBioEdit } from '../../../models/contracts/request/user/ibioedit';
import { IUserRoleResponse } from '../../../models/contracts/response/user/iuserroleresponse';

export interface IUserService {
    GetUser(userId: string): angular.IPromise<IUserDisplay>;
    GetMe(): angular.IPromise<IUserDisplay>;
    UpdateBio(request: IBioEdit): angular.IPromise<IActionResponse>;
    UpateImage(request: IImageEdit): angular.IPromise<IActionResponse>;
    UpdatePassword(request: IPasswordEdit): angular.IPromise<IActionResponse>;
    GetMyRole(): angular.IPromise<IUserRoleResponse>;
}

namespace Services {

    const basePath = '/User';

    class UserService implements IUserService {

        static $inject = ['HttpService']
        constructor(private HttpService: IHttpService) {

        }

        GetUser(userId: string) {
            return this.HttpService.get<IUserDisplay>(`${basePath}/${userId}`);
        }
        GetMe() {
            return this.HttpService.get<IUserDisplay>(`${basePath}/me`);
        }
        UpdateBio(request: IBioEdit) {
            return this.HttpService.Put<IActionResponse>(`${basePath}/update/me/bio`, request);
        }
        UpateImage(request: IImageEdit) {
            return this.HttpService.Put<IActionResponse>(`${basePath}/update/me/image`, request);
        }
        UpdatePassword(request: IPasswordEdit) {
            return this.HttpService.Put<IActionResponse>(`${basePath}/update/me/password/`, request);
        }
        GetMyRole() {
            return this.HttpService.get<IUserRoleResponse>(`${basePath}/role/me`)
        }

    }

    APP_MODULE.service('UserService', UserService);
}