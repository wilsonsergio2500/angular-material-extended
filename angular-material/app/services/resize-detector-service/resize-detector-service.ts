

import { APP_MODULE } from '../../main/index';
import { ElementResizeDetector } from '../../custom-typings/element-resize-detector/element-resize-detector';
const ResizeDetectorWorker: any = (require('element-resize-detector') as any);


export namespace ResizeDetector{


    export interface IResizeDetectorService {
        Subscribe(element: Element, func: Function) : void;
        Unsubscribe(elment: Element, func: Function): void;
    }

   export class ResizeDetectorService implements IResizeDetectorService {
        private SizeDetector: ElementResizeDetector.IElementResizeDetector;
        constructor() {
            this.SizeDetector = new ResizeDetectorWorker();
        }
        Subscribe = (element: Element, func: Function) => {
            this.SizeDetector.listenTo(element, func);
        }
        Unsubscribe = (element: Element, func: Function) => {
            this.SizeDetector.removeListener(element, func);
        }
        
    }

    APP_MODULE.service("ResizeDetectorService", ResizeDetectorService);
}
