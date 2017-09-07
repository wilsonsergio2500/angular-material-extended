import { BaseModule } from '../../quill-image-resize-module/modules/BaseModule';
import { Object } from '../../../polyfills/object';

export class DisplaySize extends BaseModule {
    display: HTMLDivElement;
    options: any;
    img: HTMLIFrameElement;

    onCreate = () => {
        // Create the container to hold the size display
        this.display = document.createElement('div');

        // Apply styles
        Object.assign(this.display.style, this.options.displayStyles);

        // Attach it
        this.overlay.appendChild(this.display);
    };

    onDestroy = () => { };

    onUpdate = () => {
        if (!this.display || !this.img) {
            return;
        }

        //console.log(this.img.naturalWidth);
        console.log(this.img.clientWidth);
        //confirm.log(this.img.
        const size = this.getCurrentSize();

        this.display.innerHTML = size.join(' &times; ');
        if (size[0] > 120 && size[1] > 30) {
            // position on top of image
            Object.assign(this.display.style, {
                right: '4px',
                bottom: '4px',
                left: 'auto',
            });
        }
        else if ((this.img.style as any).float == 'right') {
            // position off bottom left
            const dispRect = this.display.getBoundingClientRect();
            Object.assign(this.display.style, {
                right: 'auto',
                bottom: `-${dispRect.height + 4}px`,
                left: `-${dispRect.width + 4}px`,
            });
        }
        else {
            // position off bottom right
            const dispRect = this.display.getBoundingClientRect();
            Object.assign(this.display.style, {
                right: `-${dispRect.width + 4}px`,
                bottom: `-${dispRect.height + 4}px`,
                left: 'auto',
            });
        }
    };

    getCurrentSize = () => [
        this.img.clientWidth, this.img.clientHeight
        //Math.round((this.img.width / this.img.naturalWidth) * this.img.naturalHeight),
    ];
}