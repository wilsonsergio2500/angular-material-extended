// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
var lodash_1 = require('lodash');
var defaultoptions_1 = require('../quill-image-resize-module/defaultoptions');
var displaysize_1 = require('./modules/displaysize');
var Toolbar_1 = require('../quill-image-resize-module/modules/Toolbar');
var resize_1 = require('./modules/resize');
var debounce_1 = require('../../helpers/debounce');
var Quill = require('quill');
var object_1 = require('../../polyfills/object');
var knownModules = { DisplaySize: displaysize_1.DisplaySize, Toolbar: Toolbar_1.Toolbar, Resize: resize_1.Resize };
/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
var ForEach = function (array, Func, scope) {
    if (scope === void 0) { scope = null; }
    for (var i = 0; i < array.length; i++) {
        Func.call(scope, array[i], i);
    }
};
var QUILL_VIDEO_ATTRS = {
    LAYER: 'quill-video-layer',
    IFRAME: 'quill-video-frame'
};
var INVISIBLE_LAYER_CLASS = 'quill-invisible-layer';
var VideoResize = (function () {
    function VideoResize(quill, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.onDestroy = function () {
            console.log('i r destroy');
            _this.quill.root.removeEventListener('scroll', _this.onScroll);
        };
        this.onScroll = function () {
            setTimeout(function () {
                _this.overLayBlur();
                _this.reAdjustLayers();
            }, 2);
        };
        this.reAdjustLayers = function () {
            var parentDiv = _this.quill.root.parentNode;
            ForEach(parentDiv.querySelectorAll("." + INVISIBLE_LAYER_CLASS), function (item, index) {
                var id = item.getAttribute(QUILL_VIDEO_ATTRS.LAYER);
                var frame = _this.quill.root.parentNode.querySelector("." + QUILL_VIDEO_ATTRS.IFRAME + "-" + id);
                setTimeout(function () {
                    _this.repoxShadow(frame);
                }, 1);
            });
        };
        this.onChange = function () {
            var parentDiv = _this.quill.root.parentNode;
            var iframes = parentDiv.querySelectorAll('iframe');
            if (iframes.length > 0) {
                setTimeout(function () {
                    _this.setIframShadow(iframes);
                }, 100);
            }
            else {
                setTimeout(_this.removeFrameInvisibleLayer, 5);
            }
        };
        this.removeFrameInvisibleLayer = function () {
            var parentDiv = _this.quill.root.parentNode;
            ForEach(parentDiv.querySelectorAll("." + INVISIBLE_LAYER_CLASS), function (item, index) {
                parentDiv.removeChild(item);
            });
        };
        this.setIframShadow = function (iframes) {
            for (var i = 0; i < iframes.length; ++i) {
                var iframe = iframes[i];
                iframe.setAttribute(QUILL_VIDEO_ATTRS.IFRAME, i.toString());
                iframe.className = QUILL_VIDEO_ATTRS.IFRAME + "-" + i;
                var invisibleLayer = document.createElement("div");
                invisibleLayer.addEventListener('click', _this.onInvisibleLayerClick);
                var parent_1 = _this.quill.root.parentNode;
                var iframeRect = iframe.getBoundingClientRect();
                var containerRect = parent_1.getBoundingClientRect();
                object_1.Object.assign(invisibleLayer.style, {
                    left: (iframeRect.left - containerRect.left - 1 + parent_1.scrollLeft) + "px",
                    top: (iframeRect.top - containerRect.top + parent_1.scrollTop) + "px",
                    width: iframeRect.width + "px",
                    height: iframeRect.height + "px",
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    border: '1px dashed #444',
                    zIndex: 5
                });
                var indexerClass = QUILL_VIDEO_ATTRS.LAYER + "-" + i;
                invisibleLayer.setAttribute(QUILL_VIDEO_ATTRS.LAYER, i.toString());
                invisibleLayer.className = INVISIBLE_LAYER_CLASS + " " + indexerClass;
                var hasElement = !!_this.quill.root.parentNode.querySelector('.' + indexerClass);
                if (hasElement == false) {
                    _this.quill.root.parentNode.appendChild(invisibleLayer);
                }
            }
        };
        this.repoxShadow = function (iframe) {
            var Id = iframe.getAttribute(QUILL_VIDEO_ATTRS.IFRAME);
            var CurrentLayer = _this.quill.root.parentNode.querySelector("." + QUILL_VIDEO_ATTRS.LAYER + "-" + Id);
            var parent = _this.quill.root.parentNode;
            var iframeRect = iframe.getBoundingClientRect();
            var containerRect = parent.getBoundingClientRect();
            CurrentLayer.style.left = (iframeRect.left - containerRect.left - 1 + parent.scrollLeft) + "px";
            CurrentLayer.style.top = (iframeRect.top - containerRect.top + parent.scrollTop) + "px";
            CurrentLayer.style.width = iframeRect.width + "px";
            CurrentLayer.style.height = iframeRect.height + "px";
        };
        this.onInvisibleLayerClick = function (event) {
            var target = event.target;
            var Id = target.getAttribute(QUILL_VIDEO_ATTRS.LAYER);
            var iframe = _this.quill.root.querySelector("." + QUILL_VIDEO_ATTRS.IFRAME + "-" + Id);
            _this.show(iframe);
        };
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
            if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IFRAME') {
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
            _this.overlay.setAttribute('tabindex', '0');
            _this.overlay.addEventListener('blur', _this.overLayBlur);
            object_1.Object.assign(_this.overlay.style, _this.options.overlayStyles);
            _this.quill.root.parentNode.appendChild(_this.overlay);
            _this.overlay.focus();
            _this.repositionElements();
        };
        this.overLayBlur = function () {
            setTimeout(function () {
                if (_this.overlay) {
                    _this.hide();
                }
            }, 5);
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
                zIndex: 9
            });
            setTimeout(function () {
                _this.repoxShadow(_this.img);
            }, 5);
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
        this.quill.on('text-change', this.onChange);
        this.onScroll = debounce_1.DeBounce(this.onScroll.bind(this), 200);
        this.quill.root.addEventListener('scroll', this.onScroll);
        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
        // setup modules
        this.moduleClasses = this.options.modules;
        this.modules = [];
        this.quill.videoResizerDestroy = this.onDestroy;
    }
    return VideoResize;
}());
exports.VideoResize = VideoResize;
//# sourceMappingURL=VideoResize.js.map