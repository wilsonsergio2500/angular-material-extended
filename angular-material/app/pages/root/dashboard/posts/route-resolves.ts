
declare var angular: angular.IAngularStatic;
import { ISecureRouteService } from '../../../../services/secure-route/secure-route';
import { IUserService  } from '../../../../services/domains/user/user-service';


export namespace POST_ROUTE_RESOLVES {


    export class GlobalInjection {
        static Resolve = {
            Injected: ['SecureRouteService', 'UserService', '$q',
                (SecureRouteService: ISecureRouteService, UserService: IUserService, $q: angular.IQService) => {
                    return SecureRouteService.Secure(() => {
                        return UserService.GetMe();
                    });

            }]

        }
    }


}