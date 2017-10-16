"use strict";
var LoadingButtonPage = (function () {
    function LoadingButtonPage($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.onClick = function () {
            _this.working = true;
            _this.$timeout(function () {
                _this.working = false;
            }, 8000);
        };
        this.working = false;
        this.disableButton = false;
    }
    LoadingButtonPage.$inject = ['$timeout'];
    return LoadingButtonPage;
}());
exports.LoadingButtonPage = LoadingButtonPage;
//# sourceMappingURL=loading-button-page.js.map