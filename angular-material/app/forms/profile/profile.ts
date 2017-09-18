/// <reference path="../../formly-fields/formly-wrappers.ts" />

import * as angular from 'angular';
import { FormDefinition, IFormDefinition } from '../../models/iformdefinition';
import { IProfile } from '../../models/contracts/request/profile/iprofile';
import { Inputs } from '../../formly-fields/formly-fields';
import { APP_MODULE } from '../../main/index';
import * as formly from 'AngularFormly';
import { Wrappers } from '../../formly-fields/formly-wrappers'

namespace FormComponents {

    export class ProfileFormCtrl {

        static $inject = ['$timeout']
        FD: IFormDefinition<IProfile> = new FormDefinition<IProfile>();
        constructor(private $timeout: angular.ITimeoutService) {
            this.Init();
        }
        Init = () => {

            const Image = new Inputs.ImageProfileUpload('Image', 'Image');

            const FirstName = new Inputs.Text('FirstName', 'First Name', true);
           
            
            const LastName = new Inputs.Text('LastName', 'Last Name', true);
            const Email = new Inputs.Email('Email', 'Email', true);
            const UserName = new Inputs.Email('UserName', 'User Name', true);
            const Password = new Inputs.Password('Password', 'Pasword');

            const wrapper1 = <AngularFormly.IFieldGroup>{
                fieldGroup: [Image, LastName],
                elementAttributes: { 'flex': '50' },


            }

            const formWrapper = <AngularFormly.IFieldGroup>{
                elementAttributes: { 'layout': 'column' },
                fieldGroup: []
                    
            }

            
            const row = <AngularFormly.IFieldGroup>{
                className: 'fio',
                elementAttributes: { 'layout' : 'row'},
                fieldGroup: [wrapper1]
                
            }
            //const wrapper2 = <AngularFormly.IFieldGroup>{
            //    //className: 'flex-gt-sm-66 giogio',
            //    //elementAttributes: { 'flex': '50' },
            //    fieldGroup: [
            //        FirstName,
            //        LastName,
            //        Email,
            //        UserName,
            //        Password
            //    ]
            //}
            //const wrapper = <AngularFormly.IFieldGroup>{
            //    className: 'layout-row',
            //    fieldGroup: [
                   
            //        wrapper1,
                    
            //        wrapper2
            //    ]
                
            //}

            this.FD.fields = [
                //wrapper1,
                //wrapper2
                Wrappers.Wrapper2x2(FirstName, LastName)
            ]
        } 
        
    }

    const template = require('!!raw-loader!./profile.html');
    function profileForm(): angular.IDirective {
        return <angular.IDirective>{
            controller: ProfileFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
        }
    }

    APP_MODULE.directive('profileForm', profileForm);
}