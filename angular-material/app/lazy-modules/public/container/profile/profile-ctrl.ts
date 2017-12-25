
declare var angular: angular.IAngularStatic
export class ProfileCtrl{

    static $inject = ['$state', '$timeout']
    constructor($state: angular.ui.IStateService, private $timeout: angular.ITimeoutService) {

        
    }
}