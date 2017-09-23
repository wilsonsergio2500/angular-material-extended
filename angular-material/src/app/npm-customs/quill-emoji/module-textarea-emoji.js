// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
var emojilist_1 = require('./emojilist');
var Fuse = require('fuse.js');
var TextAreaEmoji = (function () {
    function TextAreaEmoji(quill) {
        this.quill = quill;
        this.quill = quill;
        this.container = document.createElement('div');
        this.container.classList.add('textarea-emoji-control');
        this.container.style.position = "absolute";
        this.container.innerHTML = '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>';
        this.quill.container.appendChild(this.container);
        this.container.addEventListener('click', this.checkEmojiBoxExist.bind(this), false);
    }
    TextAreaEmoji.prototype.checkEmojiBoxExist = function () {
        var elementExists = document.getElementById("textarea-emoji");
        if (elementExists) {
            elementExists.remove();
        }
        else {
            var ele_emoji_area = document.createElement('div');
            ele_emoji_area.id = 'textarea-emoji';
            this.quill.container.appendChild(ele_emoji_area);
            var tabToolbar = document.createElement('div');
            tabToolbar.id = "tab-toolbar";
            ele_emoji_area.appendChild(tabToolbar);
            var emojiType = [
                { 'type': 'p', 'name': 'people', 'content': '<div class="i-people"></div>' },
                { 'type': 'n', 'name': 'nature', 'content': '<div class="i-nature"></div>' },
                { 'type': 'd', 'name': 'food', 'content': '<div class="i-food"></div>' },
                { 'type': 's', 'name': 'symbols', 'content': '<div class="i-symbols"></div>' },
                { 'type': 'a', 'name': 'activity', 'content': '<div class="i-activity"></div>' },
                { 'type': 't', 'name': 'travel', 'content': '<div class="i-travel"></div>' },
                { 'type': 'o', 'name': 'objects', 'content': '<div class="i-objects"></div>' },
                { 'type': 'f', 'name': 'flags', 'content': '<div class="i-flags"></div>' }
            ];
            var tabElementHolder_1 = document.createElement('ul');
            tabToolbar.appendChild(tabElementHolder_1);
            if (document.getElementById('emoji-close-div') === null) {
                var closeDiv = document.createElement('div');
                closeDiv.id = 'emoji-close-div';
                closeDiv.addEventListener("click", fn_close, false);
                document.getElementsByTagName('body')[0].appendChild(closeDiv);
            }
            else {
                document.getElementById('emoji-close-div').style.display = "block";
            }
            var panel_1 = document.createElement('div');
            panel_1.id = "tab-panel";
            ele_emoji_area.appendChild(panel_1);
            var innerQuill_1 = this.quill;
            emojiType.map(function (emojiType) {
                var tabElement = document.createElement('li');
                tabElement.classList.add('emoji-tab');
                tabElement.classList.add('filter-' + emojiType.name);
                var tabValue = emojiType.content;
                tabElement.innerHTML = tabValue;
                tabElement.dataset.filter = emojiType.type;
                tabElementHolder_1.appendChild(tabElement);
                var emojiFilter = document.querySelector('.filter-' + emojiType.name);
                emojiFilter.addEventListener('click', function () {
                    var tab = document.querySelector('.active');
                    if (tab) {
                        tab.classList.remove('active');
                    }
                    ;
                    emojiFilter.classList.toggle('active');
                    while (panel_1.firstChild) {
                        panel_1.removeChild(panel_1.firstChild);
                    }
                    var type = emojiFilter.dataset.filter;
                    fn_emojiElementsToPanel(type, panel_1, innerQuill_1);
                });
            });
            var windowHeight = window.innerHeight;
            var editorPos = this.quill.container.getBoundingClientRect().top;
            if (editorPos > windowHeight / 3) {
                ele_emoji_area.style.top = '-250px';
            }
            fn_emojiPanelInit(panel_1, this.quill);
        }
    };
    return TextAreaEmoji;
}());
exports.TextAreaEmoji = TextAreaEmoji;
function fn_close() {
    var ele_emoji_plate = document.getElementById('textarea-emoji');
    document.getElementById('emoji-close-div').style.display = "none";
    if (ele_emoji_plate) {
        ele_emoji_plate.remove();
    }
    ;
}
function fn_updateRange(quill) {
    var range = quill.getSelection();
    return range;
}
function fn_emojiPanelInit(panel, quill) {
    fn_emojiElementsToPanel('p', panel, quill);
    document.querySelector('.filter-people').classList.add('active');
}
function fn_emojiElementsToPanel(type, panel, quill) {
    var fuseOptions = {
        shouldSort: true,
        matchAllTokens: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: [
            "category"
        ]
    };
    var fuse = new Fuse(emojilist_1.emojiList, fuseOptions);
    var result = fuse.search(type);
    result.sort(function (a, b) {
        return a.emoji_order - b.emoji_order;
    });
    quill.focus();
    var range = fn_updateRange(quill);
    result.map(function (emoji) {
        var span = document.createElement('span');
        var t = document.createTextNode(emoji.shortname);
        span.appendChild(t);
        span.classList.add('bem');
        span.classList.add('bem-' + emoji.name);
        var output = '' + emoji.code_decimal + '';
        span.innerHTML = output + ' ';
        panel.appendChild(span);
        var customButton = document.querySelector('.bem-' + emoji.name);
        if (customButton) {
            customButton.addEventListener('click', function () {
                quill.insertText(range.index, customButton.innerHTML);
                quill.setSelection(range.index + customButton.innerHTML.length, 0);
                range.index = range.index + customButton.innerHTML.length;
            });
        }
        ;
    });
}
//# sourceMappingURL=module-textarea-emoji.js.map