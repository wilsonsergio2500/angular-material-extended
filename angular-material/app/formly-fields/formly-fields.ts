
import * as angular from 'angular';
import * as formly from 'AngularFormly';



export namespace Inputs {

    export interface IFieldValidation {
        messages?: {
            [key: string]: formly.IExpressionFunction | string;
        }
    }

    class InputFormType implements formly.IFieldConfigurationObject {
        key: string;
        type: string;
        label: string;
        required: boolean;
        templateOptions: formly.ITemplateOptions;
        validation: IFieldValidation;
        constructor(key: string, label: string, required: boolean = false) {
            this.key = key;
            this.type = 'input';
            this.templateOptions = <formly.ITemplateOptions>{};
            this.validation = <IFieldValidation>{};
            this.templateOptions.required = (!!required);
            this.templateOptions.label = label;
        }
    }

  

    export class Text extends InputFormType {
        constructor(key: string, label: string, required: boolean = false) {
            super(key, label, required);
            this.templateOptions.label = label;
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



    //export class DatePicker extends InputType {
    //    constructor(key: string, label: string, required: boolean = false) {
    //        super();
    //        this.config.key = key;
    //        this.config.templateOptions.label = label;
    //        this.config.type = 'datepicker';
    //    }
    //}
}