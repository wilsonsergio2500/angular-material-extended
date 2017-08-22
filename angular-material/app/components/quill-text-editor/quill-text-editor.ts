
import * as angular from 'angular';

import { APP_MODULE } from '../../main/index';
import * as Quill from 'quill';

require('!style-loader!css-loader!quill/dist/quill.snow.css');
import { ImageResize } from '../../npm-customs/quill-image-resize-module/imageresize';
Quill.register('modules/imageResize', ImageResize);

/**
usage:
    <md-quill-text-editor ng-model="vm.textEditorModel" md-height="200" md-image-upload></md-quill-text-editor>
 **/


namespace Component.TextEditor {

    Quill.prototype.getHtml = function () {
        return this.container.querySelector('.ql-editor').innerHTML;
    };

    const placeHolderDefault = 'Compose an epic...';
    class TextEditorCtrl {
        static $inject = ['$element', '$timeout'];
        ngModelController: angular.INgModelController
        quill: Quill.Quill;
        mdHeight: string;
        mdPlaceholder: string;
        ngModel: string;
        constructor( private $element: angular.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            this.ngModelController = this.$element.controller('ngModel');
            console.log(this.ngModelController);
            this.$timeout(this.Init, 20);
            
        }
        Init = () => {
            const canImageUpload: boolean = this.$element[0].hasAttribute('md-image-upload');
            const quillEditor = this.$element.children('0')[0];

            console.log(quillEditor);

            if (!!this.mdHeight) {
                const h = parseInt(this.mdHeight);
                quillEditor.style.height = h + 'px';
            }

            let quillOptions : any = {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                    ],
                  
                },
                placeholder: (!!this.mdPlaceholder) ? this.mdPlaceholder : placeHolderDefault,
                theme: 'snow'
            };

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

            this.$timeout(this.setViewValue, 100);
            this.$timeout(this.setValidators, 100);    
        }
        onTextChange = () => {
            const html = (this.quill as any).getHtml();
            this.ngModel = html;
            this.ngModelController.$setViewValue(html);
            this.ngModelController.$render();
            
        }
        setViewValue = () => {
            if (!!this.ngModelController.$viewValue) {
                this.quill.setText(this.ngModelController.$viewValue);
            }
        }
        setValidators = () => {
            this.ngModelController.$validators = {
                minlength: ($modelvalue, $viewvalue) => {
                    let value =  $viewvalue;
                    let length = this.quill.getText(0).length;
                    return length > 10;
                },
                required: ($modelvalue, $viewvalue) => {
                    let value = $viewvalue;
                    let length = this.quill.getText(0).length;
                    return length > 3;
                }
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
                mdImageUpload: '@',
                mdHeight: '@',
                mdPlaceholder: '@',
                ngModel: '='
            }
            
        }
    }

    APP_MODULE.directive('mdQuillTextEditor', mdQuillTextEditor);
}
