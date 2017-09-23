// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var emojilist_1 = require('./emojilist');
var Fuse = require('fuse.js');
var Quill = require('quill');
var Delta = Quill.import('delta');
var e = function (tag, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var elem = document.createElement(tag);
    Object.keys(attrs).forEach(function (key) { return elem[key] = attrs[key]; });
    children.forEach(function (child) {
        if (typeof child === "string")
            child = document.createTextNode(child);
        elem.appendChild(child);
    });
    return elem;
};
var Inline = Quill.import('blots/inline');
var EmojiBlot = (function (_super) {
    __extends(EmojiBlot, _super);
    function EmojiBlot() {
        _super.apply(this, arguments);
    }
    EmojiBlot.create = function (unicode) {
        var node = _super.create.call(this);
        node.dataset.unicode = unicode;
        return node;
    };
    EmojiBlot.formats = function (node) {
        return node.dataset.unicode;
    };
    EmojiBlot.prototype.format = function (name, value) {
        if (name === "emoji" && value) {
            this.domNode.dataset.unicode = value;
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    EmojiBlot.prototype.formats = function () {
        var formats = _super.prototype.formats.call(this);
        formats['emoji'] = EmojiBlot.formats(this.domNode);
        return formats;
    };
    return EmojiBlot;
}(Inline));
exports.EmojiBlot = EmojiBlot;
// EmojiBlot.blotName = "emoji";
// EmojiBlot.tagName = "SPAN";
// EmojiBlot.className = "emoji";
//Quill.register({
//    'formats/emoji': EmojiBlot
//});
var ShortNameEmoji = (function () {
    function ShortNameEmoji(quill, props) {
        this.fuseOptions = {};
        this.fuseOptions = {
            shouldSort: true,
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
                "shortname"
            ]
        };
        this.emojiList = emojilist_1.emojiList;
        this.fuse = new Fuse(this.emojiList, this.fuseOptions);
        this.quill = quill;
        this.onClose = props.onClose;
        this.onOpen = props.onOpen;
        this.container = document.createElement('ul');
        this.container.classList.add('emoji_completions');
        this.quill.container.appendChild(this.container);
        this.container.style.position = "absolute";
        this.container.style.display = "none";
        this.onSelectionChange = this.maybeUnfocus.bind(this);
        this.onTextChange = this.update.bind(this);
        this.open = false;
        this.atIndex = null;
        this.focusedButton = null;
        this.isWhiteSpace = function (ch) {
            var whiteSpace = false;
            if (/\s/.test(ch)) {
                whiteSpace = true;
            }
            return whiteSpace;
        };
        quill.keyboard.addBinding({
            // TODO: Once Quill supports using event.key (#1091) use that instead of shift-2
            key: 186,
            shiftKey: true,
        }, this.onAtKey.bind(this));
        quill.keyboard.addBinding({
            key: 39,
            collapsed: true,
            format: ["emoji"]
        }, this.handleArrow.bind(this));
        quill.keyboard.addBinding({
            key: 40,
            collapsed: true,
            format: ["emoji"]
        }, this.handleArrow.bind(this));
        // TODO: Add keybindings for Enter (13) and Tab (9) directly on the quill editor
    }
    ShortNameEmoji.prototype.onAtKey = function (range, context) {
        if (this.open)
            return true;
        if (range.length > 0)
            this.quill.deleteText(range.index, range.length, Quill.sources.USER);
        this.quill.insertText(range.index, ":", "emoji", Quill.sources.USER);
        var atSignBounds = this.quill.getBounds(range.index);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.atIndex = range.index;
        var paletteMaxPos = atSignBounds.left + 250;
        if (paletteMaxPos > this.quill.container.offsetWidth) {
            this.container.style.left = (atSignBounds.left - 250) + "px";
        }
        else {
            this.container.style.left = atSignBounds.left + "px";
        }
        this.container.style.top = atSignBounds.top + atSignBounds.height + "px",
            this.open = true;
        this.quill.on('text-change', this.onTextChange);
        this.quill.once('selection-change', this.onSelectionChange);
        this.update();
        this.onOpen && this.onOpen();
    };
    ShortNameEmoji.prototype.handleArrow = function () {
        if (!this.open)
            return true;
        this.buttons[0].classList.remove('emoji-active');
        this.buttons[0].focus();
        if (this.buttons.length > 1) {
            this.buttons[1].focus();
        }
        ;
    };
    ShortNameEmoji.prototype.update = function () {
        var sel = this.quill.getSelection().index;
        if (this.atIndex >= sel) {
            return this.close(null);
        }
        //Using: fuse.js
        this.query = this.quill.getText(this.atIndex + 1, sel - this.atIndex - 1);
        if (!event && this.isWhiteSpace(this.query)) {
            this.close(null);
            return;
        }
        this.query = this.query.trim();
        var emojis = this.fuse.search(this.query);
        emojis.sort(function (a, b) {
            return a.emoji_order - b.emoji_order;
        });
        if (this.query.length < 3 || emojis.length == 0) {
            this.container.style.display = "none";
            return;
        }
        if (emojis.length > 50) {
            emojis = emojis.slice(0, 40);
        }
        ;
        this.renderCompletions(emojis);
    };
    ShortNameEmoji.prototype.maybeUnfocus = function () {
        if (this.container.querySelector("*:focus"))
            return;
        this.close(null);
    };
    ShortNameEmoji.prototype.renderCompletions = function (emojis) {
        var _this = this;
        if (event) {
            if (event.key === "Enter" || event.keyCode === 13) {
                this.enterEmoji(emojis[0]);
                this.container.style.display = "none";
                return;
            }
            else if (event.key === 'Tab' || event.keyCode === 9) {
                this.quill.disable();
                this.buttons[0].classList.remove('emoji-active');
                this.buttons[1].focus();
                return;
            }
        }
        if (event) {
            return;
        }
        ;
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        var buttons = Array(emojis.length);
        this.buttons = buttons;
        var handler = function (i, emoji) { return function (event) {
            if (event.key === "ArrowRight" || event.keyCode === 39) {
                event.preventDefault();
                buttons[Math.min(buttons.length - 1, i + 1)].focus();
            }
            else if (event.key === 'Tab' || event.keyCode === 9) {
                event.preventDefault();
                if ((i + 1) == buttons.length) {
                    buttons[0].focus();
                    return;
                }
                ;
                buttons[Math.min(buttons.length - 1, i + 1)].focus();
            }
            else if (event.key === "ArrowLeft" || event.keyCode === 37) {
                event.preventDefault();
                buttons[Math.max(0, i - 1)].focus();
            }
            else if (event.key === "ArrowDown" || event.keyCode === 40) {
                event.preventDefault();
                buttons[Math.min(buttons.length - 1, i + 1)].focus();
            }
            else if (event.key === "ArrowUp" || event.keyCode === 38) {
                event.preventDefault();
                buttons[Math.max(0, i - 1)].focus();
            }
            else if (event.key === "Enter" || event.keyCode === 13
                || event.key === " " || event.keyCode === 32
                || event.key === "Tab" || event.keyCode === 9) {
                event.preventDefault();
                _this.quill.enable();
                _this.close(emoji);
            }
        }; };
        emojis.forEach(function (emoji, i) {
            var li = e('li', {}, e('button', { type: "button" }, e("span", { className: "ico", innerHTML: emoji.code_decimal }), 
            // e('span', {className: "matched"}, this.query),
            // e('span', {className: "unmatched"}, emoji.shortname.slice(this.query.length+1))
            e('span', { className: "unmatched" }, emoji.shortname)));
            _this.container.appendChild(li);
            buttons[i] = li.firstChild;
            // Events will be GC-ed with button on each re-render:
            buttons[i].addEventListener('keydown', handler(i, emoji));
            buttons[i].addEventListener("mousedown", function () { return _this.close(emoji); });
            buttons[i].addEventListener("focus", function () { return _this.focusedButton = i; });
            buttons[i].addEventListener("unfocus", function () { return _this.focusedButton = null; });
        });
        this.container.style.display = "block";
        //emoji palette on top
        if (this.quill.container.classList.contains('top-emoji')) {
            var x = this.container.querySelectorAll("li");
            var i = void 0;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = 'block';
            }
            var windowHeight = window.innerHeight;
            var editorPos = this.quill.container.getBoundingClientRect().top;
            if (editorPos > windowHeight / 3 && this.container.offsetHeight > 0) {
                this.container.style.top = '-' + this.container.offsetHeight + "px";
            }
        }
        buttons[0].classList.add('emoji-active');
    };
    ShortNameEmoji.prototype.close = function (value) {
        this.quill.enable();
        this.container.style.display = "none";
        while (this.container.firstChild)
            this.container.removeChild(this.container.firstChild);
        this.quill.off('selection-change', this.onSelectionChange);
        this.quill.off('text-change', this.onTextChange);
        if (value) {
            var name_1 = value.name, unicode = value.unicode, shortname = value.shortname, code_decimal = value.code_decimal;
            var emoji_icon_html = e("span", { className: "ico", innerHTML: ' ' + code_decimal + ' ' });
            var emoji_icon = emoji_icon_html.innerHTML;
            this.quill.deleteText(this.atIndex, this.query.length + 1, Quill.sources.USER);
            this.quill.insertText(this.atIndex, emoji_icon, "emoji", unicode, Quill.sources.USER);
            this.quill.insertText(this.atIndex + emoji_icon.length, " ", 'emoji', false, Quill.sources.USER);
            this.quill.setSelection(this.atIndex + emoji_icon.length, 0, Quill.sources.SILENT);
        }
        this.quill.focus();
        this.open = false;
        this.onClose && this.onClose(value);
    };
    ShortNameEmoji.prototype.enterEmoji = function (value) {
        if (value) {
            var name_2 = value.name, unicode = value.unicode, shortname = value.shortname, code_decimal = value.code_decimal;
            var emoji_icon_html = e("span", { className: "ico", innerHTML: ' ' + code_decimal + ' ' });
            var emoji_icon = emoji_icon_html.innerHTML;
            var delta = new Delta();
            var currentText = this.quill.getSelection();
            var ops = [];
            if (this.atIndex > 0) {
                var endRetain = currentText.index - this.query.length;
                if (endRetain > 2) {
                    endRetain = endRetain - 2;
                }
                ;
                ops.push({ retain: endRetain });
            }
            ;
            ops = ops.concat([
                { delete: this.query.length + 1 },
                { insert: emoji_icon, attributes: { emoji: true } },
                { delete: 1 },
            ]);
            this.quill.updateContents({
                ops: ops
            });
        }
        this.quill.blur();
        this.open = false;
        this.onClose && this.onClose(value);
    };
    return ShortNameEmoji;
}());
exports.ShortNameEmoji = ShortNameEmoji;
//# sourceMappingURL=module-emoji.js.map