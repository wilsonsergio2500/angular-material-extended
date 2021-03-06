﻿
import * as angular from 'angular';
import { IHttpService } from '../../http-service/http-service';
import { APP_MODULE } from '../../../main/index';
import { IUserDisplay } from '../../../models/contracts/request/user/iuserdisplay';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IPasswordEdit } from '../../../models/contracts/request/user/ipasswordedit';
import { IImageEdit } from '../../../models/contracts/request/user/iimageedit';
import { IBioEdit } from '../../../models/contracts/request/user/ibioedit';
import { IUserRoleResponse } from '../../../models/contracts/response/user/iuserroleresponse';
import { IUserNameUsed } from '../../../models/contracts/request/user/iusernameused';
import { IGetList } from '../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../models/contracts/response/ilistresponse';
import { IActionBasedRequest } from '../../../models/contracts/request/user/iactionbasedrequest';
import { IRoleChangeBasedRequest } from '../../../models/contracts/request/user/irolechangebasedrequest';
import { IPasswordChangeBasedRequest } from '../../../models/contracts/request/user/ipasswordchangebasedrequest';

export interface IUserService {
    GetUser(userId: string): angular.IPromise<IUserDisplay>;
    GetMe(): angular.IPromise<IUserDisplay>;
    UpdateBio(request: IBioEdit): angular.IPromise<IActionResponse>;
    UpateImage(request: IImageEdit): angular.IPromise<IActionResponse>;
    UpdatePassword(request: IPasswordEdit): angular.IPromise<IActionResponse>;
    GetMyRole(): angular.IPromise<IUserRoleResponse>;
    CheckUserNameUsed(user: string): angular.IPromise<IActionResponse>;
    GetUserList(listRequest: IGetList): angular.IPromise<IListResponse<IUserDisplay>>;
    Activate(request: IActionBasedRequest): angular.IPromise<IActionResponse>;
    Deactivate(request: IActionBasedRequest): angular.IPromise<IActionResponse>;
    UpdateUserRole(request: IRoleChangeBasedRequest): angular.IPromise<IActionResponse>;
    UpdateUserPassword(request: IPasswordChangeBasedRequest): angular.IPromise<IActionResponse>;
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
        CheckUserNameUsed(user: string) {
            const UserNameUsed = <IUserNameUsed>{ userName: user };
            return this.HttpService.Post(`${basePath}/check/username/used`, UserNameUsed);
        }
        GetUserList(listRequest: IGetList) {
            return this.HttpService.get(`${basePath}/list/${listRequest.skip}/${listRequest.take}`)
        }

        Activate(request: IActionBasedRequest) {
            return this.HttpService.Post(`${basePath}/activate`, request);
        }

        Deactivate(request: IActionBasedRequest) {
            return this.HttpService.Post(`${basePath}/deactivate`, request);
        }
        UpdateUserRole(request: IRoleChangeBasedRequest) {
            return this.HttpService.Post(`${basePath}/update/user/role`, request);
        }
        UpdateUserPassword(request: IPasswordChangeBasedRequest) {
            return this.HttpService.Post(`${basePath}/update/user/password`, request);
        }

    }

    APP_MODULE.service('UserService', UserService);
}