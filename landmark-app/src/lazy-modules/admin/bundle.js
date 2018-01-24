!function(n){function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=474)}({12:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function n(){this.name="form",this.model={},this.working=!1,this.options={},this.disabled=!1}return n}();e.FormDefinition=r},207:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(12),o=t(8),a=t(28);!function(n){function e(){return{controller:r,controllerAs:"vm",bindToController:d,template:d}}var r=function(){function n(n,e,t,r){var a=this;this.CategoryService=n,this.ToasterService=e,this.$timeout=t,this.$q=r,this.Init=function(){a.working=!1,a.FD=new i.FormDefinition;var n=null,e=new o.Inputs.Text("Name","Category Name",!0);e.templateOptions.placeholder="Enter Category Name",e.asyncValidators={unique:{expression:function(e,t,r){return clearTimeout(n),a.FD.working=!0,a.$q(function(t,r){n=setTimeout(function(){a.CategoryService.DoesNameExist(e).then(function(n){n.state&&r("category name taken"),t(),a.FD.working=!1})},200)})}}},e.validation={messages:{required:function(n,e,t){return t.to.label+" is required"},unique:'"Category Name already exist."'}},a.FD.fields=[e]},this.onSubmit=function(){a.working=!0,a.CategoryService.Add(a.FD.model).then(function(n){n.state&&a.ToasterService.ShowAsStatus("Category Added Successfully",3e3)})},this.Init()}return n}();r.$inject=["CategoryService","ToasterService","$timeout","$q"],n.CategoryFormCtrl=r;var d=t(278);a.ADMIN_MODULE.directive("categoryForm",e)}(r||(r={}))},208:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28);!function(n){!function(n){function e(){return{template:r,controllerAs:"vm",bindToController:!0}}var r=t(279);i.ADMIN_MODULE.directive("adminNewCategory",e)}(n.Admin||(n.Admin={}))}(r||(r={}))},209:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28);!function(n){function e(){return{template:o,controller:r,controllerAs:"vm",bindToController:!0,scope:{title:"@"}}}var r=function(){function n(){}return n}(),o=t(280);i.ADMIN_MODULE.directive("adminHeader",e)}(r||(r={}))},210:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28);!function(n){function e(){return{template:o,controller:r,controllerAs:"vm",bindToController:!0,scope:{clPages:"=",clAlignModel:"=",clPageChanged:"&",clSteps:"=",clCurrentPage:"="}}}var r=function(){function n(){var n=this;this.first="<<",this.last=">>",this.index=0,this.Init=function(){n.setPages(),n.setStepInfo()},this.setPages=function(){n.page=[];for(var e=1;e<=n.clPages;e++)n.page.push(e)},this.setStepInfo=function(){n.stepInfo=[];for(var e=0;e<n.clSteps;e++)n.stepInfo.push(e)},this.goto=function(e){n.clCurrentPage=n.page[e],n.clPageChanged.call(n,{page:n.clCurrentPage})},this.gotoPrev=function(){n.clCurrentPage=n.index,n.index-=n.clSteps,n.clPageChanged.call(n,{page:n.clCurrentPage})},this.gotoNext=function(){n.index+=n.clSteps,n.clCurrentPage=n.index+1,n.clPageChanged.call(n,{page:n.clCurrentPage})},this.gotoFirst=function(){n.index=0,n.clCurrentPage=1,n.clPageChanged.call(n,{page:n.clCurrentPage})},this.gotoLast=function(){n.index=n.clPages/n.clSteps*n.clSteps,n.index===n.clPages&&(n.index=n.index-n.clSteps),n.clCurrentPage=n.clPages,n.clPageChanged.call(n,{page:n.clCurrentPage})},this.Init()}return n}(),o=t(281);n.mdPaginator=e,i.ADMIN_MODULE.directive("mdPaginator",e)}(r||(r={}))},211:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(8),o=t(28);!function(n){function e(){return{controller:a,controllerAs:"vm",bindToController:!0,template:d}}var r=function(){function n(n,e){var t=this;this.$scope=n,this.RoleService=e,this.Init=function(){t.RoleService.GetRoles().then(function(n){console.log(n);var e=[];n.forEach(function(n){e.push({name:n.name,value:n.id})}),t.$scope.to.options=e})},this.Init()}return n}();r.$inject=["$scope","RoleService"],n.FieldController=r;var a=function(){function n(n,e,t,o,a){var d=this;this.$q=n,this.$timeout=e,this.InviteService=t,this.ToasterService=o,this.DialogService=a,this.Init=function(){d.working=!1,d.FD={},d.FD.name="inviteform";var n=new i.Inputs.Email("email","Email",!0),e=new i.Inputs.Select("participationRoleType","Role Type",[]);e.controller=r,d.FD.fields=[n,e]},this.onSubmit=function(n){d.working=!0,d.InviteService.Add(d.FD.model).then(function(n){n.state&&d.ToasterService.ShowAsStatus("Invite Sent",3e3),d.working=!1}).catch(function(e){d.DialogService.DisplayError("Invite creation failed: "+e.message,n),d.working=!1})},this.Init()}return n}();a.$inject=["$q","$timeout","InviteService","ToasterService","DialogService"],n.InviteFormCtrl=a;var d=t(282);o.ADMIN_MODULE.directive("inviteForm",e)}(r||(r={}))},212:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28);!function(n){!function(n){function e(){return{template:r,controllerAs:"vm",bindToController:!0}}((function(){function n(n){this.$timeout=n}return n})()).$inject=["$timeout"];var r=t(283);i.ADMIN_MODULE.directive("adminNewInvite",e)}(n.Admin||(n.Admin={}))}(r||(r={}))},213:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28);!function(n){!function(n){function e(){return{template:a,bindToController:!0,controllerAs:"vm",controller:o}}var r=5,o=function(){function n(n,e,t,i,o){var a=this;this.UserService=n,this.$timeout=e,this.ToasterService=t,this.$element=i,this.$mdDialog=o,this.Init=function(){a.List=[],a.Loading=!0,a.Working=!1,a.ListRequest={skip:0,take:r},a.getList()},this.getList=function(){a.UserService.GetUserList(a.ListRequest).then(function(n){a.Total=n.count,a.List=n.result,a.MaxPages=Math.ceil(n.count/r),a.Loading=!1,a.$timeout(function(){return a.Working=!1},200)})},this.onPageChanged=function(n){a.Working=!0,a.ListRequest.skip=r*(n-1),a.getList()},this.Deactivate=function(n){var e={email:n};a.UserService.Deactivate(e).then(function(n){n.state&&(a.ToasterService.ShowAsStatus("User Deactivated Succesfully"),a.getList())})},this.openCtxt=function(n,e){var t=a.$element[0].querySelector('md-menu[data-attr-menu-index="'+e+'"]');angular.element(t).data().$mdMenuController.open(n)},this.Activate=function(n){var e={email:n};a.UserService.Activate(e).then(function(n){n.state&&(a.ToasterService.ShowAsStatus("User Activated Succesfully"),a.getList())})},this.Init()}return n.prototype.openRoleChangeDialog=function(n,e){var t={template:'<md-dialog aria-label="Update Role" class="nav-items-modal">\n                                <md-dialog-content>\n                                    <update-role record="vm.record" />\n                                </md-dialog-content>\n                            </md-dialog>',targetEvent:n,clickOutsideToClose:!1,controller:function(){this.record=e},controllerAs:"vm",parent:angular.element(document.querySelector("#content"))};this.$mdDialog.show(t)},n.prototype.openManualPasswordReset=function(n,e){var t={template:'<md-dialog aria-label="Update Role" class="nav-items-modal">\n                                <md-dialog-content>\n                                    <manual-password-reset record="vm.record" />\n                                </md-dialog-content>\n                            </md-dialog>',targetEvent:n,clickOutsideToClose:!1,controller:function(){this.record=e},controllerAs:"vm",parent:angular.element(document.querySelector("#content"))};this.$mdDialog.show(t)},n}();o.$inject=["UserService","$timeout","ToasterService","$element","$mdDialog"];var a=t(284);i.ADMIN_MODULE.directive("manageUsers",e)}(n.Admin||(n.Admin={}))}(r||(r={}))},214:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28),o=t(12),a=t(8);!function(n){function e(){return{template:d,controller:r,controllerAs:"vm",bindToController:!0,scope:{record:"="}}}var r=function(){function n(n,e,t,r){var i=this;this.$mdDialog=n,this.UserService=e,this.ToasterService=t,this.$timeout=r,this.Init=function(){i.FD=new o.FormDefinition,i.Busy=!1;var n=new a.Inputs.Password("password","Password");n.templateOptions.placeholder="Enter New Password",n.validators={minlength:{expression:function(n,e){var t=e||n;return!!t&&t.length>5},message:function(n,e,t){return t.to.label+" must meet the minimun length of 6"}}};var e=new a.Inputs.Password("password_confirm","New Password Confirmation");e.templateOptions.placeholder="Re-enter New Password",e.validators={MatchPassword:{expression:function(n,e,t){return n==t.model.password},message:'"Must match above password"'}},i.FD.fields=[n,e]},this.Cancel=function(){i.$mdDialog.hide()},this.Submit=function(n){var e={email:i.record.email,password:n.password};i.Busy=!0,i.UserService.UpdateUserPassword(e).then(function(n){n.state&&(i.ToasterService.ShowAsStatus("Password Updated"),i.$timeout(function(){i.Busy=!1,i.$mdDialog.hide()},1e3),i.$timeout(function(){i.ToasterService.HideToaster()},2e3))})},this.Init()}return n}();r.$inject=["$mdDialog","UserService","ToasterService","$timeout"];var d=t(285);i.ADMIN_MODULE.directive("manualPasswordReset",e)}(r||(r={}))},215:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=t(28),o=t(12),a=t(8);!function(n){function e(){return{template:m,controller:d,controllerAs:"vm",bindToController:!0,scope:{record:"="}}}var r=function(){function n(n,e){var t=this;this.$scope=n,this.RoleService=e,this.Init=function(){t.RoleService.GetRoles().then(function(n){var e=[];n.forEach(function(n){e.push({name:n.name,value:n.id})}),t.$scope.to.options=e})},this.Init()}return n}();r.$inject=["$scope","RoleService"];var d=function(){function n(n,e,t,i){var d=this;this.$mdDialog=n,this.UserService=e,this.ToasterService=t,this.$timeout=i,this.Init=function(){d.Busy=!1,d.FD=new o.FormDefinition,d.FD.model=d.record;var n=new a.Inputs.Select("role","Role Type",[]);n.controller=r,d.FD.fields=[n]},this.Cancel=function(){d.$mdDialog.hide()},this.Submit=function(n){d.Busy=!0,d.UserService.UpdateUserRole(n).then(function(n){n.state&&(d.ToasterService.ShowAsStatus("Role has been Updated"),d.$timeout(function(){d.$mdDialog.hide()},1e3),setTimeout(function(){window.location.reload()},2500))})},this.Init()}return n}();d.$inject=["$mdDialog","UserService","ToasterService","$timeout"];var m=t(286);i.ADMIN_MODULE.directive("updateRole",e)}(r||(r={}))},278:function(n,e){n.exports='<form name="vm.FD.name" novalidate ng-submit="vm.onSubmit()" autocomplete="off">\r\n    <formly-form model="vm.FD.model" fields="vm.FD.fields">\r\n\r\n        <div layout="row" layout-align="end center">\r\n\r\n            <md-loading-button type="submit" md-class="md-raised md-primary" md-busy="vm.working"  md-disabled="vm.FD.name.$invalid || vm.FD.working">\r\n                <md-message>\r\n                    Add Category\r\n                </md-message>\r\n                <md-loading-message>\r\n                    Adding..\r\n                </md-loading-message>\r\n            </md-loading-button>\r\n\r\n        </div>\r\n\r\n    </formly-form>\r\n    \r\n</form>\r\n'},279:function(n,e){n.exports='<md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000">\r\n\r\n    <div layout="column" flex>\r\n        <div layout-margin layout="row">\r\n            <div class="md-whiteframe-3dp" flex-gt-sm="50" flex-offset-gt-sm="25" layout="column" flex="100">\r\n\r\n\r\n                <admin-header title="Add Category"></admin-header>\r\n\r\n                <div layout="column">\r\n                    <div layout-margin layout="row" flex>\r\n                        <category-form class="flex"></category-form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</md-animate>'},28:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ADMIN_MODULE=angular.module("admin",[])},280:function(n,e){n.exports='<md-card class="user-header">\r\n\r\n    <md-card-header>\r\n        <md-card-avatar>\r\n           \r\n            <md-icon md-font-icon="icon-cogs"></md-icon>\r\n\r\n        </md-card-avatar>\r\n        <md-card-header-text>\r\n            <span class="md-title">Admin Task</span>\r\n            <span class="md-subhead" ng-bind="vm.title">\r\n            </span>\r\n        </md-card-header-text>\r\n       \r\n    </md-card-header>\r\n\r\n</md-card>'},281:function(n,e){n.exports='  <md-button class="md-icon-button md-raised md-primary" aria-label="First" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>  \r\n                 <md-button class="md-icon-button md-raised" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="vm.index - 1 >= 0">&#8230;</md-button>  \r\n                 <md-button class=" md-raised md-fab md-mini" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"   \r\n                  ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]"   \r\n                  ng-class="{ \'md-warn\' : vm.page[vm.index + i] == vm.clCurrentPage}">\r\n      \r\n      {{ vm.page[vm.index + i] }}  \r\n                   \r\n     \r\n</md-button>  \r\n                 <md-button class="md-icon-button md-raised md-mini" aria-label="Next" ng-click="vm.gotoNext()" ng-show="vm.index + vm.clSteps < clPages">&#8230;</md-button>  \r\n                 <md-button class="md-icon-button md-raised md-primary" aria-label="Last" ng-click="vm.gotoLast()">{{ vm.last }}</md-button> \r\n'},282:function(n,e){n.exports='<form name="vm.FD.name" novalidate ng-submit="vm.onSubmit($event)">\r\n    <formly-form model="vm.FD.model" fields="vm.FD.fields">\r\n\r\n        <div layout="row" layout-align="end center">\r\n\r\n            <md-loading-button type="submit" md-class="md-raised md-primary" md-busy="vm.working"  md-disabled="vm.FD.name.$invalid">\r\n                <md-message>\r\n                    Invite\r\n                </md-message>\r\n                <md-loading-message>\r\n                    Loading..\r\n                </md-loading-message>\r\n            </md-loading-button>\r\n\r\n        </div>\r\n\r\n    </formly-form>\r\n\r\n</form>\r\n'},283:function(n,e){n.exports='<md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000">\r\n\r\n    <div layout="column" flex ng-show="true">\r\n        <div layout-margin layout="row">\r\n            <div class="md-whiteframe-3dp" flex-gt-sm="50" flex-offset-gt-sm="25" layout="column" flex="100">\r\n\r\n                <admin-header title="Send Invite"></admin-header>\r\n\r\n                <div layout="column" >\r\n                    <div layout-margin layout="row" flex>\r\n                        <invite-form class="flex"></invite-form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</md-animate>'},284:function(n,e){n.exports='<md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000">\r\n\r\n    <div layout="column" flex ng-show="true">\r\n        <div layout-margin layout="row">\r\n            <div class="md-whiteframe-3dp" flex-gt-sm="60" flex-offset-gt-sm="20" layout="column" flex="100">\r\n\r\n                <admin-header title="Manage Users"></admin-header>\r\n\r\n\r\n                <div layout="row" layout-align="center center" ng-if="vm.Loading" layout-padding>\r\n                    <div>\r\n                        <md-progress-circular md-mode="indeterminate"></md-progress-circular>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                    <div flex layout-padding layout="column" ng-if="!vm.Loading" >\r\n\r\n                        \r\n                        \x3c!--<div layout="row" flex  hide show-gt-sm >\r\n                            <div flex="20">Name</div>\r\n                            <div flex="20">Last Name</div>\r\n                            <div flex> Email</div>\r\n                            <div flex="10">Action</div>\r\n\r\n                        </div>\r\n                        <div layout="column" ng-repeat="record in vm.List" flex hide-gt-sm class="divider-line">\r\n                            <div layout="row">\r\n                                <div flex="30">Name</div>\r\n                                <div flex ng-bind="record.name"></div>\r\n                            </div>\r\n                            <div layout="row">\r\n                                <div flex="30">Last Name</div>\r\n                                <div flex ng-bind="record.lastName"></div>\r\n\r\n                            </div>\r\n                            <div layout="row">\r\n                                <div flex="30">Email</div>\r\n                                <div flex md-truncate ng-bind="record.email"></div>\r\n\r\n                            </div>\r\n                            <div layout="row">\r\n                                <div layout="row" layout-align="end center" flex>\r\n                                    <md-menu md-position-mode="target-right target">\r\n                                        <div ng-click="$mdMenu.open($event)"\r\n                                             style="padding-left:10px; padding-right:10px; cursor:pointer">\r\n                                            <md-icon md-font-icon="icon-ellipsis-vertical"></md-icon>\r\n                                        </div>\r\n\r\n                                        <md-menu-content width="4">\r\n                                            <md-menu-item ng-if="record.active">\r\n                                                <md-button ng-click="vm.Deactivate(record.email)">\r\n                                                    <md-icon md-font-icon="icon-remove"></md-icon>\r\n                                                    Deactivate\r\n                                                </md-button>\r\n                                            </md-menu-item>\r\n                                            <md-menu-item ng-if="!record.active">\r\n                                                <md-button ng-click="vm.Activate(record.email)">\r\n                                                    <md-icon md-font-icon="icon-ok"></md-icon>\r\n                                                    Activate\r\n                                                </md-button>\r\n                                            </md-menu-item>\r\n\r\n                                        </md-menu-content>\r\n                                    </md-menu>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div layout="row"   ng-repeat="record in vm.List" flex hide show-gt-sm class="divider-line">\r\n                            <div flex="20" ng-bind="record.name"></div>\r\n                            <div flex="20" ng-bind="record.lastName"></div>\r\n                            <div flex ng-bind="record.email"></div>\r\n                            <div flex="10">\r\n                                <div layout="row" layout-align="center center">\r\n                                    <md-menu md-position-mode="target-right target">\r\n                                        <div ng-click="$mdMenu.open($event)" \r\n                                             style="padding-left:10px; padding-right:10px; cursor:pointer">\r\n                                            <md-icon md-font-icon="icon-ellipsis-vertical" ></md-icon>\r\n                                        </div>\r\n\r\n                                        <md-menu-content width="4">\r\n                                            <md-menu-item ng-if="record.active">\r\n                                                <md-button ng-click="vm.Deactivate(record.email)">\r\n                                                    <md-icon md-font-icon="icon-remove"></md-icon>\r\n                                                    Deactivate\r\n                                                </md-button>\r\n                                            </md-menu-item>\r\n                                            <md-menu-item ng-if="!record.active">\r\n                                                <md-button ng-click="vm.Activate(record.email)">\r\n                                                    <md-icon md-font-icon="icon-ok"></md-icon>\r\n                                                    Activate\r\n                                                </md-button>\r\n                                            </md-menu-item>\r\n\r\n                                        </md-menu-content>\r\n                                    </md-menu>\r\n                               </div>\r\n                            </div>\r\n                        </div>--\x3e\r\n                        <div flex layout="column">\r\n                            <md-list class="md-dense" flex>\r\n                                <md-list-item class="md-3-line" ng-repeat="record in vm.List" ng-click="vm.openCtxt($event, $index)">\r\n                                    <img ng-src="{{record.image}}" class="md-avatar"  />\r\n                                    <div class="md-list-item-text" layout="column">\r\n                                        <h3>{{ record.name }} {{record.lastName}}</h3>\r\n                                        <h4>{{ record.jobTitle }}</h4>\r\n                                        <p>{{ record.email }}</p>\r\n                                    </div>\r\n                                    <div>\r\n                                        <md-menu md-position-mode="target-right target" data-attr-menu-index="{{$index}}">\r\n                                            <div ng-click="$mdMenu.open($event)"\r\n                                                 style="padding-left:10px; padding-right:10px; cursor:pointer">\r\n                                                <md-icon md-font-icon="icon-ellipsis-vertical"></md-icon>\r\n                                            </div>\r\n\r\n                                            <md-menu-content width="4">\r\n                                                <md-menu-item ng-if="record.active">\r\n                                                    <md-button ng-click="vm.Deactivate(record.email)">\r\n                                                        <md-icon md-font-icon="icon-remove"></md-icon>\r\n                                                        Deactivate\r\n                                                    </md-button>\r\n                                                </md-menu-item>\r\n                                                <md-menu-item ng-if="!record.active">\r\n                                                    <md-button ng-click="vm.Activate(record.email)">\r\n                                                        <md-icon md-font-icon="icon-ok"></md-icon>\r\n                                                        Activate\r\n                                                    </md-button>\r\n                                                </md-menu-item>\r\n                                                <md-menu-item ng-if="record.active" ng-click="vm.openRoleChangeDialog($event, record)">\r\n                                                    <md-button ng-click="null">\r\n                                                        <md-icon md-font-icon="icon-user"></md-icon>\r\n                                                        Update Role\r\n                                                    </md-button>\r\n                                                </md-menu-item>\r\n                                                <md-menu-item ng-if="record.active" ng-click="vm.openManualPasswordReset($event, record)">\r\n                                                    <md-button ng-click="null">\r\n                                                        <md-icon md-font-icon="icon-unlock-alt"></md-icon>\r\n                                                        Password Reset\r\n                                                    </md-button>\r\n                                                </md-menu-item>\r\n                                                <md-menu-divider></md-menu-divider>\r\n                                                <md-menu-item>\r\n                                                    <md-button>\r\n                                                        <md-icon md-font-icon="icon-signout"></md-icon>\r\n                                                        Cancel\r\n                                                    </md-button>\r\n                                                </md-menu-item>\r\n                                            </md-menu-content>\r\n                                        </md-menu>\r\n                                    </div>\r\n                                </md-list-item>\r\n                            </md-list>\r\n                        </div>\r\n\r\n                        <div flex layout="row">\r\n                            <div flex="20" ng-if="vm.Working">\r\n                                <md-progress-circular md-mode="indeterminate" md-diameter="20px"></md-progress-circular>\r\n                                \r\n                            \r\n                            </div>\r\n                            <div layout="row"    layout-align="end center" flex>\r\n                                <div ng-if="!vm.Loading">\r\n                                    \r\n                                    \r\n\r\n                                    <md-paginator flex cl-pages="vm.MaxPages" , cl-steps="3"\r\n                                                  cl-page-changed="vm.onPageChanged(page)"\r\n                                                  cl-align="center center"\r\n                                                  cl-current-page="1"></md-paginator>\r\n\r\n                                    \r\n\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n </md-animate>\r\n'},285:function(n,e){n.exports='<div flex layout-padding layout="column">\r\n\r\n    <md-list class="md-dense" flex>\r\n        <div style="position:absolute; right:15px; cursor:pointer; z-index:3000" ng-click="vm.Cancel()">\r\n            <md-icon md-font-icon="icon-remove"></md-icon>\r\n        </div>\r\n\r\n        <md-list-item class="md-3-line">\r\n            <img ng-src="{{vm.record.image}}" class="md-avatar" />\r\n            <div class="md-list-item-text" layout="column">\r\n                <h3>{{ vm.record.name }} {{vm.record.lastName}}</h3>\r\n                <h4>{{ vm.record.jobTitle }}</h4>\r\n                <p>{{ vm.record.email }}</p>\r\n            </div>\r\n        </md-list-item>\r\n\r\n    </md-list>\r\n\r\n    <div flex style="width:250px">\r\n\r\n        <json-form form-definition="vm.FD"\r\n                   button-text="Update"\r\n                   button-text-busy="Updating..."\r\n                   on-form-submit="vm.Submit($model)"\r\n                   button-busy="vm.Busy">\r\n\r\n        </json-form>\r\n\r\n\r\n    </div>\r\n\r\n\r\n</div>'},286:function(n,e){n.exports='<div flex layout-padding layout="column">\r\n    \r\n    <md-list class="md-dense" flex>\r\n        <div style="position:absolute; right:15px; cursor:pointer; z-index:3000" ng-click="vm.Cancel()">\r\n            <md-icon md-font-icon="icon-remove"  ></md-icon>\r\n        </div>\r\n\r\n        <md-list-item class="md-3-line">\r\n            <img ng-src="{{vm.record.image}}" class="md-avatar" />\r\n            <div class="md-list-item-text" layout="column">\r\n                <h3>{{ vm.record.name }} {{vm.record.lastName}}</h3>\r\n                <h4>{{ vm.record.jobTitle }}</h4>\r\n                <p>{{ vm.record.email }}</p>\r\n            </div>\r\n        </md-list-item>\r\n\r\n    </md-list>\r\n    <div flex>\r\n\r\n        <json-form form-definition="vm.FD"\r\n                   button-text="Save"\r\n                   button-text-busy="Saving..."\r\n                   on-form-submit="vm.Submit($model)"\r\n                   button-busy="vm.Busy">\r\n\r\n        </json-form>\r\n\r\n    \r\n    </div>\r\n        \r\n</div>'},474:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t(211),t(212),t(207),t(208),t(213),t(215),t(214),t(209),t(210)},8:function(n,e,t){"use strict";var r=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i;!function(n){var e=function(){function n(n,e,t){void 0===t&&(t=!1),this.key=n,this.type="input",this.templateOptions={},this.validation={},this.templateOptions.required=!!t,this.templateOptions.label=e;var r={required:function(n,e,t){return t.to.label+" is required"}};t&&(this.validation={messages:r})}return n}(),t=function(n){function e(e,t,r){void 0===r&&(r=!1);var i=n.call(this,e,t,r)||this;return i.templateOptions.label=t,i}return r(e,n),e}(e);n.Text=t;var i=function(n){function e(e,t,r){void 0===r&&(r=!1);var i=n.call(this,e,t,r)||this;return i.validators={email:{expression:function(n,e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e||n)},message:function(n,e){return n&&n+" is not a valid Email Address"}}},i}return r(e,n),e}(e);n.Email=i;var o=function(n){function e(e,t){var r=n.call(this,e,t,!0)||this;return r.templateOptions.type="password",r}return r(e,n),e}(e);n.Password=o;var a=function(n){function e(e,t,r,i,o){void 0===r&&(r=!1),void 0===i&&(i=0),void 0===o&&(o=1e3);var a=n.call(this,e,t,r)||this;return a.templateOptions.min=i,a.templateOptions.max=o,a}return r(e,n),e}(e);n.Number=a;var d=function(n){function e(e,t,r){var i=n.call(this,e,t,!0)||this;return i.type="select",i.templateOptions.options=r,i}return r(e,n),e}(e);n.Select=d,n.TEXT_EDITOR_TOOLBAR_THEMES={ALL:"ALL",SIMPLE:"SIMPLE",TEXT:"TEXT"};var m=function(e){function t(t,r){var i=e.call(this,t,r,!0)||this;return i.type="quillTextEditor",i.validation={messages:{required:function(n,e,t){return t.to.label+" is required"},maxLength:function(n,e,t){return"Max length is larger than "+t.to.htmlQuillEditor.maxlength+" characters "},minwords:function(n,e,t){var r=t.to;return t.to.label+" must have at least "+r.htmlQuillEditor.mdMinWordCount+" words..."},maxwords:function(n,e,t){var r=t.to;return t.to.label+" must not have more than "+r.htmlQuillEditor.mdMaxWordCount+" words..."}}},i.templateOptions.htmlQuillEditor={placeholder:"write a post",height:200,minlength:10,maxlength:240,toolbarTheme:n.TEXT_EDITOR_TOOLBAR_THEMES.ALL,mdMaxWordCount:100,mdMinWordCount:10},i}return r(t,e),t}(e);n.WysiwygTextEditor=m;var s=function(n){function e(e,t,r,i){void 0===i&&(i=[]);var o=n.call(this,e,t)||this;return o.type="chipItem",o.templateOptions.chipItem={},o.templateOptions.chipItem.options=i,o.templateOptions.chipItem.placeholder="Categories",o.templateOptions.chipItem.fieldDisplay=r,o.templateOptions.chipItem.optionsPromise=null,o.validation={messages:{empty:function(n,e,t){return t.to.label+" is required"}}},o}return r(e,n),e}(e);n.ChipOptions=s,n.IMAGE_PREVIEW_UPLOAD_TYPES={PROFILE:"MISSING_PROFILE_IMAGE",IMAGE:"MISSING_POST_IMAGE"};var c=function(n){function e(e,t,r,i){void 0===i&&(i=!1);var o=n.call(this,e,t)||this;return o.type="Image-Preview-Uploader",o.templateOptions.imgUploader={imgType:"MISSING_POST_IMAGE",aspectRatio:r,mdPreviewImg:!1,mdBtnText:""},o.validation={messages:{minWidth:function(n,e,t){return"Minimun width must be: "+t.to.imgUploader.aspectRatio.w+"px"},minHeight:function(n,e,t){return"Minimun height must be: "+t.to.imgUploader.aspectRatio.w+"px"}}},i&&(o.validators={requireimg:{expression:function(n,e){return!(!e&&!n)},message:function(n,e,t){return t.to.label+" is required"}}}),o}return r(e,n),e}(e);n.ImagePreviewerUpload=c}(i=e.Inputs||(e.Inputs={}));!function(n){!function(n){var e=function(e){function t(t,r){var i=e.call(this,t,r,"name",n.getStrengths())||this;return i.templateOptions.chipItem.placeholder="Enter your Top 5 Strengths",i.templateOptions.required=!0,i}return r(t,e),t}(i.ChipOptions);n.StrengthsChipOtions=e,n.getStrengths=function(){return[{name:"Achiever"},{name:"Activator"},{name:"Adaptability"},{name:"Analytical"},{name:"Arranger"},{name:"Belief"},{name:"Command"},{name:"Communication"},{name:"Competition"},{name:"Connectedness"},{name:"Consistency"},{name:"Context"},{name:"Deliberative"},{name:"Developer"},{name:"Discipline"},{name:"Empathy"},{name:"Focus"},{name:"Futuristic"},{name:"Harmony"},{name:"Ideation"},{name:"Includer"},{name:"Individualization"},{name:"Input"},{name:"Intellection"},{name:"Learner"},{name:"Maximizer"},{name:"Positivity"},{name:"Relator"},{name:"Responsibility"},{name:"Restorative"},{name:"Self-Assurance"},{name:"Significance"},{name:"Strategic"},{name:"Woo"}]}}(n.Strengths||(n.Strengths={}))}(e.InputsCustomTypes||(e.InputsCustomTypes={}))}});
//# sourceMappingURL=bundle.js.map