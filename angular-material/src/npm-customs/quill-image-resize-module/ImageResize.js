"use strict";
var lodash_1 = require('lodash');
var defaultoptions_1 = require('./defaultoptions');
var displaysize_1 = require('./modules/displaysize');
var Toolbar_1 = require('./modules/Toolbar');
var Resize_1 = require('./modules/Resize');
var Quill = require('quill');
var object_1 = require('../../polyfills/object');
var knownModules = { DisplaySize: displaysize_1.DisplaySize, Toolbar: Toolbar_1.Toolbar, Resize: Resize_1.Resize };
/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
var ImageResize = (function () {
    function ImageResize(quill, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.initializeModules = function () {
            _this.removeModules();
            _this.modules = _this.moduleClasses.map(function (ModuleClass) { return new (knownModules[ModuleClass] || ModuleClass)(_this); });
            _this.modules.forEach(function (module) {
                module.onCreate();
            });
            _this.onUpdate();
        };
        this.onUpdate = function () {
            _this.repositionElements();
            _this.modules.forEach(function (module) {
                module.onUpdate();
            });
        };
        this.removeModules = function () {
            _this.modules.forEach(function (module) {
                module.onDestroy();
            });
            _this.modules = [];
        };
        this.handleClick = function (evt) {
            if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
                if (_this.img === evt.target) {
                    // we are already focused on this image
                    return;
                }
                if (_this.img) {
                    // we were just focused on another image
                    _this.hide();
                }
                // clicked on an image inside the editor
                _this.show(evt.target);
            }
            else if (_this.img) {
                // clicked on a non image
                _this.hide();
            }
        };
        this.show = function (img) {
            // keep track of this img element
            _this.img = img;
            _this.showOverlay();
            _this.initializeModules();
        };
        this.showOverlay = function () {
            if (_this.overlay) {
                _this.hideOverlay();
            }
            _this.quill.setSelection(null);
            // prevent spurious text selection
            _this.setUserSelect('none');
            // listen for the image being deleted or moved
            document.addEventListener('keyup', _this.checkImage, true);
            _this.quill.root.addEventListener('input', _this.checkImage, true);
            // Create and add the overlay
            _this.overlay = document.createElement('div');
            object_1.Object.assign(_this.overlay.style, _this.options.overlayStyles);
            _this.quill.root.parentNode.appendChild(_this.overlay);
            _this.repositionElements();
        };
        this.hideOverlay = function () {
            if (!_this.overlay) {
                return;
            }
            // Remove the overlay
            _this.quill.root.parentNode.removeChild(_this.overlay);
            _this.overlay = undefined;
            // stop listening for image deletion or movement
            document.removeEventListener('keyup', _this.checkImage);
            _this.quill.root.removeEventListener('input', _this.checkImage);
            // reset user-select
            _this.setUserSelect('');
        };
        this.repositionElements = function () {
            if (!_this.overlay || !_this.img) {
                return;
            }
            // position the overlay over the image
            var parent = _this.quill.root.parentNode;
            var imgRect = _this.img.getBoundingClientRect();
            var containerRect = parent.getBoundingClientRect();
            object_1.Object.assign(_this.overlay.style, {
                left: (imgRect.left - containerRect.left - 1 + parent.scrollLeft) + "px",
                top: (imgRect.top - containerRect.top + parent.scrollTop) + "px",
                width: imgRect.width + "px",
                height: imgRect.height + "px",
            });
        };
        this.hide = function () {
            _this.hideOverlay();
            _this.removeModules();
            _this.img = undefined;
        };
        this.setUserSelect = function (value) {
            [
                'userSelect',
                'mozUserSelect',
                'webkitUserSelect',
                'msUserSelect',
            ].forEach(function (prop) {
                // set on contenteditable element and <html>
                _this.quill.root.style[prop] = value;
                document.documentElement.style[prop] = value;
            });
        };
        this.checkImage = function (evt) {
            if (_this.img) {
                if (evt.keyCode == 46 || evt.keyCode == 8) {
                    Quill.find(_this.img).deleteAt(0);
                }
                _this.hide();
            }
        };
        // save the quill reference and options
        this.quill = quill;
        // Apply the options to our defaults, and stash them for later
        // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
        var moduleClasses = false;
        if (options.modules) {
            moduleClasses = options.modules.slice();
        }
        // Apply options to default options
        this.options = lodash_1.defaultsDeep({}, options, defaultoptions_1.default);
        // (see above about moduleClasses)
        if (moduleClasses !== false) {
            this.options.modules = moduleClasses;
        }
        // disable native image resizing on firefox
        document.execCommand('enableObjectResizing', false, 'false');
        // respond to clicks inside the editor
        this.quill.root.addEventListener('click', this.handleClick, false);
        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
        // setup modules
        this.moduleClasses = this.options.modules;
        this.modules = [];
    }
    return ImageResize;
}());
exports.ImageResize = ImageResize;
//if (Quill) {
//    Quill.register('modules/imageResize', ImageResize);
//} 
//# sourceMappingURL=ImageResize.js.map