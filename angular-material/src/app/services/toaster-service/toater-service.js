"use strict";
var index_1 = require('../../main/index');
exports.TOASTER_POSITIONS = {
    BOTTOM_RIGHT: 'bottom right',
    BOTTOM_LEFT: 'bottom left',
    TOP_RIGHT: 'top right',
    TOP_LEFT: 'top left'
};
var Services;
(function (Services) {
    var ToasterService = (function () {
        function ToasterService($mdToast) {
            this.$mdToast = $mdToast;
        }
        ToasterService.prototype.Show = function (Text, Position, Delay) {
            if (Delay === void 0) { Delay = 3000; }
            this.$mdToast.show(this.$mdToast.simple().textContent(Text).position(Position).hideDelay(Delay));
        };
        ToasterService.prototype.ShowSuccess = function (Text, Position, Delay) {
            if (Delay === void 0) { Delay = 3000; }
            this.$mdToast.show({
                hideDelay: Delay,
                position: Position,
            });
        };
        ToasterService.prototype.ShowAsStatus = function (Text, Delay) {
            if (Delay === void 0) { Delay = 3000; }
            this.$mdToast.show({
                hideDelay: Delay,
                position: exports.TOASTER_POSITIONS.TOP_RIGHT,
                template: '<md-toast><md-toaster-status md-status-text="vm.status"></md-toaster-status></md-toast>',
                controllerAs: 'vm',
                controller: function () {
                    this.status = Text;
                }
            });
        };
        ToasterService.prototype.ShowStatus = function (status, MessageDefinition) {
            if (status.state) {
                this.Show(MessageDefinition.Success, exports.TOASTER_POSITIONS.TOP_RIGHT);
            }
            else {
                this.Show(MessageDefinition.Error, exports.TOASTER_POSITIONS.TOP_RIGHT);
            }
        };
        ToasterService.inject = ['$mdToast'];
        return ToasterService;
    }());
    index_1.APP_MODULE.service('ToasterService', ToasterService);
})(Services || (Services = {}));
//# sourceMappingURL=toater-service.js.map