"use strict";
var TestPage = (function () {
    function TestPage(ImgCropperDialogService) {
        this.ImgCropperDialogService = ImgCropperDialogService;
        this.Init();
    }
    TestPage.prototype.Init = function () {
        this.previewImg = null;
        this.LoadingPanelShow = true;
    };
    TestPage.prototype.onSelectFile = function (file) {
        var _this = this;
        console.log(file);
        var viewport = { w: 300, h: 135 };
        this.ImgCropperDialogService.Show(file, viewport).then(function (R) {
            _this.previewImg = R;
            console.log(R);
        });
    };
    TestPage.$inject = ['ImgCropperDialogService'];
    return TestPage;
}());
exports.TestPage = TestPage;
//# sourceMappingURL=test-page.js.map