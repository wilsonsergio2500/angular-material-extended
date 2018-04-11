
import { APP_MODULE } from '../../main/index';

export namespace ImageEnums {

    

    export interface IEnums {
        MISSING_POST_IMAGE: string;
        MISSING_PROFILE_IMAGE: string;
        
        [key: string]: string;
    }

    export const ENUMS = {
        MISSING_POST_IMAGE: 'https://im.ages.io/dSaintlp',
        MISSING_PROFILE_IMAGE: 'https://im.ages.io/Bcintl5'
    } as IEnums



    export interface IImgEnums {
        getEnums: () => IEnums;
    }

    export class ImgEnums implements IImgEnums {

        constructor() {

        }

        getEnums() {
            return ENUMS;
        }


    }

    APP_MODULE.service('ImgEnums', ImgEnums);
}
