
import * as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { IUserCredential } from '../../../models/contracts/request/user/iusercredential';

export interface ILoginService {
    Login(credentials: IUserCredential): angular.IPromise<any>;
}

namespace Services {


    class LoginService implements ILoginService {
        static $inject = ['$auth', '$q']
        constructor(private $auth: any, private $q: angular.IQService) {
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
    }

    APP_MODULE.service('LoginService', LoginService);

}