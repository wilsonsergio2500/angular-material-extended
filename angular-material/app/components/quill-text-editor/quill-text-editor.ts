
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

    class TextEditorCtrl {
        static $inject = ['$element', '$timeout'];
        ngModel: angular.INgModelController
        quill: Quill.Quill;
        mdHeight: string;
        constructor( private $element: angular.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            this.ngModel = this.$element.controller('ngModel');
            console.log(this.ngModel);
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
                        ['bold', 'italic', 'underline'],
                    ],
                  
                },
                placeholder: 'Compose an epic...',
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
        }
        onTextChange = () => {
            this.ngModel.$setViewValue(this.quill.getContents());
        }
    }

    const template = require('!!raw-loader!./quill-text-editor.html');

    function mdQuillTextEditor() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controller: TextEditorCtrl,
            controllerAs: 'vm',
            scope: {
                mdImageUpload: '@',
                mdHeight: '@'
            }
            
        }
    }

    APP_MODULE.directive('mdQuillTextEditor', mdQuillTextEditor);
}
