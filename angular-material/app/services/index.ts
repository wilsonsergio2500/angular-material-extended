/// <reference path="img-enums/imgenums.ts" />
import { ResizeDetector } from './resize-detector-service/resize-detector-service';
import { ImageEnums } from './img-enums/imgenums';
export namespace Services {


    export interface IResizeDetectorService extends ResizeDetector.IResizeDetectorService { }

    export interface IEnums extends ImageEnums.IEnums { }
    export interface IImgEnums extends ImageEnums.IImgEnums { }
}


