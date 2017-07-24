export class AngularWatch {
    InternalId: number;
    constructor() {

    }
    Subscribe = ($scope: ng.IScope, expression: () => any | string, callback: (newvalue: any, oldvalue: any) => void) => {
        let that = this;
        var oldValue = $scope.$eval(expression);
        that.InternalId = setInterval(function () {
            var newValue = $scope.$eval(expression);
            if (newValue !== oldValue) {
                //kick this change into the digest cycle

                setTimeout(function () {
                    callback.call(null, newValue, oldValue);
                    oldValue = newValue;
                }, 0);
            }
        }, 100);
    }
    Unsubscribe = () => {
        clearInterval(this.InternalId);
    }
}