
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
            Image.className = Wrappers.FlexCenter50();
           

            const FirstName = new Inputs.Text('FirstName', 'First Name', true);
            FirstName.className = Wrappers.FlexPadding();
            
            const LastName = new Inputs.Text('LastName', 'Last Name', true);
            LastName.className = Wrappers.FlexPadding();


            const Email = new Inputs.Email('Email', 'Email', true);
            Email.className = Wrappers.FlexPadding();

            const UserName = new Inputs.Email('UserName', 'User Name', true);
            UserName.className = Wrappers.FlexPadding();

            const Password = new Inputs.Password('Password', 'Pasword');


            const ImgWrapper = <AngularFormly.IFieldGroup>{
                className: 'layout-row',
                fieldGroup: [Image]
            }
            

            this.FD.fields = [
                ImgWrapper,
                Wrappers.RowWrapper([FirstName, LastName]),
                Wrappers.RowWrapper([UserName, Email])
               
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