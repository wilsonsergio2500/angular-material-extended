

import * as angular from 'angular';
import { IHttpService } from '../../http-service/http-service';
import { APP_MODULE } from '../../../main/index';
import { ICategory } from '../../../models/contracts/request/category/icategory';

import { IActionResponse } from '../../../models/contracts/response/iactionresponse';
import { IGetList } from '../../../models/contracts/request/igetlist';
import { IListResponse } from '../../../models/contracts/response/ilistresponse';

export interface ICategoryService {
    Add(category: ICategory): angular.IPromise<IActionResponse>;
    GetList(request: IGetList): angular.IPromise<IListResponse<ICategory>>;

}


namespace Services {

   
    const basePath = '/category';
    class CategoryService implements ICategoryService {

        static $inject = ['HttpService'];
        constructor(private HttpService: IHttpService) {

        }

        Add(category: ICategory) {
            return this.HttpService.Post<IActionResponse>(`${basePath}/new/${category.Name}`, {});
        }

        GetList(request: IGetList) {
            return this.HttpService.get<IListResponse<ICategory>>(`${basePath}/records/${request.skip}/${request.take}`, {});
        }
    }


    APP_MODULE.service('CategoryService', CategoryService);
}