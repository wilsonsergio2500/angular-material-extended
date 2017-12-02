

import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { IError  } from '../../models/contracts/ierror';


declare var process: any;
const isProd = process.env.NODE_ENV === 'production';


const apiPath = '/api'
const apiDomain = (isProd) ? "http://mongocorenet-dev.us-west-2.elasticbeanstalk.com" : 'http://localhost:46037';

export const basePath = `${apiDomain}${apiPath}`;

const ENDPOINT = {
    BUILD: (path: string) => {
        return basePath + path;
    }
}

export class PromiseSolver<T> {
    constructor(private resolve: angular.IQResolveReject<T>, private reject: angular.IQResolveReject<any>) { }

    //do something with the ErrorPayload
    private Rejector = (ErrorPayload: angular.IHttpPromiseCallbackArg<IError>, reject: angular.IQResolveReject<any>) => {

        if (ErrorPayload.status == 400) {
            reject(ErrorPayload.data);
        }
        else {
            reject(ErrorPayload);
        }
    }
    private Resolver = <T>(payload: angular.IHttpPromiseCallbackArg<T>, resolve: angular.IQResolveReject<T>) => {
        resolve(payload.data);
    }

    Solve = (Promise: angular.IPromise<T>) => {
        Promise.then((response : any) => { this.Resolver(response, this.resolve); }).catch((error : any) => { this.Rejector(error, this.reject) });
    }
}

export interface IHttpService {
    get<T>(path: string, data?: any) : angular.IPromise<T>;
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


        private Resolver = <T>(payload: angular.IHttpPromiseCallbackArg<T>, resolve: angular.IQResolveReject<T>) => {
            resolve(payload.data);
        }

        get<T>(path: string, data: any = {}) {

            return this.$q((resolve: angular.IQResolveReject<T>, reject: angular.IQResolveReject<any>) => {
                new PromiseSolver<T>(resolve, reject).Solve(this.$http<T>(<angular.IRequestConfig>{ url: ENDPOINT.BUILD(path), method: 'GET', params: data }));
            });

        }

        Post<T>(path: string, data: any) {
            return this.$q((resolve: angular.IQResolveReject<T>, reject: angular.IQResolveReject<any>) => {
                new PromiseSolver<T>(resolve, reject).Solve(this.$http.post<T>(ENDPOINT.BUILD(path), data));
            });

                
        }

        Put<T>(path: string, data: any) {

            return this.$q((resolve: angular.IQResolveReject<T>, reject: angular.IQResolveReject<any>) => {
                new PromiseSolver<T>(resolve, reject).Solve(this.$http.put<T>(ENDPOINT.BUILD(path), data));
            });
        }

        Delete<T>(path: string, data: any) {

            return this.$q((resolve: angular.IQResolveReject<T>, reject: angular.IQResolveReject<any>) => {
                new PromiseSolver<T>(resolve, reject).Solve(this.$http.delete<T>(ENDPOINT.BUILD(path)));
            });
        }

        FileUpload<T1, T2>(path: string, data: IFileUpload<T2>) {

            //let defer = this.$q.defer();
            let fd = new FormData();
            fd.append('file', data.File);

            angular.forEach(data.Params, (value : any, key : any) => {
                fd.append(key, value);
            });

            return this.$q((resolve: angular.IQResolveReject<T1>, reject: angular.IQResolveReject<any>) => {

                new PromiseSolver<T1>(resolve, reject).Solve(
                    this.$http.post<T1>(ENDPOINT.BUILD(path), fd, <angular.IRequestShortcutConfig>{
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined },

                    })
                );

            });


            //this.$http.post<T1>(ENDPOINT.BUILD(path), fd, <angular.IRequestShortcutConfig>{
            //    transformRequest: angular.identity,
            //    headers: { 'Content-Type': undefined },

            //}).success(defer.resolve).error(defer.reject);

            //return defer.promise;

        }
    }


APP_MODULE.service('HttpService', HttpService);
