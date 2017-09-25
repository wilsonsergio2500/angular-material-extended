"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Inputs;
(function (Inputs) {
    var InputFormType = (function () {
        function InputFormType(key, label, required) {
            if (required === void 0) { required = false; }
            this.key = key;
            this.type = 'input';
            this.templateOptions = {};
            this.validation = {};
            this.templateOptions.required = (!!required);
            this.templateOptions.label = label;
        }
        return InputFormType;
    }());
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(key, label, required) {
            if (required === void 0) { required = false; }
            _super.call(this, key, label, required);
            this.templateOptions.label = label;
        }
        return Text;
    }(InputFormType));
    Inputs.Text = Text;
    var Email = (function (_super) {
        __extends(Email, _super);
        function Email(key, label, required) {
            if (required === void 0) { required = false; }
            _super.call(this, key, label, required);
            this.validators = {
                'email': {
                    expression: function ($viewvalue, $modelvalue) {
                        var value = $modelvalue || $viewvalue;
                        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return regex.test(value);
                    },
                    message: function ($viewvalue, $modelvalue) {
                        return ($viewvalue) && $viewvalue + ' is not a valid Email Address';
                    }
                }
            };
        }
        return Email;
    }(InputFormType));
    Inputs.Email = Email;
    var Password = (function (_super) {
        __extends(Password, _super);
        function Password(key, label) {
            _super.call(this, key, label, true);
            this.templateOptions.type = 'password';
        }
        return Password;
    }(InputFormType));
    Inputs.Password = Password;
    var Number = (function (_super) {
        __extends(Number, _super);
        function Number(key, label, required, min, max) {
            if (required === void 0) { required = false; }
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1000; }
            _super.call(this, key, label, required);
            this.templateOptions.min = min;
            this.templateOptions.max = max;
        }
        return Number;
    }(InputFormType));
    Inputs.Number = Number;
    var Select = (function (_super) {
        __extends(Select, _super);
        function Select(key, label, options) {
            _super.call(this, key, label, true);
            this.type = 'select';
            this.templateOptions.options = options;
        }
        return Select;
    }(InputFormType));
    Inputs.Select = Select;
    Inputs.TEXT_EDITOR_TOOLBAR_THEMES = {
        ALL: 'ALL',
        SIMPLE: 'SIMPLE',
        TEXT: 'TEXT'
    };
    var WysiwygTextEditor = (function (_super) {
        __extends(WysiwygTextEditor, _super);
        function WysiwygTextEditor(key, label) {
            _super.call(this, key, label, true);
            this.type = 'quillTextEditor';
            this.validation = {
                messages: {
                    required: function ($viewValue, $modelValue, scope) {
                        return scope.to.label + ' is required';
                    },
                    maxLength: function ($viewValue, $modelValue, scope) {
                        var to = scope.to;
                        return 'Max length is larger than ' + to.htmlQuillEditor.maxlength + ' characters ';
                    }
                }
            };
            this.templateOptions.htmlQuillEditor = {
                placeholder: 'write a post',
                height: 200,
                minlength: 10,
                maxlength: 240,
                toolbarTheme: Inputs.TEXT_EDITOR_TOOLBAR_THEMES.ALL
            };
        }
        return WysiwygTextEditor;
    }(InputFormType));
    Inputs.WysiwygTextEditor = WysiwygTextEditor;
    var ChipOptions = (function (_super) {
        __extends(ChipOptions, _super);
        function ChipOptions(key, label, arrayDisplayField, options) {
            if (options === void 0) { options = []; }
            _super.call(this, key, label);
            this.type = 'chipItem';
            this.templateOptions.chipItem = {};
            this.templateOptions.chipItem.options = options;
            this.templateOptions.chipItem.placeholder = 'Categories';
            this.templateOptions.chipItem.fieldDisplay = arrayDisplayField;
            this.templateOptions.chipItem.optionsPromise = null;
            this.validation = {
                messages: {
                    empty: function ($viewValue, $modelValue, scope) {
                        return scope.to.label + ' is required';
                    },
                }
            };
        }
        return ChipOptions;
    }(InputFormType));
    Inputs.ChipOptions = ChipOptions;
    Inputs.IMAGE_PREVIEW_UPLOAD_TYPES = {
        PROFILE: 'MISSING_PROFILE_IMAGE',
        IMAGE: 'MISSING_POST_IMAGE'
    };
    var ImagePreviewerUpload = (function (_super) {
        __extends(ImagePreviewerUpload, _super);
        function ImagePreviewerUpload(key, label, aspectRatio) {
            _super.call(this, key, label);
            this.type = 'Image-Preview-Uploader';
            this.templateOptions.imgUploader = {
                imgType: 'MISSING_POST_IMAGE',
                aspectRatio: aspectRatio
            };
        }
        return ImagePreviewerUpload;
    }(InputFormType));
    Inputs.ImagePreviewerUpload = ImagePreviewerUpload;
})(Inputs = exports.Inputs || (exports.Inputs = {}));
//# sourceMappingURL=formly-fields.js.map