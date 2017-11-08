import * as formly from 'AngularFormly';

export interface IFormDefinition<T> {
    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup)[];
    working: boolean;
}

export class FormDefinition<T> implements IFormDefinition<T>{

    name?: string;
    model?: T;
    fields?: (formly.IFieldConfigurationObject | formly.IFieldGroup)[];
    working: boolean;
    constructor() {
        this.name = 'form';
        this.model = <T>{};
        this.working = false;
        
    }

}