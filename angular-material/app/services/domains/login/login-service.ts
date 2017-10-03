
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IUserCredential } from '../../../models/contracts/request/user/iusercredential';
import { IHttpService } from '../../http-service/http-service';

export interface ILoginService {
    Login(credentials: IUserCredential): angular.IPromise<any>;
    IsAuthenticated() : angular.IPromise<any>;
}

export const AUTH_ERROR = 'AUTH_ERROR'

namespace Services {

    const basePath = '/login';
    class LoginService implements ILoginService {
        static $inject = ['$auth', '$q', 'HttpService']
        constructor(private $auth: any, private $q: angular.IQService, private HttpService: IHttpService) {
        }

        Login(credentials: IUserCredential) {

            return this.$q((resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                this.$auth.login(credentials).then((response: any) => {
                    resolve(response);
                    console.log('login good');
                }).catch((error: any) => {
                    reject(error);
                });
            });
        }

        IsAuthenticated() {
            return this.$q((resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                this.HttpService.get(`${basePath}/IsAuthenticated`).then(resolve).catch(error => {
                    reject(AUTH_ERROR);
                })
            });
        }
    }

    APP_MODULE.service('LoginService', LoginService);

}