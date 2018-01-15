
declare var angular: angular.IAngularStatic;
import { ADMIN_MODULE } from '../module';
import { IUserService } from '../../../services/domains/user/user-service';
import { IGetList } from '../../../models/contracts/request/igetlist';

namespace Components.Admin {

    const pageSize = 5;

    class ManageUserCtrl {

        skip: number;

        ListRequest: IGetList;
        Total: number;

        List: any[];
        Loading: boolean;
        Working: boolean;
        
        static $inject = ['UserService', '$timeout' ]
        constructor(private UserService: IUserService, private $timeout: angular.ITimeoutService) {
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
        } 
        Activate = (email: string) => {

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