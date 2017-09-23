"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var route_1 = require('../../models/route');
var root_view_1 = require('./root-view');
var login_ctrl_1 = require('./login/login-ctrl');
var dashboard_ctrl_1 = require('./dashboard/dashboard-ctrl');
var routes_1 = require('./dashboard/routes');
var RootRoutes;
(function (RootRoutes) {
    var Root = (function (_super) {
        __extends(Root, _super);
        function Root() {
            _super.call(this);
            this.template = require('!!raw-loader!./root-view.html');
            this.controller = root_view_1.rootCtrl;
            this.name = 'root';
            this.children = [
                new RootChildrens.Login(),
                new RootChildrens.DashBoard()
            ];
        }
        return Root;
    }(route_1.Route));
    RootRoutes.Root = Root;
    var RootChildrens;
    (function (RootChildrens) {
        var Login = (function (_super) {
            __extends(Login, _super);
            function Login() {
                _super.call(this);
                this.template = require('!!raw-loader!./login/login-view.html');
                this.url = '/';
                this.controller = login_ctrl_1.LoginCtrl;
                this.name = 'login';
            }
            return Login;
        }(route_1.Route));
        RootChildrens.Login = Login;
        var DashBoard = (function (_super) {
            __extends(DashBoard, _super);
            function DashBoard() {
                _super.call(this);
                this.template = require('!!raw-loader!./dashboard/dashboard-view.html');
                this.url = '/dashboard';
                this.controller = dashboard_ctrl_1.DashboardCtrl;
                this.name = 'dashboard';
                this.children = routes_1.dashboardRoutes;
            }
            return DashBoard;
        }(route_1.Route));
        RootChildrens.DashBoard = DashBoard;
    })(RootChildrens = RootRoutes.RootChildrens || (RootRoutes.RootChildrens = {}));
})(RootRoutes = exports.RootRoutes || (exports.RootRoutes = {}));
exports.rootRoutes = [
    new RootRoutes.Root()
];
//# sourceMappingURL=routes.js.map