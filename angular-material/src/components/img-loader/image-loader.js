"use strict";
var angularwatch_1 = require('../../helpers/angularwatch');
var index_1 = require('../../main/index');
var styleinjector_1 = require('../../helpers/styleinjector');
var Components;
(function (Components) {
    var ImageLoader;
    (function (ImageLoader_1) {
        var ImageLoader = (function () {
            function ImageLoader($scope, $timeout, $q, $element) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$q = $q;
                this.$element = $element;
                this.onImagChanged = function (nv, ov) {
                    _this.LoadImage().then(function () {
                        _this.mainStyle = {
                            'background-image': 'url(' + _this.mdImgSrc + ')',
                            'background-size': 'cover',
                            'background-position': 'center'
                        };
                        _this.IsReady = true;
                    });
                };
                this.$onDestroy = function () {
                    _this.ImgWatcher.Unsubscribe();
                };
                this.Init();
            }
            ImageLoader.prototype.Init = function () {
                var _this = this;
                this.IsReady = false;
                this.ComponentStyle = {};
                this.mainStyle = {};
                if (!!!this.mdAspectRatio) {
                    throw 'md-image-loader requires md-aspect-ratio';
                }
                if (!!this.mdMaxWidth) {
                    var width = parseInt(this.mdMaxWidth);
                    this.ComponentStyle['max-width'] = width + 'px';
                }
                var paddingTop = Math.round((this.mdAspectRatio.h / this.mdAspectRatio.w) * 100);
                var styles = "{ display: block; content: ''; padding-top: " + paddingTop + "%  }";
                var key = "img-loader-style-ratio-" + paddingTop;
                var stylename = "." + key + "::after";
                styleinjector_1.StyleInjector.Create(key, stylename, styles).then(function () {
                    _this.mdAspectRatioClass = key;
                });
                this.$timeout(this.onImagChanged, 1);
                var that = this;
                this.ImgWatcher = new angularwatch_1.AngularWatch();
                this.ImgWatcher.Subscribe(this.$scope, function () { return that.mdImgSrc; }, this.onImagChanged);
                this.$scope.$on('$destroy', this.$onDestroy);
            };
            ImageLoader.prototype.LoadImage = function () {
                var defer = this.$q.defer();
                if (!!this.mdImgSrc) {
                    var img = new Image();
                    img.src = this.mdImgSrc;
                    img.onload = function () {
                        defer.resolve(true);
                    };
                    img.onerror = function (e) {
                        defer.reject();
                    };
                }
                else {
                    defer.reject();
                }
                return defer.promise;
            };
            ImageLoader.$inject = ['$scope', '$timeout', '$q', '$element'];
            return ImageLoader;
        }());
        var template = require('!!raw-loader!./image-loader.html');
        function mdImageLoader() {
            return {
                template: template,
                controller: ImageLoader,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    mdImgSrc: '=',
                    mdMaxWidth: '@',
                    mdAspectRatio: '='
                }
            };
        }
        index_1.APP_MODULE.directive('mdImageLoader', mdImageLoader);
    })(ImageLoader = Components.ImageLoader || (Components.ImageLoader = {}));
})(Components || (Components = {}));
//# sourceMappingURL=image-loader.js.map