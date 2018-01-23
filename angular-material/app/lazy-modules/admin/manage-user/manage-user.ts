
declare var angular: angular.IAngularStatic;
import { ADMIN_MODULE } from '../module';
import { IUserService } from '../../../services/domains/user/user-service';
import { IGetList } from '../../../models/contracts/request/igetlist';
import { IToasterService } from '../../../services/toaster-service/toater-service';
import { IActionBasedRequest } from '../../../models/contracts/request/user/iactionbasedrequest';

namespace Components.Admin {

    const pageSize = 5;

    class ManageUserCtrl {

        skip: number;

        ListRequest: IGetList;
        Total: number;
        MaxPages: number;

        List: any[];
        Loading: boolean;
        Working: boolean;
        
        static $inject = ['UserService', '$timeout', 'ToasterService', '$element' ]
        constructor(private UserService: IUserService, private $timeout: angular.ITimeoutService, private ToasterService : IToasterService, private $element: angular.IAugmentedJQuery) {
            this.Init();
        }
        Init = () => {
            this.List = [];
            this.Loading = true;
            this.Working = false;
            this.ListRequest = <IGetList>{
                skip: 0,
                take: pageSize
            }
            this.getList();

        }

        getList = () => {
           
            this.UserService.GetUserList(this.ListRequest).then((R) => {
                this.Total = R.count;
                
                this.List = R.result;
                this.MaxPages = Math.ceil(R.count / pageSize);
                this.Loading = false;


                this.$timeout(() => this.Working = false, 200);
            })
        }
        onPageChanged = (page: number) => {
            this.Working = true;
            this.ListRequest.skip = pageSize * (page - 1);
         
            this.getList();
        }
        Deactivate = (email: string) => {
            const req = <IActionBasedRequest>{ email };
            this.UserService.Deactivate(req).then((R) => {
                if (R.state) {
                    this.ToasterService.ShowAsStatus('User Deactivated Succesfully')
                    this.getList();
                }
                else {
                    // show error
                }
            })
        } 
        openCtxt = ($event: any, $index: number) => {
            const menu = this.$element[0].querySelector(`md-menu[data-attr-menu-index="${$index}"]`)
            const ngmenu = angular.element(menu);
            ngmenu.data().$mdMenuController.open($event)
            //console.log(ngmenu);
            //console.log(this.$element);
        }
        Activate = (email: string) => {
            const req = <IActionBasedRequest>{ email };
            this.UserService.Activate(req).then((R) => {
                if (R.state) {
                    this.ToasterService.ShowAsStatus('User Activated Succesfully')
                    this.getList();
                }
                else {
                    // show error
                }
            })

        }
    }

    const template = require('!!raw-loader!./manage-user.html');
    function manageUsers(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: ManageUserCtrl,
        }

    }

    ADMIN_MODULE.directive('manageUsers', manageUsers);
}