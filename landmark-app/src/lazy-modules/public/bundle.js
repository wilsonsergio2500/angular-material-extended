!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=460)}({11:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});!function(t){var e=function(){function t(t,e,n){void 0===n&&(n=!1),this.key=t,this.type="input",this.templateOptions={},this.validation={},this.templateOptions.required=!!n,this.templateOptions.label=e;var r={required:function(t,e,n){return n.to.label+" is required"}};n&&(this.validation={messages:r})}return t}(),n=function(t){function e(e,n,r){void 0===r&&(r=!1);var o=t.call(this,e,n,r)||this;return o.templateOptions.label=n,o}return r(e,t),e}(e);t.Text=n;var o=function(t){function e(e,n,r){void 0===r&&(r=!1);var o=t.call(this,e,n,r)||this;return o.validators={email:{expression:function(t,e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e||t)},message:function(t,e){return t&&t+" is not a valid Email Address"}}},o}return r(e,t),e}(e);t.Email=o;var i=function(t){function e(e,n){var r=t.call(this,e,n,!0)||this;return r.templateOptions.type="password",r}return r(e,t),e}(e);t.Password=i;var a=function(t){function e(e,n,r,o,i){void 0===r&&(r=!1),void 0===o&&(o=0),void 0===i&&(i=1e3);var a=t.call(this,e,n,r)||this;return a.templateOptions.min=o,a.templateOptions.max=i,a}return r(e,t),e}(e);t.Number=a;var l=function(t){function e(e,n,r){var o=t.call(this,e,n,!0)||this;return o.type="select",o.templateOptions.options=r,o}return r(e,t),e}(e);t.Select=l,t.TEXT_EDITOR_TOOLBAR_THEMES={ALL:"ALL",SIMPLE:"SIMPLE",TEXT:"TEXT"};var s=function(e){function n(n,r){var o=e.call(this,n,r,!0)||this;return o.type="quillTextEditor",o.validation={messages:{required:function(t,e,n){return n.to.label+" is required"},maxLength:function(t,e,n){return"Max length is larger than "+n.to.htmlQuillEditor.maxlength+" characters "},minwords:function(t,e,n){var r=n.to;return n.to.label+" must have at least "+r.htmlQuillEditor.mdMinWordCount+" words..."},maxwords:function(t,e,n){var r=n.to;return n.to.label+" must not have more than "+r.htmlQuillEditor.mdMaxWordCount+" words..."}}},o.templateOptions.htmlQuillEditor={placeholder:"write a post",height:200,minlength:10,maxlength:240,toolbarTheme:t.TEXT_EDITOR_TOOLBAR_THEMES.ALL,mdMaxWordCount:100,mdMinWordCount:10},o}return r(n,e),n}(e);t.WysiwygTextEditor=s;var u=function(t){function e(e,n,r,o){void 0===o&&(o=[]);var i=t.call(this,e,n)||this;return i.type="chipItem",i.templateOptions.chipItem={},i.templateOptions.chipItem.options=o,i.templateOptions.chipItem.placeholder="Categories",i.templateOptions.chipItem.fieldDisplay=r,i.templateOptions.chipItem.optionsPromise=null,i.validation={messages:{empty:function(t,e,n){return n.to.label+" is required"}}},i}return r(e,t),e}(e);t.ChipOptions=u,t.IMAGE_PREVIEW_UPLOAD_TYPES={PROFILE:"MISSING_PROFILE_IMAGE",IMAGE:"MISSING_POST_IMAGE"};var c=function(t){function e(e,n,r,o){void 0===o&&(o=!1);var i=t.call(this,e,n)||this;return i.type="Image-Preview-Uploader",i.templateOptions.imgUploader={imgType:"MISSING_POST_IMAGE",aspectRatio:r,mdPreviewImg:!1,mdBtnText:""},i.validation={messages:{minWidth:function(t,e,n){return"Minimun width must be: "+n.to.imgUploader.aspectRatio.w+"px"},minHeight:function(t,e,n){return"Minimun height must be: "+n.to.imgUploader.aspectRatio.w+"px"}}},o&&(i.validators={requireimg:{expression:function(t,e){return!(!e&&!t)},message:function(t,e,n){return n.to.label+" is required"}}}),i}return r(e,t),e}(e);t.ImagePreviewerUpload=c}(e.Inputs||(e.Inputs={}))},16:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.name="form",this.model={},this.working=!1,this.options={},this.disabled=!1}return t}();e.FormDefinition=r},214:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(81);!function(t){!function(t){function e(){return{template:i,controllerAs:"vm",bindToController:!0,controller:r}}var r=function(){function t(t,e){this.$state=t,this.$location=e}return t.prototype.goToLogin=function(){this.$location.path("/")},t}();r.$inject=["$state","$location"];var i=n(272);o.EXTERNAL_DISPLAY_MODULE.directive("completeIndicator",e)}(t.Public||(t.Public={}))}(r||(r={}))},215:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(81);!function(t){!function(t){function e(){return{bindToController:!0,controllerAs:"vm",controller:r,template:i,scope:{invite:"="}}}var r=function(){function t(){console.log(this.invite)}return t}(),i=n(273);o.EXTERNAL_DISPLAY_MODULE.directive("completeProfile",e)}(t.Public||(t.Public={}))}(r||(r={}))},216:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(16),i=n(81),a=n(11),l=n(27);!function(t){!function(t){function e(){return{template:s,bindToController:!0,controllerAs:"vm",controller:r,scope:{model:"="}}}var r=function(){function t(t,e,n,r,i){var s=this;this.InviteService=t,this.$timeout=e,this.$state=n,this.UserService=r,this.$q=i,this.getFormFields=function(){var t=new a.Inputs.ImagePreviewerUpload("image","Image",{w:200,h:200});t.templateOptions.imgUploader.imgType=a.Inputs.IMAGE_PREVIEW_UPLOAD_TYPES.PROFILE,t.className=l.Wrappers.FlexSize(33);var e=new a.Inputs.WysiwygTextEditor("bio","Bio");e.templateOptions.htmlQuillEditor.toolbarTheme=a.Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE,e.templateOptions.htmlQuillEditor.placeholder="Enter your bio";var n=new a.Inputs.Email("email","Email",!0);n.className=l.Wrappers.FlexSize(66),n.templateOptions.disabled=!0;var r={className:"layout-row layout-xs-column layout-sm-column",fieldGroup:[t,e]},o=new a.Inputs.Text("name","Name",!0),i=new a.Inputs.Text("lastName","Last Name",!0),u=new a.Inputs.Text("userName","User",!0);u.modelOptions={debounce:250},u.asyncValidators={unique:{expression:function(t,e,n){return s.FD.working=!0,s.$q(function(e,n){s.UserService.CheckUserNameUsed(t).then(function(t){t.state&&n("category name taken"),e(),s.FD.working=!1})})},message:function(t,e){return"User name unavailable"}}};var c=new a.Inputs.Password("password","Password"),m=new a.Inputs.Password("password_confirm","Password Confirmation");return m.validators={MatchPassword:{expression:function(t,e,n){return t==n.model.password},message:'"The above value must match password field"'}},[r,l.Wrappers.RowWrapper([o,i]),u,n,l.Wrappers.RowWrapper([c,m])]},this.FD=new o.FormDefinition,this.FD.fields=this.getFormFields(),this.FD.model={email:this.model.email,Role:this.model.participationRoleType},this.Busy=!1}return t.prototype.Submit=function(t){var e=this;console.log(t),this.Busy=!0;var n={user:this.FD.model,invitationId:this.model.id};this.InviteService.Complete(n).then(function(t){t.state&&e.$timeout(function(){e.$state.go("completed")},500)})},t}();r.$inject=["InviteService","$timeout","$state","UserService","$q"],t.CompleteProfileFormCtrl=r;var s=n(274);i.EXTERNAL_DISPLAY_MODULE.directive("completeProfileForm",e)}(t.Public||(t.Public={}))}(r||(r={}))},217:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(81);!function(t){!function(t){function e(){return{template:i,controllerAs:"vm",bindToController:!0,controller:r}}var r=function(){function t(t,e){this.$state=t}return t}();r.$inject=["$state","$timeout"];var i=n(275);o.EXTERNAL_DISPLAY_MODULE.directive("containerExternal",e)}(t.Public||(t.Public={}))}(r||(r={}))},27:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){t.FlexSize=function(t){return"flex-"+t+" flex-xs-100 flex-sm-100"},t.FlexCenter50=function(){return"flex-gt-sm-50 flex-offset-gt-sm-25 layout-column flex-100"},t.FlexPadding=function(){return"layout-padding"},t.RowWrapper=function(t){return{className:"layout-row layout-xs-column layout-sm-column",fieldGroup:t}},t.ColumnWrapper=function(t){return{className:"layout-column",fieldGroup:t}}}(e.Wrappers||(e.Wrappers={}))},272:function(t,e){t.exports='<div layout="column" flex>\r\n\r\n    <md-animate md-animate-class="fx-zoom-up fx-dur-742 fx-ease-sine" md-delay="1000">\r\n\r\n        <div layout="column" flex ng-show="true">\r\n            <div layout-margin layout="row">\r\n                <div class="md-whiteframe-3dp" flex-gt-sm="50" flex-offset-gt-sm="25" layout="column" flex="100">\r\n                  \r\n\r\n                    <div layout-margin class="action-completed-indicator">\r\n\r\n                        <div layout="row" layout-align="center center">\r\n                            <div class="anim-block">\r\n                                <md-check-animation ref="vm.acheck" speed="5" color="rgba(0, 150, 0, 1)" play-after="1200" width="150"></md-check-animation>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div flex class="content">\r\n                            <md-animate md-animate-class="fx-fade-normal fx-dur-500 fx-ease-sine" md-delay="2000">\r\n                                <div layout="row" layout-align="center center">\r\n                                    <h3>Invitation Completed</h3>\r\n\r\n                                </div>\r\n\r\n                                <div layout="row" layout-align="center center">\r\n\r\n                                    <md-button class="md-raised md-warn" ng-click="vm.goToLogin()">Login</md-button>\r\n\r\n                                </div>\r\n\r\n                            </md-animate>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </md-animate>\r\n\r\n</div>'},273:function(t,e){t.exports='\r\n<div layout="column" flex ng-show="true">\r\n    <md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine" md-delay="1000">\r\n\r\n\r\n        <div layout-margin layout="row" flex>\r\n            <div class="md-whiteframe-3dp" flex-gt-sm="50" flex-offset-gt-sm="25" layout="column" flex="100">\r\n                <md-toolbar>\r\n                    <div class="md-toolbar-tools">\r\n\r\n                        <md-button aria-label="view logo">\r\n                            <md-icon class="icon-envelope-alt"></md-icon>\r\n                        </md-button>\r\n\r\n                        <h2 flex>Invite Complete Form</h2>\r\n                    </div>\r\n                </md-toolbar>\r\n                <div layout-margin flex>\r\n                    <complete-profile-form model="vm.invite" />\r\n                    \r\n                </div>\r\n             \r\n            </div>\r\n        </div>\r\n\r\n\r\n    </md-animate>\r\n\r\n</div>'},274:function(t,e){t.exports='<json-form form-definition="vm.FD" \r\n           button-text="Save" \r\n           button-text-busy="Saving..." \r\n           on-form-submit="vm.Submit($model)"\r\n           button-busy="vm.Busy" >\r\n\r\n</json-form>'},275:function(t,e){t.exports='<div flex layout="column" tabindex="-1" role="main" class="md-whiteframe-z2">\r\n\r\n    <md-toolbar layout="row" class="md-whiteframe-z1" ng-hide="false" ng-cloak flex="initial">\r\n        <div class="md-toolbar-tools">\r\n\r\n            <md-button class="md-icon-button" aria-label="logo" ng-disabled="false">\r\n                <md-icon md-svg-src="/fonts/logo/logo-svg.svg" aria-label="logo"></md-icon>\r\n            </md-button>\r\n            <h1 md-truncate>\r\n                Landmark\r\n            </h1>\r\n\r\n        </div>\r\n    </md-toolbar>\r\n\r\n    <md-content flex id="content" class="bg-sp">\r\n       <div ui-view flex  autoscroll="true"></div>\r\n    </md-content>\r\n\r\n        \r\n</div>\r\n'},460:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(217),n(215),n(216),n(214)},81:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EXTERNAL_DISPLAY_MODULE=angular.module("external",["ui.router"])}});
//# sourceMappingURL=bundle.js.map