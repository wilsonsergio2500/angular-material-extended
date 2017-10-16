"use strict";
var MilestoneDisplayCtrl = (function () {
    function MilestoneDisplayCtrl(Injected) {
        this.Injected = Injected;
        console.log(Injected);
    }
    MilestoneDisplayCtrl.$inject = ['Injected'];
    return MilestoneDisplayCtrl;
}());
exports.MilestoneDisplayCtrl = MilestoneDisplayCtrl;
//# sourceMappingURL=milestone-display-ctrl.js.map