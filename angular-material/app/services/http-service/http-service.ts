/// <reference path="../../main/index.ts" />

import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';



const apiPath = '/api'
const apiDomain = 'http://localhost:21';

const basePath = `${apiDomain}${apiPath}`;

const ENDPOINT = {
    BUILD: (path: string) => {
        return basePath + path;
    }
}

export interface IHttpService {
    get<T>(path: string, data: any) : angular.IPromise<T>;
    Post<T>(path: string, data: any): angular.IPromise<T>;
    Put<T>(path: string, data: any): angular.IPromise<T>;
    Delete<T>(path: string, data: any): angular.IPromise<T>;
    FileUpload<T1, T2>(path: string, data: IFileUpload<T2>): angular.IPromise<T1>;

}

    export interface IFileUpload<T> {
        File: File,
        Params: T
    }

    export class HttpService implements IHttpService {

        static $inject = ['$http', '$q'];
        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
        }

        

        get<T>(path: string, data: any ) {

            return this.$http<T>(<angular.IRequestConfig>{ url: ENDPOINT.BUILD(path), method: 'GET', params: data });
        }

        Post<T>(path: string, data: any) {

            return this.$http.post<T>(ENDPOINT.BUILD(path), data);
        }

        Put<T>(path: string, data: any) {
            return this.$http.put<T>(ENDPOINT.BUILD(path), data);
        }

        Delete<T>(path: string, data: any) {
            return this.$http.delete(ENDPOINT.BUILD(path));
        }

        FileUpload<T1, T2>(path: string, data: IFileUpload<T2>) {

            let defer = this.$q.defer();
            let fd = new FormData();
            fd.append('file', data.File);

            angular.forEach(data.Params, (value, key) => {
                fd.append(key, value);
            });

            this.$http.post<T1>(ENDPOINT.BUILD(path), fd, <angular.IRequestShortcutConfig>{
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },

            }).success(defer.resolve).error(defer.reject);

            return defer.promise;

        }
    }


APP_MODULE.service('HttpService', HttpService);
