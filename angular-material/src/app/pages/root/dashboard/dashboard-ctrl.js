"use strict";
var DashboardCtrl = (function () {
    function DashboardCtrl($mdSidenav) {
        var _this = this;
        this.$mdSidenav = $mdSidenav;
        this.toogleLeftNavBar = function () {
            _this.$mdSidenav('left').toggle();
        };
    }
    DashboardCtrl.$inject = ['$mdSidenav'];
    return DashboardCtrl;
}());
exports.DashboardCtrl = DashboardCtrl;
//# sourceMappingURL=dashboard-ctrl.js.map