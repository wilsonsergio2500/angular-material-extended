
export module ElementResizeDetector {

    export class IElementResizeDetector {
        constructor();
        elementResizeDetectorMaker(): void;
        listenTo(element: Element, listener: Function): void;
        removeListener(element: Element, listener: Function): void;
        uninstall(element: Element): void;
    }

    export class elementResizeDetectorMaker extends IElementResizeDetector {
        constructor();
    }
}