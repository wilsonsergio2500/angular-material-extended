"use strict";
var ComponentTest = (function () {
    function ComponentTest(ImgCropperDialogService, $q, $timeout, ImgEnums) {
        var _this = this;
        this.ImgCropperDialogService = ImgCropperDialogService;
        this.$q = $q;
        this.$timeout = $timeout;
        this.ImgEnums = ImgEnums;
        this.getModels = function () {
            var models = [
                { name: 'sergio', id: 1 },
                { name: 'gioboy', id: 2 },
                { name: 'gioboy12', id: 3 },
                { name: 'giogoi', id: 4 }
            ];
            return models;
        };
        this.getQuery = function (query) {
            return _this.$q(function (resolve, reject) {
                _this.$timeout(function () {
                    console.log(query);
                    resolve(_this.getModels());
                }, 200);
            });
        };
        this.Init();
    }
    ComponentTest.prototype.Init = function () {
        this.previewImg = {};
        this.LoadingPanelShow = true;
        this.ChipModels = this.getModels();
        this.chipItems = [];
        this.previewImg.img = this.ImgEnums.getEnums().MISSING_POST_IMAGE;
        this.value = 1;
    };
    ComponentTest.prototype.onSelectFile = function (file) {
        var _this = this;
        console.log(file);
        var viewport = { w: 300, h: 135 };
        this.ImgCropperDialogService.Show(file, viewport).then(function (R) {
            _this.previewImg = R;
            console.log(R);
        });
    };
    ComponentTest.prototype.thumbsUpLike = function (query) {
        var defer = this.$q.defer();
        this.$timeout(function () {
            defer.resolve(true);
            console.log(query);
        }, 1000);
        return defer.promise;
    };
    ComponentTest.prototype.thumbUpUnlike = function (query) {
        var defer = this.$q.defer();
        this.$timeout(function () {
            defer.resolve(true);
            console.log(query);
        }, 1000);
        return defer.promise;
    };
    ComponentTest.$inject = ['ImgCropperDialogService', '$q', '$timeout', 'ImgEnums'];
    return ComponentTest;
}());
exports.ComponentTest = ComponentTest;
//# sourceMappingURL=components-test.js.map