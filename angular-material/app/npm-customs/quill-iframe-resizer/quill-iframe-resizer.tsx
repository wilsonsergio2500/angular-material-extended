// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Quill from 'quill';
import { Object } from '../../polyfills/object';
import DefaultOptions from '../quill-image-resize-module/defaultoptions';


export class QuillIFrameResizer {
    quill: any;
    iframe: HTMLIFrameElement;
    overlay: any;

    constructor(quill: Quill.Quill, options: any = {}) {
        this.quill = quill;

        // disable native image resizing on firefox
        document.execCommand('enableObjectResizing', false, 'false');

        // respond to clicks inside the editor
        this.quill.root.addEventListener('click', this.handleClick, false);
        this.quill.root.addEventListener('focus', this.onFocus, false);
        this.quill.root.addEventListener('blur', this.onBlur, false);

        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
    }
    onBlur = () => {
        console.log('you blured');
    }

    onFocus = () => {
        console.log('you focused');
        var parentDiv: HTMLDivElement = this.quill.root.parentNode;
        var iframes  = parentDiv.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; ++i){
            this.show(iframes[i]);
        }


        //console.log(parentDiv);
    }

    handleClick = (evt: any) => {
        console.log('click handler');
        if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IFRAME') {
            if (this.iframe === evt.target) {
                // we are already focused on this image
                return;
            }
            if (this.iframe) {
                // we were just focused on another image
                this.hide();
            }
            // clicked on an image inside the editor
            this.show(evt.target);
        } else if (this.iframe) {
            // clicked on a non image
            this.hide();
        }
    };

    show = (iframe: any) => {
        // keep track of this img element
        this.iframe = iframe;

        this.showOverlay();

        //this.initializeModules();
    };

    showOverlay = () => {
        if (this.overlay) {
            this.hideOverlay();
        }

        this.quill.setSelection(null);

        // prevent spurious text selection
        this.setUserSelect('none');

        // listen for the image being deleted or moved
        document.addEventListener('keyup', this.checkIframe, true);
        this.quill.root.addEventListener('input', this.checkIframe, true);

        // Create and add the overlay
        this.overlay = document.createElement('div');
        Object.assign(this.overlay.style, DefaultOptions.overlayStyles);

        this.quill.root.parentNode.appendChild(this.overlay);

        this.repositionElements();
    };

    repositionElements = () => {
        if (!this.overlay || !this.iframe) {
            return;
        }

        // position the overlay over the image
        const parent = this.quill.root.parentNode;
        const imgRect = this.iframe.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();

        Object.assign(this.overlay.style, {
            left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
            top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
        });
    };

    setUserSelect = (value: any) => {
        [
            'userSelect',
            'mozUserSelect',
            'webkitUserSelect',
            'msUserSelect',
        ].forEach((prop) => {
            // set on contenteditable element and <html>
            this.quill.root.style[prop] = value;
            (document as any).documentElement.style[prop] = value;
        });
    };

    checkIframe = (evt: any) => {
        if (this.iframe) {
            if (evt.keyCode == 46 || evt.keyCode == 8) {
                (Quill as any).find(this.iframe).deleteAt(0);
            }
            this.hide();
        }
    };

    hide = () => {
        this.hideOverlay();
        //this.removeModules();
        this.iframe = undefined;
    };

    hideOverlay = () => {
        if (!this.overlay) {
            return;
        }

        // Remove the overlay
        this.quill.root.parentNode.removeChild(this.overlay);
        this.overlay = undefined;

        // stop listening for image deletion or movement
        document.removeEventListener('keyup', this.checkIframe);
        this.quill.root.removeEventListener('input', this.checkIframe);

        // reset user-select
        this.setUserSelect('');
    };
}