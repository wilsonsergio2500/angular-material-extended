
import * as angular from 'angular';
import * as formly from 'AngularFormly';
import { APP_MODULE } from '../../main/index';


export interface IRoleService {
    getRoles(): angular.IPromise<formly.ISelectOption[]> 
}

export class RoleService implements IRoleService {

    static $inject = ['$http', '$q', '$timeout']
    constructor(private $http: angular.IHttpService, private $q: angular.IQService, private $timeout : angular.ITimeoutService) {

    }

    getRoles = () : angular.IPromise<formly.ISelectOption[]> =>  {
        let defer = this.$q.defer();
        let items: formly.ISelectOption[] = [];
        items.push(<formly.ISelectOption>{ name: 'Member', value: "1" });
        items.push(<formly.ISelectOption>{ name: 'CEO', value: "2" });
        items.push(<formly.ISelectOption>{ name: 'Admin', value: "3" });

        setTimeout(() => {
            defer.resolve(items);
        }, 500);

        return defer.promise;
        
    }

    
}

APP_MODULE.service('RoleService', RoleService);
