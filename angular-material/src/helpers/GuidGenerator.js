"use strict";
var GuidGenerator = (function () {
    function GuidGenerator() {
    }
    GuidGenerator.NewGuid = function () {
        var s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    return GuidGenerator;
}());
exports.GuidGenerator = GuidGenerator;
//# sourceMappingURL=GuidGenerator.js.map