
import * as angular from 'angular';
import * as formly from 'AngularFormly';



export namespace Inputs {

    export interface IFieldValidation {
        messages?: {
            [key: string]: formly.IExpressionFunction | string;
        }
    }

    export interface IQuillEditor {
        height: number;
        placeholder: string;
        
        minlength: number;
        maxlength: number;

        toolbarTheme: string;
        mdMinWordCount?: number;
        mdMaxWordCount?: number;

    }

    export interface IMdChipItem {
        placeholder: string;
        options: any[];
        fieldDisplay: string; 
        optionsPromise: ($query: string) => angular.IPromise<any[]>
    }

    export interface IAspectRatio {
        w: number;
        h: number;
    }

    interface IImageUploader {
        aspectRatio: IAspectRatio;
        imgType: string; // MISSING_PROFILE_IMAGE OR MISSING_POST_IMAGE
        mdPreviewImg: boolean;
        mdBtnText: string;
    }   

    interface ITemplateOptionsExtended extends formly.ITemplateOptions {
        htmlQuillEditor: IQuillEditor;
        chipItem: IMdChipItem;

        imgUploader: IImageUploader
    }

    class InputFormType implements formly.IFieldConfigurationObject {
        key: string;
        type: string;
        label: string;
        required: boolean;
        templateOptions: ITemplateOptionsExtended; //formly.ITemplateOptions;
        validation: IFieldValidation;
        validators?: {
            [key: string]: string | formly.IExpressionFunction | formly.IValidator;
        };
        asyncValidators?: {
            [key: string]: string | formly.IExpressionFunction | formly.IValidator;
        };
        controller?: string | Function;
        className: string;
        wrapper: string;
        ngModelAttrs: {
            attribute?: any;
            bound?: any;
            expression?: any;
            value?: any;
            [key: string]: any;
        };
        modelOptions?: AngularFormly.IModelOptions;
        constructor(key: string, label: string, required: boolean = false) {
            this.key = key;
            this.type = 'input';
            this.templateOptions = <ITemplateOptionsExtended>{};
            this.validation = <IFieldValidation>{};
            this.templateOptions.required = (!!required);
            this.templateOptions.label = label;
            const messages = {
                required: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                    
                    return scope.to.label + ' is required';
                },
            };
            
            if (required) {
                this.validation = { messages };
            }

        }
    }

  

    export class Text extends InputFormType {
        constructor(key: string, label: string, required: boolean = false) {
            super(key, label, required);
            this.templateOptions.label = label;
        }
    }

    export class Email extends InputFormType {
        constructor(key: string, label: string, required: boolean = false) {
            super(key, label, required);
            this.validators = {
                'email': {
                    expression: ($viewvalue, $modelvalue) => {
                        let value = $modelvalue || $viewvalue;
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return regex.test(value);
                    },
                    message: ($viewvalue, $modelvalue) => {
                        return ($viewvalue) && $viewvalue + ' is not a valid Email Address' ;
                    }
                }
            }
        }
    }

    export class Password extends InputFormType {
        constructor(key: string, label: string) {
            super(key, label, true);
            this.templateOptions.type = 'password';
            
        }
    }

    export class Number extends InputFormType {
        constructor(key: string, label: string, required: boolean = false, min: number = 0, max: number = 1000) {
            super(key, label, required);
            this.templateOptions.min = min;
            this.templateOptions.max = max;
        }
    }

    export class Select extends InputFormType {
        constructor(key: string, label: string, options: formly.ISelectOption[]) {
            super(key, label, true);
            this.type = 'select';
            this.templateOptions.options = options;
            
        }
    }

    export const TEXT_EDITOR_TOOLBAR_THEMES = {
        ALL: 'ALL',
        SIMPLE: 'SIMPLE',
        TEXT: 'TEXT'
    }

    export class WysiwygTextEditor extends InputFormType {
        constructor(key: string, label: string) {
            super(key, label, true);
            this.type = 'quillTextEditor';
            this.validation = <Inputs.IFieldValidation>{
                messages: {
                    required: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        return scope.to.label + ' is required';
                    },
                    maxLength: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        const to: ITemplateOptionsExtended = scope.to as ITemplateOptionsExtended; 
                        return 'Max length is larger than ' + to.htmlQuillEditor.maxlength +  ' characters ';
                    },
                    minwords: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        const to: ITemplateOptionsExtended = scope.to as ITemplateOptionsExtended;
                        return `${scope.to.label} must have at least ${to.htmlQuillEditor.mdMinWordCount} words...`;
                    },
                    maxwords: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        const to: ITemplateOptionsExtended = scope.to as ITemplateOptionsExtended;
                        return `${scope.to.label} must not have more than ${to.htmlQuillEditor.mdMaxWordCount} words...`;
                    }
                }
            }
            this.templateOptions.htmlQuillEditor = <IQuillEditor>{
                placeholder: 'write a post',
                height: 200,
                minlength: 10,
                maxlength: 240,
                toolbarTheme: TEXT_EDITOR_TOOLBAR_THEMES.ALL,
                 mdMaxWordCount: 100,
                mdMinWordCount: 10
            }
        }
    }

    export class ChipOptions extends InputFormType {
        constructor(key: string, label: string, arrayDisplayField: string, options: any[] = []) {
            super(key, label)
            this.type = 'chipItem';
            this.templateOptions.chipItem = <IMdChipItem>{};
            this.templateOptions.chipItem.options = options;
            this.templateOptions.chipItem.placeholder = 'Categories';
            this.templateOptions.chipItem.fieldDisplay = arrayDisplayField;
            this.templateOptions.chipItem.optionsPromise = null;
            this.validation = <Inputs.IFieldValidation>{
                messages: {
                    empty: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        return scope.to.label + ' is required';
                    },
                }
            }
          
        }
    }

   

    export const IMAGE_PREVIEW_UPLOAD_TYPES = {
        PROFILE: 'MISSING_PROFILE_IMAGE',
        IMAGE: 'MISSING_POST_IMAGE'

    }

    export class ImagePreviewerUpload extends InputFormType {
        constructor(key: string, label: string, aspectRatio: IAspectRatio, required: boolean = false) {
            super(key, label);
            this.type = 'Image-Preview-Uploader';
            this.templateOptions.imgUploader = <IImageUploader>{
                imgType: 'MISSING_POST_IMAGE',
                aspectRatio,
                mdPreviewImg: false,
                mdBtnText: "",
               

            }
            this.validation = <Inputs.IFieldValidation>{
                messages: {
                    minWidth: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        
                        return `Minimun width must be: ${scope.to.imgUploader.aspectRatio.w}px`;
                    },
                    minHeight: ($viewValue: any, $modelValue: any, scope: AngularFormly.ITemplateScope) => {
                        return `Minimun height must be: ${scope.to.imgUploader.aspectRatio.w}px`;
                    },
                }
            }

            if (required) {
                this.validators = {
                    'requireimg': {
                        expression: ($viewvalue, $modelvalue) => {
                            let value = $modelvalue || $viewvalue;
                            return !!value;
                        },
                        message: ($viewvalue, $modelvalue, scope: AngularFormly.ITemplateScope) => {
                            return scope.to.label + ' is required';
                        }
                    }
                }
            }
        }
    }
    //export class DatePicker extends InputType {
    //    constructor(key: string, label: string, required: boolean = false) {
    //        super();
    //        this.config.key = key;
    //        this.config.templateOptions.label = label;
    //        this.config.type = 'datepicker';
    //    }
    //}
}

export namespace InputsCustomTypes {

    export namespace Strengths {

        export class StrengthsChipOtions extends Inputs.ChipOptions {
            constructor(key: string, label: string) {
                super(key, label, 'name', getStrengths());
                this.templateOptions.chipItem.placeholder = 'Enter your Top 5 Strengths';
                this.templateOptions.required = true;
                //this.validators  = {
                //    'top': {
                //        expression: ($viewvalue, $modelvalue, scope: AngularFormly.ITemplateScope) => {
                //            let value: any[] = $modelvalue || $viewvalue;
                //            console.log(scope);
                //            return (!!value) && value.length == 5 ;
                //        },
                //        message: ($viewvalue, $modelvalue, scope: AngularFormly.ITemplateScope) => {
                //            return ' Top 5 Strengths required';
                //        }
                //    }
                //}
            }
        }

        export const getStrengths = (): any[] => {
            return [
                { name: 'Achiever' },
                { name: 'Activator' },
                { name: 'Adaptability' },
                { name: 'Analytical' },
                { name: 'Arranger' },
                { name: 'Belief' },
                { name: 'Command' },
                { name: 'Communication' },
                { name: 'Competition' },
                { name: 'Connectedness' },
                { name: 'Consistency' },
                { name: 'Context' },
                { name: 'Deliberative' },
                { name: 'Developer' },
                { name: 'Discipline' },
                { name: 'Empathy' },
                { name: 'Focus' },
                { name: 'Futuristic' },
                { name: 'Harmony' },
                { name: 'Ideation' },
                { name: 'Includer' },
                { name: 'Individualization' },
                { name: 'Input' },
                { name: 'Intellection' },
                { name: 'Learner' },
                { name: 'Maximizer' },
                { name: 'Positivity' },
                { name: 'Relator' },
                { name: 'Responsibility' },
                { name: 'Restorative' },
                { name: 'Self-Assurance' },
                { name: 'Significance' },
                { name: 'Strategic' },
                { name: 'Woo' },

            ];
        }
    }
}