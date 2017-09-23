"use strict";
var AngularWatch = (function () {
    function AngularWatch() {
        var _this = this;
        this.Subscribe = function ($scope, expression, callback) {
            var that = _this;
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
        };
        this.Unsubscribe = function () {
            clearInterval(_this.InternalId);
        };
    }
    return AngularWatch;
}());
exports.AngularWatch = AngularWatch;
//# sourceMappingURL=AngularWatch.js.map