import * as formly from 'AngularFormly';

export interface IFormDefinition<T> {
    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup)[];
    working: boolean;
    options: formly.IFormOptionsAPI
}

export class FormDefinition<T> implements IFormDefinition<T>{

    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup)[];
    working: boolean;
    options: formly.IFormOptionsAPI;
    constructor() {
        this.name = 'form';
        this.model = <T>{};
        this.working = false;
        this.options = <formly.IFormOptionsAPI>{};
    }

}