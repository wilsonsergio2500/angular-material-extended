"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IconAlignLeft = require('!raw-loader!quill/assets/icons/align-left.svg');
var IconAlignCenter = require('!raw-loader!quill/assets/icons/align-center.svg');
var IconAlignRight = require('!raw-loader!quill/assets/icons/align-right.svg');
var BaseModule_1 = require('./BaseModule');
var object_1 = require('../../../polyfills/object');
var Quill = require('quill');
var Parchment = Quill.imports.parchment;
var FloatStyle = new Parchment.Attributor.Style('float', 'float');
var MarginStyle = new Parchment.Attributor.Style('margin', 'margin');
var DisplayStyle = new Parchment.Attributor.Style('display', 'display');
var Toolbar = (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = this;
        _super.apply(this, arguments);
        this.onCreate = function () {
            // Setup Toolbar
            _this.toolbar = document.createElement('div');
            object_1.Object.assign(_this.toolbar.style, _this.options.toolbarStyles);
            _this.overlay.appendChild(_this.toolbar);
            // Setup Buttons
            _this._defineAlignments();
            _this._addToolbarButtons();
        };
        // The toolbar and its children will be destroyed when the overlay is removed
        this.onDestroy = function () { };
        // Nothing to update on drag because we are are positioned relative to the overlay
        this.onUpdate = function () { };
        this._defineAlignments = function () {
            _this.alignments = [
                {
                    icon: IconAlignLeft,
                    apply: function () {
                        DisplayStyle.add(_this.img, 'inline');
                        FloatStyle.add(_this.img, 'left');
                        MarginStyle.add(_this.img, '0 1em 1em 0');
                    },
                    isApplied: function () { return FloatStyle.value(_this.img) == 'left'; },
                },
                {
                    icon: IconAlignCenter,
                    apply: function () {
                        DisplayStyle.add(_this.img, 'block');
                        FloatStyle.remove(_this.img);
                        MarginStyle.add(_this.img, 'auto');
                    },
                    isApplied: function () { return MarginStyle.value(_this.img) == 'auto'; },
                },
                {
                    icon: IconAlignRight,
                    apply: function () {
                        DisplayStyle.add(_this.img, 'inline');
                        FloatStyle.add(_this.img, 'right');
                        MarginStyle.add(_this.img, '0 0 1em 1em');
                    },
                    isApplied: function () { return FloatStyle.value(_this.img) == 'right'; },
                },
            ];
        };
        this._addToolbarButtons = function () {
            var buttons = [];
            _this.alignments.forEach(function (alignment, idx) {
                var button = document.createElement('span');
                buttons.push(button);
                button.innerHTML = alignment.icon;
                button.addEventListener('click', function () {
                    // deselect all buttons
                    buttons.forEach(function (button) { return button.style.filter = ''; });
                    if (alignment.isApplied()) {
                        // If applied, unapply
                        FloatStyle.remove(_this.img);
                        MarginStyle.remove(_this.img);
                        DisplayStyle.remove(_this.img);
                    }
                    else {
                        // otherwise, select button and apply
                        _this._selectButton(button);
                        alignment.apply();
                    }
                    // image may change position; redraw drag handles
                    _this.requestUpdate();
                });
                object_1.Object.assign(button.style, _this.options.toolbarButtonStyles);
                if (idx > 0) {
                    button.style.borderLeftWidth = '0';
                }
                object_1.Object.assign(button.children[0].style, _this.options.toolbarButtonSvgStyles);
                if (alignment.isApplied()) {
                    // select button if previously applied
                    _this._selectButton(button);
                }
                _this.toolbar.appendChild(button);
            });
        };
        this._selectButton = function (button) {
            button.style.filter = 'invert(20%)';
        };
    }
    return Toolbar;
}(BaseModule_1.BaseModule));
exports.Toolbar = Toolbar;
//# sourceMappingURL=Toolbar.js.map