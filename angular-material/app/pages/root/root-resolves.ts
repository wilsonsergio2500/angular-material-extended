
import * as angular from 'angular';
import { ILoginService } from '../../services/domains/login/login-service';

export namespace RootRouteResolves {

    export class Login {
        static Resolve = {
            Injected: ['LoginService', (LoginService : ILoginService) => {
                return LoginService.IsLoginViewAllowed();
            }]
        }
    }
    

}