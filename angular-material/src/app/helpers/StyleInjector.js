"use strict";
var angular = require('angular');
var StyleInjector = (function () {
    function StyleInjector() {
    }
    StyleInjector.Create = function (key, name, styles) {
        var $injector = angular.injector(['ng']);
        var $q = $injector.get('$q');
        return $q(function (resolve, reject) {
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.querySelector("#" + key);
            if (!!!style) {
                style = document.createElement('style');
                var css = name + " " + styles;
                style.type = 'text/css';
                style.id = key;
                var cssTxtNode = document.createTextNode(css);
                style.appendChild(cssTxtNode);
                head.appendChild(style);
            }
            setTimeout(function () {
                resolve(true);
            }, 5);
        });
    };
    return StyleInjector;
}());
exports.StyleInjector = StyleInjector;
//# sourceMappingURL=StyleInjector.js.map