"use strict";
var index_1 = require('../../../../../../main/index');
var View;
(function (View) {
    var Componets;
    (function (Componets) {
        var MilestoneViewerCtrl = (function () {
            function MilestoneViewerCtrl(LikeService) {
                var _this = this;
                this.LikeService = LikeService;
                this.Like = function (milestoneId) {
                    return _this.LikeService.Like(milestoneId);
                };
                this.Unlike = function (milestoneId) {
                    return _this.LikeService.Unlike(milestoneId);
                };
                console.log(this.record);
            }
            MilestoneViewerCtrl.$inject = ['LikeService'];
            return MilestoneViewerCtrl;
        }());
        var template = require('!!raw-loader!./milestone-viewer.html');
        function milestoneViewer() {
            return {
                template: template,
                controllerAs: 'vm',
                controller: MilestoneViewerCtrl,
                bindToController: true,
                scope: {
                    record: '='
                }
            };
        }
        index_1.APP_MODULE.directive('milestoneViewer', milestoneViewer);
    })(Componets = View.Componets || (View.Componets = {}));
})(View || (View = {}));
//# sourceMappingURL=milestone-viewer.js.map