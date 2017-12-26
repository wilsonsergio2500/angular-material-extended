
import * as angular from 'angular';
import { ILoginService } from '../../services/domains/login/login-service';
import { IUserService } from '../../services/domains/user/user-service';

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
            Injected: ['UserService', (UserService: IUserService) => {
                return UserService.GetMyRole(); 
            }]
        }
    }
}