import * as formly from 'AngularFormly';

export interface IFormDefinition<T> {
    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup) [];
}

export class FormDefinition<T> implements IFormDefinition<T>{

    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup) [];
    constructor() {
        this.name = 'form';
        this.model = <T>{};
        
    }

}