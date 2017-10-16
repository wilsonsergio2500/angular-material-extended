"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
var Quill = require('quill');
require('!style-loader!css-loader!quill/dist/quill.snow.css');
require('!style-loader!css-loader!quill/dist/quill.bubble.css');
var imageresize_1 = require('../../npm-customs/quill-image-resize-module/imageresize');
var videoresize_1 = require('../../npm-customs/quill-video-resize-module/videoresize');
Quill.register('modules/imageResize', imageresize_1.ImageResize);
Quill.register('modules/iframe_resize', videoresize_1.VideoResize);
require('!style-loader!css-loader!quill-emoji/dist/quill-emoji.css');
var module_textarea_emoji_1 = require('../../npm-customs/quill-emoji/module-textarea-emoji');
var module_toolbar_emoji_1 = require('../../npm-customs/quill-emoji/module-toolbar-emoji');
var module_emoji_1 = require('../../npm-customs/quill-emoji/module-emoji');
Quill.register('modules/toolbar_emoji', module_toolbar_emoji_1.ToolbarEmoji);
Quill.register('modules/textarea_emoji', module_textarea_emoji_1.TextAreaEmoji);
Quill.register({ 'formats/emoji': module_emoji_1.EmojiBlot });
Quill.register('modules/short_name_emoji', module_emoji_1.ShortNameEmoji);
/**
usage:
    <md-quill-text-editor ng-model="vm.textEditorModel" md-height="200" md-toolbar-theme="ALL"></md-quill-text-editor>
 **/
var Component;
(function (Component) {
    var TextEditor;
    (function (TextEditor) {
        var THEMES = {
            ALL: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'video', 'emoji']
            ],
            SIMPLE: [
                ['bold', 'italic', 'emoji'],
            ],
            TEXT: [
                ['bold', 'italic'],
            ]
        };
        Quill.prototype.getHtml = function () {
            return this.container.querySelector('.ql-editor').innerHTML;
        };
        Quill.prototype.setHtml = function (content) {
            var container = this.container.querySelector('.ql-editor');
            container.innerHTML = content;
        };
        Quill.prototype.onblur = function (callback) {
            var element = this.container.querySelector('.ql-editor');
            angular.element(element).on('blur', callback);
        };
        var placeHolderDefault = 'Compose an epic...';
        var TextEditorCtrl = (function () {
            function TextEditorCtrl($scope, $element, $timeout) {
                var _this = this;
                this.$scope = $scope;
                this.$element = $element;
                this.$timeout = $timeout;
                this.Init = function () {
                    var quillEditor = _this.$element.children('0')[0];
                    var themeKey = _this.mdToolbarTheme || 'ALL';
                    var themeToolbar = THEMES[themeKey];
                    if (!!_this.mdHeight) {
                        var h = parseInt(_this.mdHeight);
                        quillEditor.style.height = h + 'px';
                    }
                    var quillOptions = {
                        modules: {
                            toolbar: themeToolbar,
                            iframe_resize: true,
                            imageResize: {
                                displaySize: true
                            },
                            toolbar_emoji: true
                        },
                        placeholder: _this.mdPlaceholder || placeHolderDefault,
                        theme: 'snow'
                    };
                    _this.quill = new Quill(quillEditor, quillOptions);
                    _this.quill.on('text-change', function () {
                        _this.$timeout(_this.onTextChange, 20);
                    });
                    _this.quill.onblur(_this.onQuillBlur);
                    _this.$timeout(_this.setViewValue, 100);
                    _this.$timeout(_this.setValidators, 100);
                    _this.$timeout(_this.setInitialValue, 100);
                    //console.log(this.quill);
                };
                this.setInitialValue = function () {
                    if (!!_this.ngModel) {
                        _this.quill.setHtml(_this.ngModel);
                    }
                };
                this.onTextChange = function () {
                    var html = _this.quill.getHtml();
                    _this.ngModelController.$setViewValue(html);
                    _this.ngModelController.$setTouched();
                };
                this.setViewValue = function () {
                    if (!!_this.ngModelController.$viewValue) {
                        _this.quill.setText(_this.ngModelController.$viewValue);
                    }
                };
                this.setValidators = function () {
                    var required = function ($modelvalue, $viewvalue) {
                        var value = $viewvalue;
                        //console.log(this.quill.getText());
                        var length = _this.quill.getText(0).length;
                        return length > 3;
                    };
                    var maxLength = function ($modelvalue, $viewvalue) {
                        var value = $viewvalue;
                        var length = _this.quill.getText(0).length;
                        var max = (!!_this.mdMaxLength) ? parseInt(_this.mdMaxLength) : 200;
                        return max > length;
                    };
                    var rules = { required: required, maxLength: maxLength };
                    if (!!_this.mdMinLength && parseInt(_this.mdMinLength) != 0) {
                        var min = parseInt(_this.mdMinLength);
                        var minlength = function ($modelvalue, $viewvalue) {
                            var value = $viewvalue;
                            var length = _this.quill.getText(0).length;
                            return length > 10;
                        };
                        rules = angular.extend(rules, { minlength: minlength });
                        console.log(rules);
                    }
                    _this.ngModelController.$validators = rules;
                };
                this.onQuillBlur = function () {
                    _this.$timeout(function () {
                        _this.ngModelController.$setTouched();
                    }, 10);
                };
                this.$onDestroy = function () {
                    if (!!_this.quill.videoResizerDestroy) {
                        _this.quill.videoResizerDestroy();
                    }
                };
                this.ngModelController = this.$element.controller('ngModel');
                console.log(this.ngModelController);
                this.$timeout(this.Init, 20);
                this.$scope.$on('$destroy', this.$onDestroy);
            }
            TextEditorCtrl.$inject = ['$scope', '$element', '$timeout'];
            return TextEditorCtrl;
        }());
        var template = require('!!raw-loader!./quill-text-editor.html');
        function mdQuillTextEditor() {
            return {
                template: template,
                bindToController: true,
                controller: TextEditorCtrl,
                controllerAs: 'vm',
                require: 'ngModel',
                scope: {
                    //mdImageUpload: '@',
                    //mdEmoji: '@',
                    mdToolbarTheme: '@',
                    mdHeight: '@',
                    mdPlaceholder: '@',
                    mdMinLength: '@',
                    mdMaxLength: '@',
                    ngModel: '='
                }
            };
        }
        index_1.APP_MODULE.directive('mdQuillTextEditor', mdQuillTextEditor);
    })(TextEditor = Component.TextEditor || (Component.TextEditor = {}));
})(Component || (Component = {}));
//# sourceMappingURL=quill-text-editor.js.map