
import *  as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { FormDefinition, IFormDefinition } from '../../../models/iformdefinition';
import { Inputs } from '../../../formly-fields/formly-fields';
import { Wrappers } from '../../../formly-fields/formly-wrappers';
import { IUserService } from '../../../services/domains/user/user-service';
import { IUserDisplay } from '../../../models/contracts/request/user/iuserdisplay';
import { IToasterService } from '../../../services/toaster-service/toater-service';
import { IImageEdit } from '../../../models/contracts/request/user/iimageedit';
import { IActionResponse } from '../../../models/contracts/response/iactionresponse';

namespace FormComponents {

   

    class ProfileEditImageCtrl {

        Loading: boolean;
        working: boolean;
        
        FD: IFormDefinition<IImageEdit>;
        static $inject = ['UserService', '$timeout', 'ToasterService']
        constructor(private UserService: IUserService, private $timeout: angular.ITimeoutService, private ToasterService: IToasterService) {
            this.InitView();
        }
        InitView = () => {

            this.Loading = true;
            this.FD = new FormDefinition<IImageEdit>();

            this.UserService.GetMe().then((response: IUserDisplay) => {

                this.InitForm(response.image);
                this.$timeout(() => {
                    this.Loading = false;
                }, 200);
                
            });
        }
        InitForm = (img : string) => {
            this.working = false;
            this.FD.model.image = img;

            const Image = new Inputs.ImagePreviewerUpload('image', 'Image', <Inputs.IAspectRatio>{ w: 200, h: 200 });
            Image.templateOptions.imgUploader.mdPreviewImg = true;
            Image.templateOptions.imgUploader.imgType = Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE;
            Image.className = Wrappers.FlexCenter50();


            const ImgWrapper = <AngularFormly.IFieldGroup>{
                className: 'layout-row',
                fieldGroup: [Image]
            }

            this.FD.fields = [
                ImgWrapper
            ];

        }

        onSubmit = () => {
            this.working = true;

            this.UserService.UpateImage(this.FD.model).then((response: IActionResponse) => {
                if (response.state) {
                    this.ToasterService.ShowAsStatus('Image Updated Successfully');
                }
            });
            
        }
    }
    const template = require('!!raw-loader!./edit-image.html');
    function profileEditImageForm() {
        return <angular.IDirective>{
            controller: ProfileEditImageCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template,
        }

    }

    APP_MODULE.directive('profileEditImageForm', profileEditImageForm);
}