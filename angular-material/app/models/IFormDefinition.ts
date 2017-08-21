import * as formly from 'AngularFormly';

export interface IFormDefinition<T> {
    name?: string;
    model?: T;
    fields?: formly.IFieldConfigurationObject[];
    controller?: string | Function;
}