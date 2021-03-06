﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { emojiList } from './emojilist';
import * as Fuse from 'fuse.js';
import * as Quill from 'quill';

export class ToolbarEmoji {
    private toolbar: any;

    constructor(public quill : Quill.Quill) {
        this.quill = quill;
        this.toolbar  = quill.getModule('toolbar');
        if (typeof this.toolbar != 'undefined') {
            this.toolbar.addHandler('emoji', this.checkPalatteExist);

            const btn : HTMLButtonElement = this.toolbar.container.querySelector('.ql-emoji');
            btn.addEventListener('click', this.checkPalatteExist.bind(this));
        }

        var emojiBtns = document.getElementsByClassName('ql-emoji');
        if (emojiBtns) {
            [].slice.call(emojiBtns).forEach(function (emojiBtn : any) {
                emojiBtn.innerHTML = '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>';
            });
        };
    }

    checkPalatteExist() {
        console.log('fired check');
        let quill = this.quill;
        fn_checkDialogOpen(quill);
        this.quill.on('text-change', function (delta, oldDelta, source) {
            if (source == 'user') {
                fn_close();
                fn_updateRange(quill);
            }
        });
    }
}

function fn_close() {
    let ele_emoji_plate = document.getElementById('emoji-palette');
    document.getElementById('emoji-close-div').style.display = "none";
    if (ele_emoji_plate) { ele_emoji_plate.remove() };
}

function fn_checkDialogOpen(quill : any) {
    let elementExists = document.getElementById("emoji-palette");
    if (elementExists) {
        elementExists.remove();
    }
    else {
        fn_showEmojiPalatte(quill);
    }
}

function fn_updateRange(quill : any) {
    let range = quill.getSelection();
    return range;
}

function fn_showEmojiPalatte(quill: any) {
    console.log('fire show');

    let ele_emoji_area = document.createElement('div');
    let toolbar_container = document.querySelector('.ql-toolbar');
    let range = quill.getSelection();

    const positionIndex = (!!range) ? range.index : 0;
    const atSignBounds = quill.getBounds(positionIndex);

    quill.container.appendChild(ele_emoji_area);
    let paletteMaxPos = atSignBounds.left + 250;//palette max width is 250
    ele_emoji_area.id = 'emoji-palette';
    ele_emoji_area.style.top = 10 + atSignBounds.top + atSignBounds.height + "px";
    if (paletteMaxPos > quill.container.offsetWidth) {
        ele_emoji_area.style.left = (atSignBounds.left - 250) + "px";
    }
    else {
        ele_emoji_area.style.left = atSignBounds.left + "px";
    }


    let tabToolbar = document.createElement('div');
    tabToolbar.id = "tab-toolbar";
    ele_emoji_area.appendChild(tabToolbar);

    //panel
    let panel = document.createElement('div');
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

    let tabElementHolder = document.createElement('ul');
    tabToolbar.appendChild(tabElementHolder);

    if (document.getElementById('emoji-close-div') === null) {
        let closeDiv = document.createElement('div');
        closeDiv.id = 'emoji-close-div';
        closeDiv.addEventListener("click", fn_close, false);
        document.getElementsByTagName('body')[0].appendChild(closeDiv);
    }
    else {
        document.getElementById('emoji-close-div').style.display = "block";
    }


    emojiType.map(function (emojiType) {
        //add tab bar
        let tabElement = document.createElement('li');
        tabElement.classList.add('emoji-tab');
        tabElement.classList.add('filter-' + emojiType.name);
        let tabValue = emojiType.content;
        tabElement.innerHTML = tabValue;
        (tabElement.dataset as any).filter = emojiType.type;
        tabElementHolder.appendChild(tabElement);

        let emojiFilter = document.querySelector('.filter-' + emojiType.name);
        emojiFilter.addEventListener('click', function () {
            let tab = document.querySelector('.active');
            if (tab) {
                tab.classList.remove('active');
            };
            emojiFilter.classList.toggle('active');
            fn_updateEmojiContainer(emojiFilter, panel, quill);
        })
    });
    fn_emojiPanelInit(panel, quill);
}

function fn_emojiPanelInit(panel : any, quill : any) {
    fn_emojiElementsToPanel('p', panel, quill);
    document.querySelector('.filter-people').classList.add('active');
}

function fn_emojiElementsToPanel(type : any, panel : any, quill : any) {
    let fuseOptions = {
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
    let fuse = new Fuse(emojiList, fuseOptions);
    let result = fuse.search(type);
    result.sort(function (a : any, b : any) {
        return a.emoji_order - b.emoji_order;
    });

    quill.focus();
    let range = fn_updateRange(quill);

    result.map(function (emoji : any) {
        let span = document.createElement('span');
        let t = document.createTextNode(emoji.shortname);
        span.appendChild(t);
        span.classList.add('bem');
        span.classList.add('bem-' + emoji.name);
        let output = '' + emoji.code_decimal + '';
        span.innerHTML = output + ' ';
        panel.appendChild(span);

        let customButton = document.querySelector('.bem-' + emoji.name);
        if (customButton) {
            customButton.addEventListener('click', function () {
                quill.insertText(range.index, customButton.innerHTML);
                quill.setSelection(range.index + customButton.innerHTML.length, 0);
                range.index = range.index + customButton.innerHTML.length;
            });
        };
    });
}

function fn_updateEmojiContainer(emojiFilter : any, panel : any, quill : any) {
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
    let type = emojiFilter.dataset.filter;
    fn_emojiElementsToPanel(type, panel, quill);
}