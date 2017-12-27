import { IFormDefinition, FormDefinition } from '../../../models/iformdefinition';
import { MergeObject } from '../../../helpers/mergeobject'

export interface IFormTabWizardItem {
    Fields: (AngularFormly.IFieldConfigurationObject | AngularFormly.IFieldGroup)[]
}

export class FormTabWizard<T> {

    Forms: IFormDefinition<T>[] = [];
    Size: number;
    

    constructor(formFields: IFormTabWizardItem[], private model: T = <T>{} ) {
        this.Init(formFields)
    }

    Init = (formFields: IFormTabWizardItem[]) => {
        formFields.forEach((ele, index: number) => {

            const fd = new FormDefinition<T>();
            fd.fields = ele.Fields;
            fd.name = `form${index}`;
            fd.model = this.model;
            this.Forms.push(fd);


        });
        this.Size = this.Forms.length;
    }

    getValue() : T {

        let model = {};
        this.Forms.forEach((ele) => {
            model = MergeObject(model, ele.model);
        });

        return model as T;
    }
}