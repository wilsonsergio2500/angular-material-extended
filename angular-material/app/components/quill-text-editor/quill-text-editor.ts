

import * as angular from 'angular';

import { APP_MODULE } from '../../main/index';
import * as Quill from 'quill';

require('!style-loader!css-loader!quill/dist/quill.snow.css');
//require('!style-loader!css-loader!quill/dist/quill.bubble.css');
import { ImageResize } from '../../npm-customs/quill-image-resize-module/imageresize';
import { VideoResize } from '../../npm-customs/quill-video-resize-module/videoresize';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/iframe_resize', VideoResize);



require('!style-loader!css-loader!quill-emoji/dist/quill-emoji.css');
import { TextAreaEmoji } from '../../npm-customs/quill-emoji/module-textarea-emoji';
import { ToolbarEmoji } from '../../npm-customs/quill-emoji/module-toolbar-emoji';
import { EmojiBlot, ShortNameEmoji } from '../../npm-customs/quill-emoji/module-emoji';
Quill.register('modules/toolbar_emoji', ToolbarEmoji);
Quill.register('modules/textarea_emoji', TextAreaEmoji);
Quill.register({ 'formats/emoji': EmojiBlot });
Quill.register('modules/short_name_emoji', ShortNameEmoji);

/**
usage:
    <md-quill-text-editor ng-model="vm.textEditorModel" md-height="200" md-toolbar-theme="ALL"></md-quill-text-editor>
 **/


namespace Component.TextEditor {

    const THEMES = {
        ALL : [
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
    }

    Quill.prototype.getHtml = function () {
        return this.container.querySelector('.ql-editor').innerHTML;
    };
    Quill.prototype.setHtml = function (content: string) {
        const container = this.container.querySelector('.ql-editor') as HTMLDivElement;
        container.innerHTML = content;
    };
    Quill.prototype.onblur = function (callback: (eventObject: JQueryEventObject, ...args: any[]) => any) {
        const element = this.container.querySelector('.ql-editor');
        angular.element(element).on('blur', callback);
    }

    const placeHolderDefault = 'Compose an epic...';
    class TextEditorCtrl {
        static $inject = ['$scope','$element', '$timeout'];
        ngModelController: angular.INgModelController
        quill: Quill.Quill;
        mdHeight: string;
        mdPlaceholder: string;
        // ALL OR MEDIA
        mdToolbarTheme: string; 
        
        ngModel: string;
        mdMinLength: string;
        mdMaxLength: string;
        mdMinWordCount: number; 
        mdMaxWordCount: number;
        constructor(private $scope: angular.IScope, private $element: angular.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            this.ngModelController = this.$element.controller('ngModel');
            
            this.$timeout(this.Init, 20);
            this.$scope.$on('$destroy', this.$onDestroy);
        }
        Init = () => {
          
            const quillEditor = this.$element.children('0')[0];
            const themeKey = this.mdToolbarTheme || 'ALL';
            const themeToolbar = (THEMES as any)[themeKey]


            if (!!this.mdHeight) {
                const h = parseInt(this.mdHeight);
                quillEditor.style.height = h + 'px';
            }

            let quillOptions : any = {
                modules: {
                    toolbar: themeToolbar,
                    iframe_resize: true,
                    imageResize : {
                        displaySize: true
                    },
                    toolbar_emoji: true
                },
                placeholder:  this.mdPlaceholder || placeHolderDefault,
                theme: 'snow'
            };

            


            this.quill = new Quill(quillEditor, quillOptions)
            this.quill.on('text-change', () => {
                this.$timeout(this.onTextChange, 20);
            });
            (this.quill as any).onblur(this.onQuillBlur);

            this.$timeout(this.setViewValue, 100);
            this.$timeout(this.setValidators, 100);    
            this.$timeout(this.setInitialValue, 100);
            //console.log(this.quill);
        }
        setInitialValue = () => {
            if (!!this.ngModel) {
                (this.quill as any).setHtml(this.ngModel);
            }
        }
        onTextChange = () => {
            const html = (this.quill as any).getHtml();

            this.$timeout(() => {
                this.ngModelController.$setViewValue(html);
            })
            
            this.ngModelController.$setTouched();
            
        }
        setViewValue = () => {
            if (!!this.ngModelController.$viewValue) {
                this.quill.setText(this.ngModelController.$viewValue);
            }
        }
        setValidators = () => {


            const minwords = ($modelvalue: any, $viewvalue: any) => {
                let value = $viewvalue;
                const text = this.quill.getText();
                const wordcount = text.split(/\s+/).length - 1;
                return wordcount >= this.mdMinWordCount;
            }

            const maxwords = ($modelvalue: any, $viewvalue: any) => {
                const text = this.quill.getText();
                const wordcount = text.split(/\s+/).length - 1;
                return this.mdMaxWordCount > wordcount;
            }

            

            const required = ($modelvalue : any, $viewvalue : any) => {
                let value = $viewvalue;
                let length = this.quill.getText(0).length;
                return length > 3;
            }

           
           

            this.ngModelController.$validators = { required, minwords, maxwords  };

           
        }
        //setValidators = () => {


        //    const required = ($modelvalue: any, $viewvalue: any) => {
        //        let value = $viewvalue;
        //        //console.log(this.quill.getText());
        //        let length = this.quill.getText(0).length;
        //        return length > 3;
        //    }

        //    //const maxLength = ($modelvalue: any, $viewvalue: any) => {
        //    //    let value = $viewvalue;
        //    //    let length = this.quill.getText(0).length;
        //    //    const max = (!!this.mdMaxLength) ? parseInt(this.mdMaxLength) : 200
        //    //    return max > length;
        //    //}

        //    let rules = { required };

        //    //if (!!this.mdMinLength && parseInt(this.mdMinLength) != 0) {
        //    //    const min = parseInt(this.mdMinLength);
        //    //    const minlength = ($modelvalue: any, $viewvalue: any) => {
        //    //        let value = $viewvalue;
        //    //        let length = this.quill.getText(0).length;
        //    //        return length > 10;
        //    //    };
        //    //    rules = angular.extend(rules, { minlength });
        //    //    console.log(rules);
        //    //}

        //    this.ngModelController.$validators = rules;


        //}
        onQuillBlur = () => {
            this.$timeout(() => {
                this.ngModelController.$setTouched();
            }, 10);
        }
        $onDestroy = () => {
            if (!!(this.quill as any).videoResizerDestroy) {
                (this.quill as any).videoResizerDestroy();
            }
        }
    }

    const template = require('!!raw-loader!./quill-text-editor.html');

    function mdQuillTextEditor() {
        return <angular.IDirective>{
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
                ngModel: '=',
                mdMinWordCount: '=', 
                mdMaxWordCount: '='
            }
            
        }
    }

    APP_MODULE.directive('mdQuillTextEditor', mdQuillTextEditor);
}
