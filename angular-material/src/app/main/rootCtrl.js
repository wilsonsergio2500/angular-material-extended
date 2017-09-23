"use strict";
var index_1 = require('./index');
var Root;
(function (Root) {
    var rootCtrl = (function () {
        function rootCtrl($mdSidenav) {
            var _this = this;
            this.$mdSidenav = $mdSidenav;
            this.toogleLeftNavBar = function () {
                _this.$mdSidenav('left').toggle();
            };
        }
        rootCtrl.$inject = ['$mdSidenav'];
        return rootCtrl;
    }());
    Root.rootCtrl = rootCtrl;
    index_1.APP_MODULE.controller('rootCtrl', rootCtrl);
})(Root || (Root = {}));
//# sourceMappingURL=rootCtrl.js.map