// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { MergeObject } from '../../helpers/mergeobject';
import DefaultOptions from '../quill-image-resize-module/defaultoptions';
import { DisplaySize } from './modules/displaysize';
import { Toolbar } from '../quill-image-resize-module/modules/Toolbar';
import { Resize } from './modules/resize';
import { DeBounce } from '../../helpers/debounce';

import * as Quill from 'quill';
import { Object } from '../../polyfills/object'


const knownModules: any = { DisplaySize, Toolbar, Resize };

/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
const ForEach = <T extends Node>(array: NodeListOf<Element>, Func: (value: T, index: number) => void, scope: any = null) => {
    for (let i = 0; i < array.length; i++) {
        Func.call(scope, array[i], i);
    }
}



const QUILL_VIDEO_ATTRS = {
    LAYER: 'quill-video-layer',
    IFRAME: 'quill-video-frame'
}
const INVISIBLE_LAYER_CLASS = 'quill-invisible-layer';
export class VideoResize {
    quill: any;
    options: any;
    modules: any[];
    moduleClasses: any[];
    img: any;
    overlay: HTMLDivElement;
    iframes: any[];

    invFrameLayer: HTMLDivElement;

    constructor(quill: Quill.Quill, options: any = {}) {
        // save the quill reference and options
        this.quill = quill;

        // Apply the options to our defaults, and stash them for later
        // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
        let moduleClasses = false;
        if (options.modules) {
            moduleClasses = options.modules.slice();
        }
        
        // Apply options to default options
        this.options = MergeObject({}, options, DefaultOptions);

        // (see above about moduleClasses)
        if (moduleClasses !== false) {
            this.options.modules = moduleClasses;
        }

        // disable native image resizing on firefox
        document.execCommand('enableObjectResizing', false, 'false');

        // respond to clicks inside the editor
        this.quill.root.addEventListener('click', this.handleClick, false);
        this.quill.on('text-change', this.onChange);

        this.onScroll = DeBounce(this.onScroll.bind(this), 200);
        this.quill.root.addEventListener('scroll', this.onScroll);

        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';

        // setup modules
        this.moduleClasses = this.options.modules;

        this.modules = [];
        this.quill.videoResizerDestroy = this.onDestroy;
    }
    onDestroy = () => {
        console.log('i r destroy');
        (this.quill.root as HTMLDivElement).removeEventListener('scroll', this.onScroll);
    };
    onScroll = () => {
        setTimeout(() => {
            this.overLayBlur();
            this.reAdjustLayers();
        }, 2);
    }
    reAdjustLayers = () => {
        let parentDiv: HTMLDivElement = this.quill.root.parentNode;
        ForEach<HTMLDivElement>(parentDiv.querySelectorAll(`.${INVISIBLE_LAYER_CLASS}`), (item, index) => {
            const id = item.getAttribute(QUILL_VIDEO_ATTRS.LAYER);
            const frame = (this.quill.root.parentNode as HTMLDivElement).querySelector(`.${QUILL_VIDEO_ATTRS.IFRAME}-${id}`) as HTMLIFrameElement;
            setTimeout(() => {
                this.repoxShadow(frame);
            }, 1);

        }); 
    }
   
    onChange = () => {
        var parentDiv: HTMLDivElement = this.quill.root.parentNode;
        const iframes = parentDiv.querySelectorAll('iframe');
        if (iframes.length > 0) {
            setTimeout(() => {
                this.setIframShadow(iframes);
            }, 100);
        } else {
            setTimeout(this.removeFrameInvisibleLayer, 5);
        }
    }
    removeFrameInvisibleLayer = () => {
        let parentDiv: HTMLDivElement = this.quill.root.parentNode;
        ForEach<HTMLDivElement>(parentDiv.querySelectorAll(`.${INVISIBLE_LAYER_CLASS}`), (item, index) => {
            parentDiv.removeChild(item);
        }); 

    }

    setIframShadow = (iframes: NodeListOf<HTMLIFrameElement>) => {
        for (var i = 0; i < iframes.length; ++i) {
            const iframe = iframes[i];
            iframe.setAttribute(QUILL_VIDEO_ATTRS.IFRAME, i.toString());
            iframe.className = `${QUILL_VIDEO_ATTRS.IFRAME}-${i}`;

            const invisibleLayer: HTMLDivElement = document.createElement("div");
            invisibleLayer.addEventListener('click', this.onInvisibleLayerClick );
            

            const parent = this.quill.root.parentNode;
            const iframeRect = iframe.getBoundingClientRect();
            const containerRect = parent.getBoundingClientRect();

            Object.assign(invisibleLayer.style, {
                left: `${iframeRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
                top: `${iframeRect.top - containerRect.top + parent.scrollTop}px`,
                width: `${iframeRect.width}px`,
                height: `${iframeRect.height}px`,
                backgroundColor : 'transparent',
                position: 'absolute',
                border: '1px dashed #444',
                zIndex: 5
            });

            const indexerClass = `${QUILL_VIDEO_ATTRS.LAYER}-${i}`
            invisibleLayer.setAttribute(QUILL_VIDEO_ATTRS.LAYER, i.toString());
            invisibleLayer.className = `${INVISIBLE_LAYER_CLASS} ${indexerClass}`;

            const hasElement = !!(this.quill.root.parentNode as HTMLDivElement).querySelector('.' + indexerClass);
            if (hasElement == false) {
                this.quill.root.parentNode.appendChild(invisibleLayer);
            }
           
        }
    }
   
    repoxShadow = (iframe: HTMLIFrameElement) => {
        const Id  = iframe.getAttribute(QUILL_VIDEO_ATTRS.IFRAME);
        let CurrentLayer : HTMLDivElement = (this.quill.root.parentNode as HTMLDivElement).querySelector(`.${QUILL_VIDEO_ATTRS.LAYER}-${Id}`) as HTMLDivElement;

        const parent = this.quill.root.parentNode;
        const iframeRect = iframe.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();


        CurrentLayer.style.left = `${iframeRect.left - containerRect.left - 1 + parent.scrollLeft}px`;
        CurrentLayer.style.top = `${iframeRect.top - containerRect.top + parent.scrollTop}px`;
        CurrentLayer.style.width = `${iframeRect.width}px`;
        CurrentLayer.style.height = `${iframeRect.height}px`;
        
    }
    onInvisibleLayerClick = (event: MouseEvent) => {
        const target : HTMLDivElement = event.target as HTMLDivElement;
        const Id = target.getAttribute(QUILL_VIDEO_ATTRS.LAYER);
        const iframe = (this.quill.root as HTMLDivElement).querySelector(`.${QUILL_VIDEO_ATTRS.IFRAME}-${Id}`);
        this.show(iframe);
        
    }
   

    initializeModules = () => {
        this.removeModules();

        this.modules = this.moduleClasses.map(
            ModuleClass => new (knownModules[ModuleClass] || ModuleClass)(this),
        );

        this.modules.forEach(
            (module) => {
                module.onCreate();
            },
        );

        this.onUpdate();
    };

    onUpdate = () => {
        this.repositionElements();
        this.modules.forEach(
            (module) => {
                module.onUpdate();
            },
        );
    };

    removeModules = () => {
        this.modules.forEach(
            (module) => {
                module.onDestroy();
            },
        );

        this.modules = [];
    };

    handleClick = (evt: any) => {
        if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IFRAME') {
            if (this.img === evt.target) {
                // we are already focused on this image
                return;
            }
            if (this.img) {
                // we were just focused on another image
                this.hide();
            }
            // clicked on an image inside the editor
            this.show(evt.target);
        } else if (this.img) {
            // clicked on a non image
            this.hide();
        }
    };

    show = (img: any) => {
        // keep track of this img element
        this.img = img;

        this.showOverlay();

        this.initializeModules();
    };

    showOverlay = () => {
        if (this.overlay) {
            this.hideOverlay();
        }

        this.quill.setSelection(null);

        // prevent spurious text selection
        this.setUserSelect('none');

        // listen for the image being deleted or moved
        document.addEventListener('keyup', this.checkImage, true);
        this.quill.root.addEventListener('input', this.checkImage, true);

        // Create and add the overlay
        this.overlay  = document.createElement('div');
        this.overlay.setAttribute('tabindex', '0');
        this.overlay.addEventListener('blur', this.overLayBlur);

        Object.assign(this.overlay.style, this.options.overlayStyles);

        this.quill.root.parentNode.appendChild(this.overlay);
        this.overlay.focus();

        this.repositionElements();
    };
    overLayBlur = () => {
        setTimeout(() => {
            if (this.overlay) {
                this.hide();
            }
        }, 5);
    }

    hideOverlay = () => {
        if (!this.overlay) {
            return;
        }

        // Remove the overlay
        this.quill.root.parentNode.removeChild(this.overlay);
        this.overlay = undefined;

        // stop listening for image deletion or movement
        document.removeEventListener('keyup', this.checkImage);
        this.quill.root.removeEventListener('input', this.checkImage);

        // reset user-select
        this.setUserSelect('');
    };

    repositionElements = () => {
        if (!this.overlay || !this.img) {
            return;
        }

        // position the overlay over the image
        const parent = this.quill.root.parentNode;
        const imgRect = this.img.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();

        Object.assign(this.overlay.style, {
            left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
            top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            zIndex: 9
        });
        setTimeout(() => {
            this.repoxShadow(this.img);
        }, 5);
    };

    hide = () => {
        this.hideOverlay();
        this.removeModules();
        this.img = undefined;
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

    checkImage = (evt: any) => {
        if (this.img) {
            if (evt.keyCode == 46 || evt.keyCode == 8) {
                (Quill as any).find(this.img).deleteAt(0);
            }
            this.hide();
        }
    };
}