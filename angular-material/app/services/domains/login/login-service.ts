
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IUserCredential } from '../../../models/contracts/request/user/iusercredential';
import { IHttpService } from '../../http-service/http-service';
import { ROOT_ITEMS } from '../../../pages/root/route-names';

export interface ILoginService {
    Login(credentials: IUserCredential): angular.IPromise<any>;
    IsAuthenticated(): angular.IPromise<any>;
    LogOut(): void;
}

export const AUTH_ERROR = 'AUTH_ERROR'

namespace Services {

    const basePath = '/login';
    class LoginService implements ILoginService {
        static $inject = ['$auth', '$q', 'HttpService', '$state', '$timeout']
        constructor(private $auth: any, private $q: angular.IQService, private HttpService: IHttpService,
            private $state: angular.ui.IStateService, private $timeout: angular.ITimeoutService) {
        }

        Login(credentials: IUserCredential) {

            return this.$q((resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                this.$auth.login(credentials).then((response: any) => {
                    resolve(response);
                }).catch((error: any) => {
                    reject(error);
                });
            });
        }

        LogOut = () => {
            this.$auth.logout();
            this.$timeout(() => {
                this.$state.go(ROOT_ITEMS.NAMES.LOGIN);
            }, 200);
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