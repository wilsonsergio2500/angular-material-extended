import * as formly from 'AngularFormly';

export namespace Wrappers {


    export const Wrapper2x2 = (Field1: formly.IFieldConfigurationObject, Field2: formly.IFieldConfigurationObject) => {

        const config = <AngularFormly.IFieldGroup>{}

        const wrapper = <AngularFormly.IFieldGroup>{
            elementAttributes: { 'flex': '50' },
            fieldGroup: [Field1, Field2]
        };

        config.elementAttributes = { 'layout': 'row' };
        config.fieldGroup = [wrapper];

        return config;
    }

    

}