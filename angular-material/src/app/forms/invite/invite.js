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
                _this.RoleService.getRoles().then(function (items) {
                    _this.$scope.to.options = items;
                });
            };
            this.Init();
        }
        FieldController.$inject = ['$scope', 'RoleService'];
        return FieldController;
    }());
    FormComponents.FieldController = FieldController;
    var InviteFormCtrl = (function () {
        function InviteFormCtrl($q, $timeout) {
            var _this = this;
            this.$q = $q;
            this.$timeout = $timeout;
            this.Init = function () {
                _this.working = false;
                _this.FD = {};
                _this.FD.name = 'inviteform';
                var email = new formly_fields_1.Inputs.Email('Email', 'Email', true);
                var Roles = new formly_fields_1.Inputs.Select('RoleType', 'Role Type', []);
                Roles.controller = FieldController;
                var editor = new formly_fields_1.Inputs.WysiwygTextEditor('post', 'Post');
                //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
                //editor.templateOptions.htmlQuillEditor.height = 250;
                //const Topics = new Inputs.ChipOptions('topics', 'Topics', 'name', this.getModels());
                var Topics = new formly_fields_1.Inputs.ChipOptions('topics', 'Topics', 'name');
                Topics.templateOptions.chipItem.optionsPromise = _this.getQuery;
                //editor.templateOptions.htmlQuillEditor.theme = 'bubble';
                //editor.templateOptions.htmlQuillEditor.height = 250;
                _this.FD.fields = [
                    email,
                    Roles,
                    editor,
                    Topics
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
            this.getQuery = function (query) {
                return _this.$q(function (resolve, reject) {
                    _this.$timeout(function () {
                        console.log(query);
                        resolve(_this.getModels());
                    }, 200);
                });
            };
            this.onSubmit = function () {
                _this.working = true;
                console.log(_this.FD.model);
            };
            this.Init();
        }
        InviteFormCtrl.$inject = ['$q', '$timeout'];
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