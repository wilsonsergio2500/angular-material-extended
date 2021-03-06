﻿
import * as angular from 'angular';
import { IHttpService } from '../../http-service/http-service';
import { APP_MODULE } from '../../../main/index';

import { IRole } from '../../../models/contracts/response/role/irole'
export interface IRoleService {
    GetRoles(): angular.IPromise<IRole[]>;
}

namespace Services {

    const basePath = '/role';
    class RoleService implements IRoleService {
        static $inject = ['HttpService']
        constructor(private HttpService: IHttpService ) {
        }

        GetRoles() {
            return this.HttpService.get<IRole[]>(`${basePath}/list`);
        }
    }

    APP_MODULE.service('RoleService', RoleService);
}