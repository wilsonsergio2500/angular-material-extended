// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import { emojiList } from './emojilist';
import * as Fuse from 'fuse.js';
import * as Quill from 'quill';


const Delta = Quill.import('delta');
const e = (tag : any, attrs : any, ...children : any[]) => {
    const elem : any = document.createElement(tag);
    Object.keys(attrs).forEach(key => elem[key] = attrs[key]);
    children.forEach(child => {
        if (typeof child === "string")
            child = document.createTextNode(child);
        elem.appendChild(child);
    });
    return elem;
};
interface IInline {
    new (params: any): IInline;
    create(unc? : any): any;
    format(name: any, val: any): any;
    formats(node? : any): any;
}
const Inline : IInline = Quill.import('blots/inline');
export class EmojiBlot extends Inline {
    private domNode: any;
    static create(unicode : any) {
        const node : any = super.create();
        node.dataset.unicode = unicode;
        return node;
    }
    static formats(node : any) {
        return node.dataset.unicode;
    }
    format(name : any, value : any) {
        if (name === "emoji" && value) {
            this.domNode.dataset.unicode = value;
        } else {
            super.format(name, value);
        }
    }

    formats() {
        const formats : any = super.formats();
        formats['emoji'] = EmojiBlot.formats(this.domNode);
        return formats;
    }
}

// EmojiBlot.blotName = "emoji";
// EmojiBlot.tagName = "SPAN";
// EmojiBlot.className = "emoji";

//Quill.register({
//    'formats/emoji': EmojiBlot
//});

export class ShortNameEmoji {
    private fuseOptions = {}
    private emojiList: any;
    private fuse: any;
    private quill: any;
    private onClose: any;
    private onOpen: any;
    private container: any;
    private onSelectionChange: any;
    private onTextChange: any;
    private open: boolean;
    private atIndex: any;
    private focusedButton: any;
    private isWhiteSpace: any;
    private buttons: any[];
    private query: any;

    constructor(quill : any, props : any) {
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
        this.emojiList = emojiList;
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

        this.isWhiteSpace = function (ch : any) {
            var whiteSpace = false;
            if (/\s/.test(ch)) {
                whiteSpace = true;
            }
            return whiteSpace;
        }

        quill.keyboard.addBinding({
            // TODO: Once Quill supports using event.key (#1091) use that instead of shift-2
            key: 186,  // 2
            shiftKey: true,
        }, this.onAtKey.bind(this));

        quill.keyboard.addBinding({
            key: 39,  // ArrowRight
            collapsed: true,
            format: ["emoji"]
        }, this.handleArrow.bind(this));

        quill.keyboard.addBinding({
            key: 40,  // ArrowRight
            collapsed: true,
            format: ["emoji"]
        }, this.handleArrow.bind(this));
        // TODO: Add keybindings for Enter (13) and Tab (9) directly on the quill editor
    }

    onAtKey(range : any, context : any) {
        if (this.open) return true;
        if (range.length > 0)
            this.quill.deleteText(range.index, range.length, (Quill as any).sources.USER);

        this.quill.insertText(range.index, ":", "emoji", (Quill as any).sources.USER);
        const atSignBounds = this.quill.getBounds(range.index);
        this.quill.setSelection(range.index + 1, (Quill as any).sources.SILENT);

        this.atIndex = range.index;

        let paletteMaxPos = atSignBounds.left + 250;
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
    }

    handleArrow() {
        if (!this.open) return true;
        this.buttons[0].classList.remove('emoji-active');
        this.buttons[0].focus();
        if (this.buttons.length > 1) {
            this.buttons[1].focus();
        };
    }

    update() {
        const sel = this.quill.getSelection().index;
        if (this.atIndex >= sel) { // Deleted the at character
            return this.close(null);
        }
        //Using: fuse.js
        this.query = this.quill.getText(this.atIndex + 1, sel - this.atIndex - 1);
        if (!event && this.isWhiteSpace(this.query)) {
            this.close(null);
            return;
        }

        this.query = this.query.trim();

        let emojis = this.fuse.search(this.query);
        emojis.sort(function (a : any, b : any) {
            return a.emoji_order - b.emoji_order;
        });

        if (this.query.length < 3 || emojis.length == 0) {
            this.container.style.display = "none";
            return;
        }
        if (emojis.length > 50) { //return only 50
            emojis = emojis.slice(0, 40);
        };
        this.renderCompletions(emojis);
    }

    maybeUnfocus() {
        if (this.container.querySelector("*:focus")) return;
        this.close(null);
    }

    renderCompletions(emojis : any) {
        if (event) {
            if ((event as any).key === "Enter" || (event as any).keyCode === 13) {
                this.enterEmoji(emojis[0]);
                this.container.style.display = "none";
                return;
            }
            else if ((event as any).key === 'Tab' || (event as any).keyCode === 9) {
                this.quill.disable();
                this.buttons[0].classList.remove('emoji-active');
                this.buttons[1].focus();
                return;
            }
        }
        if (event) { return; };
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        const buttons = Array(emojis.length);
        this.buttons = buttons;

        const handler = (i : any, emoji : any) => (event : any) => {
            if (event.key === "ArrowRight" || event.keyCode === 39) {
                event.preventDefault();
                buttons[Math.min(buttons.length - 1, i + 1)].focus();
            }
            else if (event.key === 'Tab' || event.keyCode === 9) {
                event.preventDefault();
                if ((i + 1) == buttons.length) {
                    buttons[0].focus();
                    return;
                };
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
                this.quill.enable();
                this.close(emoji);
            }
        };

        emojis.forEach((emoji : any, i : any) => {
            const li = e('li', {},
                e('button', { type: "button" },
                    e("span", { className: "ico", innerHTML: emoji.code_decimal }),
                    // e('span', {className: "matched"}, this.query),
                    // e('span', {className: "unmatched"}, emoji.shortname.slice(this.query.length+1))
                    e('span', { className: "unmatched" }, emoji.shortname),
                ));
            this.container.appendChild(li);
            buttons[i] = li.firstChild;
            // Events will be GC-ed with button on each re-render:
            buttons[i].addEventListener('keydown', handler(i, emoji));
            buttons[i].addEventListener("mousedown", () => this.close(emoji));
            buttons[i].addEventListener("focus", () => this.focusedButton = i);
            buttons[i].addEventListener("unfocus", () => this.focusedButton  = null as any);
        });

        this.container.style.display = "block";
        //emoji palette on top
        if (this.quill.container.classList.contains('top-emoji')) {
            let x = this.container.querySelectorAll("li");
            let i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = 'block';
            }

            let windowHeight = window.innerHeight;
            let editorPos = this.quill.container.getBoundingClientRect().top;
            if (editorPos > windowHeight / 3 && this.container.offsetHeight > 0) {
                this.container.style.top = '-' + this.container.offsetHeight + "px";
            }
        }

        buttons[0].classList.add('emoji-active');
    }

    close(value : any) {
        this.quill.enable();
        this.container.style.display = "none";
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
        this.quill.off('selection-change', this.onSelectionChange);
        this.quill.off('text-change', this.onTextChange);
        if (value) {
            const {name, unicode, shortname, code_decimal} = value;
            let emoji_icon_html = e("span", { className: "ico", innerHTML: ' ' + code_decimal + ' ' });
            let emoji_icon = emoji_icon_html.innerHTML;
            this.quill.deleteText(this.atIndex, this.query.length + 1, (Quill as any).sources.USER);
            this.quill.insertText(this.atIndex, emoji_icon, "emoji", unicode, (Quill as any).sources.USER);
            this.quill.insertText(this.atIndex + emoji_icon.length, " ", 'emoji', false, (Quill as any).sources.USER);
            this.quill.setSelection(this.atIndex + emoji_icon.length, 0, (Quill as any).sources.SILENT);
        }
        this.quill.focus();
        this.open = false;
        this.onClose && this.onClose(value);
    }
    enterEmoji(value : any) {
        if (value) {
            const {name, unicode, shortname, code_decimal} = value;
            let emoji_icon_html = e("span", { className: "ico", innerHTML: ' ' + code_decimal + ' ' });
            let emoji_icon = emoji_icon_html.innerHTML;
            let delta = new Delta();
            let currentText = this.quill.getSelection();
            let ops : any[] = [];
            if (this.atIndex > 0) {
                let endRetain = currentText.index - this.query.length;
                if (endRetain > 2) {
                    endRetain = endRetain - 2;
                };
                ops.push({ retain: endRetain });
            };
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
    }
}