// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
var emojilist_1 = require('./emojilist');
var Fuse = require('fuse.js');
var ToolbarEmoji = (function () {
    function ToolbarEmoji(quill) {
        this.quill = quill;
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        if (typeof this.toolbar != 'undefined') {
            this.toolbar.addHandler('emoji', this.checkPalatteExist);
            var btn = this.toolbar.container.querySelector('.ql-emoji');
            btn.addEventListener('click', this.checkPalatteExist.bind(this));
        }
        var emojiBtns = document.getElementsByClassName('ql-emoji');
        if (emojiBtns) {
            [].slice.call(emojiBtns).forEach(function (emojiBtn) {
                emojiBtn.innerHTML = '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>';
            });
        }
        ;
    }
    ToolbarEmoji.prototype.checkPalatteExist = function () {
        console.log('fired check');
        var quill = this.quill;
        fn_checkDialogOpen(quill);
        this.quill.on('text-change', function (delta, oldDelta, source) {
            if (source == 'user') {
                fn_close();
                fn_updateRange(quill);
            }
        });
    };
    return ToolbarEmoji;
}());
exports.ToolbarEmoji = ToolbarEmoji;
function fn_close() {
    var ele_emoji_plate = document.getElementById('emoji-palette');
    document.getElementById('emoji-close-div').style.display = "none";
    if (ele_emoji_plate) {
        ele_emoji_plate.remove();
    }
    ;
}
function fn_checkDialogOpen(quill) {
    var elementExists = document.getElementById("emoji-palette");
    if (elementExists) {
        elementExists.remove();
    }
    else {
        fn_showEmojiPalatte(quill);
    }
}
function fn_updateRange(quill) {
    var range = quill.getSelection();
    return range;
}
function fn_showEmojiPalatte(quill) {
    console.log('fire show');
    var ele_emoji_area = document.createElement('div');
    var toolbar_container = document.querySelector('.ql-toolbar');
    var range = quill.getSelection();
    var positionIndex = (!!range) ? range.index : 0;
    var atSignBounds = quill.getBounds(positionIndex);
    quill.container.appendChild(ele_emoji_area);
    var paletteMaxPos = atSignBounds.left + 250; //palette max width is 250
    ele_emoji_area.id = 'emoji-palette';
    ele_emoji_area.style.top = 10 + atSignBounds.top + atSignBounds.height + "px";
    if (paletteMaxPos > quill.container.offsetWidth) {
        ele_emoji_area.style.left = (atSignBounds.left - 250) + "px";
    }
    else {
        ele_emoji_area.style.left = atSignBounds.left + "px";
    }
    var tabToolbar = document.createElement('div');
    tabToolbar.id = "tab-toolbar";
    ele_emoji_area.appendChild(tabToolbar);
    //panel
    var panel = document.createElement('div');
    panel.id = "tab-panel";
    ele_emoji_area.appendChild(panel);
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
    var tabElementHolder = document.createElement('ul');
    tabToolbar.appendChild(tabElementHolder);
    if (document.getElementById('emoji-close-div') === null) {
        var closeDiv = document.createElement('div');
        closeDiv.id = 'emoji-close-div';
        closeDiv.addEventListener("click", fn_close, false);
        document.getElementsByTagName('body')[0].appendChild(closeDiv);
    }
    else {
        document.getElementById('emoji-close-div').style.display = "block";
    }
    emojiType.map(function (emojiType) {
        //add tab bar
        var tabElement = document.createElement('li');
        tabElement.classList.add('emoji-tab');
        tabElement.classList.add('filter-' + emojiType.name);
        var tabValue = emojiType.content;
        tabElement.innerHTML = tabValue;
        tabElement.dataset.filter = emojiType.type;
        tabElementHolder.appendChild(tabElement);
        var emojiFilter = document.querySelector('.filter-' + emojiType.name);
        emojiFilter.addEventListener('click', function () {
            var tab = document.querySelector('.active');
            if (tab) {
                tab.classList.remove('active');
            }
            ;
            emojiFilter.classList.toggle('active');
            fn_updateEmojiContainer(emojiFilter, panel, quill);
        });
    });
    fn_emojiPanelInit(panel, quill);
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
function fn_updateEmojiContainer(emojiFilter, panel, quill) {
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
    var type = emojiFilter.dataset.filter;
    fn_emojiElementsToPanel(type, panel, quill);
}
//# sourceMappingURL=module-toolbar-emoji.js.map