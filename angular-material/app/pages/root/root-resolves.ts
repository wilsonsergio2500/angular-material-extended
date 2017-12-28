
import * as angular from 'angular';
import { ILoginService } from '../../services/domains/login/login-service';
import { IUserService } from '../../services/domains/user/user-service';
import { ISecureRouteService } from '../../services/secure-route/secure-route'

export namespace RootRouteResolves {

    export class Login {
        static Resolve = {
            Injected: ['LoginService', (LoginService : ILoginService) => {
                return LoginService.IsLoginViewAllowed();
            }]
        }
    }
    
    export class Dashboard {
        static Resolve = {
            Injected: ['SecureRouteService', 'UserService', (SecureRouteService: ISecureRouteService, UserService: IUserService) => {

                return SecureRouteService.Secure(() => {
                    return UserService.GetMyRole(); 
                });
            }]
        }
    }
}