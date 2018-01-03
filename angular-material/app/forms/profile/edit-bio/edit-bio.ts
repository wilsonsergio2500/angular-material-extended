
import *  as angular from 'angular';
import { APP_MODULE } from '../../../main/index';
import { FormDefinition, IFormDefinition } from '../../../models/iformdefinition';
import { Inputs, InputsCustomTypes } from '../../../formly-fields/formly-fields';
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
        static $inject = ['UserService', 'ToasterService', '$q']
        constructor(private UserService: IUserService, private ToasterService: IToasterService, private $q: angular.IQService) {
            
            this.Init();
        }
        Init = () => {
            this.working = false;
            this.FD = new FormDefinition<IBioEdit>();
            if (!!this.record.bio) {
                this.FD.model.bio = this.record.bio;
                this.FD.model.jobTitle = this.record.jobTitle;
                this.FD.model.strengths = this.record.strengths;
            }

            const JobTitle = new Inputs.Text('jobTitle', 'Job Title', true);
            JobTitle.templateOptions.placeholder = 'Enter job title';

            const Strengths = new InputsCustomTypes.Strengths.StrengthsChipOtions('strengths', 'Strengths');
            Strengths.templateOptions.chipItem.options = [];
            Strengths.templateOptions.chipItem.optionsPromise = this.$getStrengthsQuery;

            const Bio = new Inputs.WysiwygTextEditor('bio', 'Bio');
            Bio.templateOptions.htmlQuillEditor.toolbarTheme = Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE;
            Bio.templateOptions.htmlQuillEditor.placeholder = 'Enter your bio';
            Bio.templateOptions.htmlQuillEditor.height = 100;
            Bio.templateOptions.htmlQuillEditor.mdMaxWordCount = 5;

            

            this.FD.fields = [
                Wrappers.RowWrapper([JobTitle]),
                Wrappers.RowWrapper([Strengths]),
                Wrappers.RowWrapper([Bio])
            ];


        }
        $getStrengthsQuery = (query: string) => {

            return this.$q((resolve : any, reject : any) => {

                const list = InputsCustomTypes.Strengths.getStrengths().filter((element: any) => {
                    return (element.name as string).toLowerCase().indexOf(query.toLowerCase()) !== -1;
                });

                setTimeout(() => {
                    resolve(list);
                }, 250)

            })
        }

        onSubmit = () => {

            //console.log(this.FD.model);
            this.working = true;
            this.UserService.UpdateBio(this.FD.model).then((response: IActionResponse) => {
                if (response.state) {
                    this.ToasterService.ShowAsStatus('Bio updated Succesfully');
                    this.working = false;
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