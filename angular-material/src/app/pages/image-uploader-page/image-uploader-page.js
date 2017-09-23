"use strict";
var ImageUploaderPage = (function () {
    function ImageUploaderPage() {
    }
    ImageUploaderPage.prototype.onSelectFile = function (file) {
        console.log('fired');
        console.log(file);
    };
    return ImageUploaderPage;
}());
exports.ImageUploaderPage = ImageUploaderPage;
//# sourceMappingURL=image-uploader-page.js.map