import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IInvite } from '../../../models/contracts/request/invite/iinvite';
import { IHttpService } from '../../http-service/http-service'
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IInviteCompletition } from '../../../models/contracts/request/invite/iinvitecompletition';

export interface IInviteService {
    Add(newInvite: IInvite): angular.IPromise<IActionResponse>;
    Get(id: string): angular.IPromise<IInvite>;
    Complete(request: IInviteCompletition): angular.IPromise<IActionResponse>;
}

namespace Services {
    const basePath = '/invite';

    export class InviteService implements IInviteService {
        static $inject = ['HttpService']
        constructor(private HttpService: IHttpService) {

        }

        Add(newInvite: IInvite) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/new/${newInvite.email}/${newInvite.participationRoleType}`, {});
        }

        Get(id: string) {
            return this.HttpService.get<IInvite>(`${basePath}/${id}`, {});
        }

        Complete(request: IInviteCompletition) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/complete`, request);
        }
    }


    APP_MODULE.service('InviteService', InviteService);
}