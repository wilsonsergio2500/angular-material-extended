import * as formly from 'AngularFormly';

export namespace Wrappers {


    export const FlexSize = (width: number) => {
        return `flex-${width} flex-xs-100 flex-sm-100`;
    }

    export const FlexCenter50 = () => {
        return 'flex-gt-sm-50 flex-offset-gt-sm-25 layout-column flex-100';
    }

    export const FlexPadding = () => {
        return 'layout-padding';
    }


    export const RowWrapper = (Fields: formly.IFieldConfigurationObject | formly.IFieldGroup []) => {

        const config = <AngularFormly.IFieldGroup>{
            className: 'layout-row layout-xs-column layout-sm-column',
            fieldGroup: Fields
        };

        return config;
    }

    export const ColumnWrapper = ( Fields:( formly.IFieldConfigurationObject | formly.IFieldGroup) []) => {
        const config = <AngularFormly.IFieldGroup>{
           className: 'layout-column',
            
            fieldGroup: Fields
        };

        return config;
    }

}