"use strict";
var formly_fields_1 = require('../../formly-fields/formly-fields');
var index_1 = require('../../main/index');
var FormComponents;
(function (FormComponents) {
    var FieldController = (function () {
        function FieldController($scope, RoleService) {
            var _this = this;
            this.$scope = $scope;
            this.RoleService = RoleService;
            this.Init = function () {
                _this.RoleService.GetRoles().then(function (items) {
                    console.log(items);
                    var options = [];
                    items.forEach(function (ele) {
                        options.push({ name: ele.name, value: ele.id });
                    });
                    _this.$scope.to.options = options;
                });
            };
            this.Init();
        }
        FieldController.$inject = ['$scope', 'RoleService'];
        return FieldController;
    }());
    FormComponents.FieldController = FieldController;
    var InviteFormCtrl = (function () {
        function InviteFormCtrl($q, $timeout, InviteService, ToasterService) {
            var _this = this;
            this.$q = $q;
            this.$timeout = $timeout;
            this.InviteService = InviteService;
            this.ToasterService = ToasterService;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'inviteform';
                var email = new formly_fields_1.Inputs.Email('email', 'Email', true);
                var Roles = new formly_fields_1.Inputs.Select('participationRoleType', 'Role Type', []);
                Roles.controller = FieldController;
                //const editor = new Inputs.WysiwygTextEditor('post', 'Post');
                //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
                //editor.templateOptions.htmlQuillEditor.height = 250;
                //const Topics = new Inputs.ChipOptions('topics', 'Topics', 'name', this.getModels());
                //const Topics = new Inputs.ChipOptions('topics', 'Topics', 'name');
                //Topics.templateOptions.chipItem.optionsPromise = this.getQuery;
                //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
                //editor.templateOptions.htmlQuillEditor.height = 250;
                _this.FD.fields = [
                    email,
                    Roles,
                ];
            };
            this.getModels = function () {
                var models = [
                    { name: 'sergio', id: 1 },
                    { name: 'gioboy', id: 2 },
                    { name: 'gioboy12', id: 3 },
                    { name: 'giogoi', id: 4 }
                ];
                return models;
            };
            //getQuery = (query: string): angular.IPromise<IChipModelExample[]> => {
            //    return this.$q((resolve: angular.IQResolveReject<IChipModelExample[]>, reject: angular.IQResolveReject<any>) => {
            //        this.$timeout(() => {
            //            console.log(query);
            //            resolve(this.getModels());
            //        }, 200);
            //    });
            //}
            this.onSubmit = function () {
                _this.working = true;
                _this.InviteService.Add(_this.FD.model).then(function (response) {
                    if (response.state) {
                        _this.ToasterService.ShowAsStatus('Invite Sent', 3000);
                    }
                });
                console.log(_this.FD.model);
                //this.InviteService.Add(
                //console.log(this.FD.model);
            };
            this.Init();
        }
        InviteFormCtrl.$inject = ['$q', '$timeout', 'InviteService', 'ToasterService'];
        return InviteFormCtrl;
    }());
    FormComponents.InviteFormCtrl = InviteFormCtrl;
    var template = require('!!raw-loader!./invite.html');
    function inviteForm() {
        return {
            controller: InviteFormCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template
        };
    }
    index_1.APP_MODULE.directive('inviteForm', inviteForm);
})(FormComponents || (FormComponents = {}));
//# sourceMappingURL=invite.js.map