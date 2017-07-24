"use strict";
var index_1 = require('../../main/index');
var ResizeDetectorWorker = require('element-resize-detector');
var ResizeDetector;
(function (ResizeDetector) {
    var ResizeDetectorService = (function () {
        function ResizeDetectorService() {
            var _this = this;
            this.Subscribe = function (element, func) {
                _this.SizeDetector.listenTo(element, func);
            };
            this.Unsubscribe = function (element, func) {
                _this.SizeDetector.removeListener(element, func);
            };
            this.SizeDetector = new ResizeDetectorWorker();
        }
        return ResizeDetectorService;
    }());
    ResizeDetector.ResizeDetectorService = ResizeDetectorService;
    index_1.APP_MODULE.service("ResizeDetectorService", ResizeDetectorService);
})(ResizeDetector = exports.ResizeDetector || (exports.ResizeDetector = {}));
//# sourceMappingURL=resize-detector-service.js.map