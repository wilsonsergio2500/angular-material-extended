
import * as angular from 'angular';
import { IInviteService } from '../../../services/domains/invite/invite-service';
import { IUserService } from '../../../services/domains/user/user-service';
import { IMilestoneService } from '../../../services/domains/milestone/milestone-service';
import { ICategoryService } from '../../../services/domains/category/category-service';
import { ILoginService } from '../../../services/domains/login/login-service';
import { ISecureRouteService } from '../../../services/secure-route/secure-route';

interface IStateParmBase {
    Id: string;
}

export namespace RouteResolves {

    export class InviteComplete  {

        static Resolve = {
            Injected: ['$stateParams', 'InviteService',
                ($stateParams: IStateParmBase, InviteService: IInviteService) => {
                    return InviteService.Get($stateParams.Id);
                }
            ]
        }

    }

    export class MilestoneView {
        static Resolve = {
            Injected: ['SecureRouteService', '$stateParams', '$q',  'MilestoneService',
                (SecureRouteService: ISecureRouteService, $stateParams: IStateParmBase, $q: angular.IQService,  MilestoneService: IMilestoneService) => {

                    return SecureRouteService.Secure(() => {
                        return MilestoneService.Get($stateParams.Id);
                    });
            }]
        }
    }

    export namespace MilestoneResolves {
        export class ADD {
            static Resolve = {
                Injected: ['SecureRouteService', 'UserService', (SecureRouteService: ISecureRouteService, UserService: IUserService) => {
                    return SecureRouteService.Secure(() => {
                        return UserService.GetMe();
                    });
                }]
            }
        }
    }


    export namespace Profile {

        export namespace VIEWS {
            export class MAIN {
                static Resolve = {
                    Injected: ['SecureRouteService', '$stateParams', 'UserService', '$q', 'CategoryService',
                        (SecureRouteService: ISecureRouteService ,$stateParams: IStateParmBase, UserService: IUserService, $q: angular.IQService, CategoryService: ICategoryService) => {

                            return SecureRouteService.Secure(() => {
                                return $q.all({
                                    user: UserService.GetUser($stateParams.Id),
                                    categoryTabs: CategoryService.GetTabs(),

                                })
                            });
                      
                    }]
                }
            }
        }

        export class EditBio {
            static Resolve = {
                Injected: ['SecureRouteService', 'UserService', (SecureRouteService : ISecureRouteService, UserService: IUserService) => {
                    return SecureRouteService.Secure(() => {
                        return UserService.GetMe();
                    });
                }]
            }
        }
    }
}