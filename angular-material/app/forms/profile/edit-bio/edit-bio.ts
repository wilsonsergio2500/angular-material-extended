
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
import { IBioEdit } from '../../../models/contracts/request/user/ibioedit';

namespace FormComponents {

    class EditBioCtrl {
        working: boolean;
        FD: IFormDefinition<IBioEdit>;
        record: any;
        static $inject = ['UserService', 'ToasterService']
        constructor(private UserService: IUserService, private ToasterService: IToasterService) {
            console.log(this.record);
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = new FormDefinition<IBioEdit>();
            if (!!this.record.bio) {
                this.FD.model.bio = this.record.bio;
            }

            const Bio = new Inputs.WysiwygTextEditor('bio', 'Bio');
            Bio.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
            Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';

            this.FD.fields = [
                Wrappers.RowWrapper([Bio])
            ];


        }

        onSubmit = () => {
            this.working = true;
            this.UserService.UpdateBio(this.FD.model).then((response: IActionResponse) => {
                if (response.state) {
                    this.ToasterService.ShowAsStatus('Bio updated Succesfully');
                }
            });
        }

    }

    const template = require('!!raw-loader!./edit-bio.html');

    function profileEditBioForm() {
        return <angular.IDirective>{
            template: template,
            bindToController: true,
            controllerAs: 'vm',
            controller: EditBioCtrl,
            scope: {
                record: '='
            }
        }
    }

    APP_MODULE.directive('profileEditBioForm', profileEditBioForm);
}