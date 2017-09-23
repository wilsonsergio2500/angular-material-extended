"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModule_1 = require('../../quill-image-resize-module/modules/BaseModule');
var object_1 = require('../../../polyfills/object');
var Resize = (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        var _this = this;
        _super.apply(this, arguments);
        this.onCreate = function () {
            // track resize handles
            _this.boxes = [];
            // add 4 resize handles
            _this.addBox('nwse-resize'); // top left
            _this.addBox('nesw-resize'); // top right
            _this.addBox('nwse-resize'); // bottom right
            _this.addBox('nesw-resize'); // bottom left
            _this.positionBoxes();
        };
        this.onDestroy = function () {
            // reset drag handle cursors
            _this.setCursor('');
        };
        this.positionBoxes = function () {
            var handleXOffset = -parseFloat(_this.options.handleStyles.width) / 2 + "px";
            var handleYOffset = -parseFloat(_this.options.handleStyles.height) / 2 + "px";
            // set the top and left for each drag handle
            [
                { left: handleXOffset, top: handleYOffset },
                { right: handleXOffset, top: handleYOffset },
                { right: handleXOffset, bottom: handleYOffset },
                { left: handleXOffset, bottom: handleYOffset },
            ].forEach(function (pos, idx) {
                object_1.Object.assign(_this.boxes[idx].style, pos);
            });
        };
        this.addBox = function (cursor) {
            // create div element for resize handle
            var box = document.createElement('div');
            // Star with the specified styles
            object_1.Object.assign(box.style, _this.options.handleStyles);
            box.style.cursor = cursor;
            // Set the width/height to use 'px'
            box.style.width = _this.options.handleStyles.width + "px";
            box.style.height = _this.options.handleStyles.height + "px";
            // listen for mousedown on each box
            box.addEventListener('mousedown', _this.handleMousedown, false);
            // add drag handle to document
            _this.overlay.appendChild(box);
            // keep track of drag handle
            _this.boxes.push(box);
        };
        this.handleMousedown = function (evt) {
            // note which box
            _this.dragBox = evt.target;
            // note starting mousedown position
            _this.dragStartX = evt.clientX;
            _this.dragStartY = evt.clientY;
            // store the width before the drag
            _this.preDragWidth = _this.img.clientWidth; //this.img.width || this.img.naturalWidth;
            _this.preDragHeigth = _this.img.clientHeight;
            // set the proper cursor everywhere
            _this.setCursor(_this.dragBox.style.cursor);
            // listen for movement and mouseup
            document.addEventListener('mousemove', _this.handleDrag, false);
            document.addEventListener('mouseup', _this.handleMouseup, false);
        };
        this.handleMouseup = function () {
            // reset cursor everywhere
            _this.setCursor('');
            // stop listening for movement and mouseup
            document.removeEventListener('mousemove', _this.handleDrag);
            document.removeEventListener('mouseup', _this.handleMouseup);
        };
        this.handleDrag = function (evt) {
            if (!_this.img) {
                // image not set yet
                return;
            }
            // update image size
            var deltaX = evt.clientX - _this.dragStartX;
            var deltaY = evt.clientY - _this.dragStartY;
            var img = _this.img;
            if (_this.dragBox === _this.boxes[0] || _this.dragBox === _this.boxes[3]) {
                // left-side resize handler; dragging right shrinks image
                img.style.width = Math.round(_this.preDragWidth - deltaX) + 'px';
                img.style.height = Math.round(_this.preDragHeigth + deltaY) + 'px';
            }
            else {
                // right-side resize handler; dragging right enlarges image
                img.style.width = Math.round(_this.preDragWidth + deltaX) + 'px';
                img.style.height = Math.round(_this.preDragHeigth + deltaY) + 'px';
            }
            _this.requestUpdate();
        };
        this.setCursor = function (value) {
            [
                document.body,
                _this.img,
            ].forEach(function (el) {
                el.style.cursor = value; // eslint-disable-line no-param-reassign
            });
        };
    }
    return Resize;
}(BaseModule_1.BaseModule));
exports.Resize = Resize;
//# sourceMappingURL=Resize.js.map