"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModule_1 = require('../../quill-image-resize-module/modules/BaseModule');
var object_1 = require('../../../polyfills/object');
var DisplaySize = (function (_super) {
    __extends(DisplaySize, _super);
    function DisplaySize() {
        var _this = this;
        _super.apply(this, arguments);
        this.onCreate = function () {
            // Create the container to hold the size display
            _this.display = document.createElement('div');
            // Apply styles
            object_1.Object.assign(_this.display.style, _this.options.displayStyles);
            // Attach it
            _this.overlay.appendChild(_this.display);
        };
        this.onDestroy = function () { };
        this.onUpdate = function () {
            if (!_this.display || !_this.img) {
                return;
            }
            var size = _this.getCurrentSize();
            _this.display.innerHTML = size.join(' &times; ');
            if (size[0] > 120 && size[1] > 30) {
                // position on top of image
                object_1.Object.assign(_this.display.style, {
                    right: '4px',
                    bottom: '4px',
                    left: 'auto',
                });
            }
            else if (_this.img.style.float == 'right') {
                // position off bottom left
                var dispRect = _this.display.getBoundingClientRect();
                object_1.Object.assign(_this.display.style, {
                    right: 'auto',
                    bottom: "-" + (dispRect.height + 4) + "px",
                    left: "-" + (dispRect.width + 4) + "px",
                });
            }
            else {
                // position off bottom right
                var dispRect = _this.display.getBoundingClientRect();
                object_1.Object.assign(_this.display.style, {
                    right: "-" + (dispRect.width + 4) + "px",
                    bottom: "-" + (dispRect.height + 4) + "px",
                    left: 'auto',
                });
            }
        };
        this.getCurrentSize = function () { return [
            _this.img.clientWidth, _this.img.clientHeight
        ]; };
    }
    return DisplaySize;
}(BaseModule_1.BaseModule));
exports.DisplaySize = DisplaySize;
//# sourceMappingURL=DisplaySize.js.map