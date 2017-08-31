

import * as angular from 'angular';

import { APP_MODULE } from '../../main/index';
import * as Quill from 'quill';

require('!style-loader!css-loader!quill/dist/quill.snow.css');
require('!style-loader!css-loader!quill/dist/quill.bubble.css');
import { ImageResize } from '../../npm-customs/quill-image-resize-module/imageresize';
Quill.register('modules/imageResize', ImageResize);


require('!style-loader!css-loader!quill-emoji/dist/quill-emoji.css');
import { TextAreaEmoji } from '../../npm-customs/quill-emoji/module-textarea-emoji';
import { ToolbarEmoji } from '../../npm-customs/quill-emoji/module-toolbar-emoji';
Quill.register('modules/toolbar_emoji', ToolbarEmoji);
Quill.register('modules/textarea_emoji', TextAreaEmoji);


/**
usage:
    <md-quill-text-editor ng-model="vm.textEditorModel" md-height="200" md-image-upload></md-quill-text-editor>
 **/


namespace Component.TextEditor {

    Quill.prototype.getHtml = function () {
        return this.container.querySelector('.ql-editor').innerHTML;
    };
    Quill.prototype.onblur = function (callback: (eventObject: JQueryEventObject, ...args: any[]) => any) {
        const element = this.container.querySelector('.ql-editor');
        angular.element(element).on('blur', callback);
    }

    const placeHolderDefault = 'Compose an epic...';
    class TextEditorCtrl {
        static $inject = ['$element', '$timeout'];
        ngModelController: angular.INgModelController
        quill: Quill.Quill;
        mdHeight: string;
        mdPlaceholder: string;
        
        ngModel: string;
        mdEditorTheme: string;
        mdMinLength: string;
        mdMaxLength: string;
        constructor( private $element: angular.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            this.ngModelController = this.$element.controller('ngModel');
            console.log(this.ngModelController);
            this.$timeout(this.Init, 20);
            
        }
        Init = () => {
            const canImageUpload: boolean = this.$element[0].hasAttribute('md-image-upload');
            const quillEditor = this.$element.children('0')[0];


            if (!!this.mdHeight) {
                const h = parseInt(this.mdHeight);
                quillEditor.style.height = h + 'px';
            }

            let quillOptions : any = {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'], ['emoji']
                    ],
                    toolbar_emoji: true,
                },
                placeholder: (!!this.mdPlaceholder) ? this.mdPlaceholder : placeHolderDefault,
                theme: (!!this.mdEditorTheme) ? this.mdEditorTheme : 'snow'
            };

            console.log(canImageUpload);
            if (canImageUpload) {
                quillOptions.modules.toolbar.push(['image']);
                
                quillOptions.modules.imageResize = {
                    displaySize: true
                }
            }


            this.quill = new Quill(quillEditor, quillOptions)
            this.quill.on('text-change', () => {
                this.$timeout(this.onTextChange, 20);
            });
            (this.quill as any).onblur(this.onQuillBlur);

            this.$timeout(this.setViewValue, 100);
            this.$timeout(this.setValidators, 100);    
        }
        onTextChange = () => {
            const html = (this.quill as any).getHtml();
            this.ngModelController.$setViewValue(html);
            this.ngModelController.$setTouched();
            
        }
        setViewValue = () => {
            if (!!this.ngModelController.$viewValue) {
                this.quill.setText(this.ngModelController.$viewValue);
            }
        }
        setValidators = () => {


            const required = ($modelvalue : any, $viewvalue : any) => {
                let value = $viewvalue;
                //console.log(this.quill.getText());
                let length = this.quill.getText(0).length;
                return length > 3;
            }
           
            const maxLength = ($modelvalue: any, $viewvalue: any) =>{
                let value = $viewvalue;
                let length = this.quill.getText(0).length;
                const max = (!!this.mdMaxLength) ? parseInt(this.mdMaxLength) : 200
                return max > length;
            }

            let rules = { required, maxLength };

            if (!!this.mdMinLength && parseInt(this.mdMinLength) != 0) {
                const min = parseInt(this.mdMinLength);
                const minlength = ($modelvalue : any, $viewvalue : any) => {
                    let value = $viewvalue;
                    let length = this.quill.getText(0).length;
                    return length > 10;
                };
                rules = angular.extend(rules, { minlength });
                console.log(rules);
            }

            this.ngModelController.$validators = rules;

           
        }
        onQuillBlur = () => {
            this.$timeout(() => {
                this.ngModelController.$setTouched();
            }, 10);
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
                mdImageUpload: '@',
                mdEditorTheme: '@',
                mdHeight: '@',
                mdPlaceholder: '@',
                mdMinLength: '@',
                mdMaxLength: '@',
                ngModel: '='
            }
            
        }
    }

    APP_MODULE.directive('mdQuillTextEditor', mdQuillTextEditor);
}
