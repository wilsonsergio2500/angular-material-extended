"use strict";
var index_1 = require('../../../main/index');
var Service;
(function (Service) {
    var Status;
    (function (Status) {
        var toasterStatusCtrl = (function () {
            function toasterStatusCtrl() {
            }
            return toasterStatusCtrl;
        }());
        var template = require('!!raw-loader!./toaster-status.html');
        function toasterStatus() {
            return {
                controller: toasterStatusCtrl,
                controllerAs: 'vm',
                bindToController: true,
                template: template,
                scope: {
                    mdStatusText: '='
                }
            };
        }
        index_1.APP_MODULE.directive('mdToasterStatus', toasterStatus);
    })(Status = Service.Status || (Service.Status = {}));
})(Service || (Service = {}));
//# sourceMappingURL=toaster-status.js.map