
import * as angular from 'angular';
import { ILoginService } from '../domains/login/login-service';
import { APP_MODULE } from '../../main/index';

export interface ISecureRouteService{
    Secure<T>(delegate?: () => angular.IPromise<T>): angular.IPromise<T>;
}

class SecureRouteService implements ISecureRouteService {
    static $inject = ['LoginService']
    constructor(private LoginService : ILoginService) {

    }

    Secure<T>(delegate: ()  => angular.IPromise<T> = null) {
        if (!!delegate) {
           return this.LoginService.IsAuthenticated().then(() => {
               return delegate.call(this);

            })
        }
        else {
            return this.LoginService.IsAuthenticated();
        }
    }

}

APP_MODULE.service('SecureRouteService', SecureRouteService);