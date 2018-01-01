!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=459)}({11:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});!function(t){var e=function(){function t(t,e,n){void 0===n&&(n=!1),this.key=t,this.type="input",this.templateOptions={},this.validation={},this.templateOptions.required=!!n,this.templateOptions.label=e;var r={required:function(t,e,n){return n.to.label+" is required"}};n&&(this.validation={messages:r})}return t}(),n=function(t){function e(e,n,r){void 0===r&&(r=!1);var o=t.call(this,e,n,r)||this;return o.templateOptions.label=n,o}return r(e,t),e}(e);t.Text=n;var o=function(t){function e(e,n,r){void 0===r&&(r=!1);var o=t.call(this,e,n,r)||this;return o.validators={email:{expression:function(t,e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e||t)},message:function(t,e){return t&&t+" is not a valid Email Address"}}},o}return r(e,t),e}(e);t.Email=o;var i=function(t){function e(e,n){var r=t.call(this,e,n,!0)||this;return r.templateOptions.type="password",r}return r(e,t),e}(e);t.Password=i;var a=function(t){function e(e,n,r,o,i){void 0===r&&(r=!1),void 0===o&&(o=0),void 0===i&&(i=1e3);var a=t.call(this,e,n,r)||this;return a.templateOptions.min=o,a.templateOptions.max=i,a}return r(e,t),e}(e);t.Number=a;var s=function(t){function e(e,n,r){var o=t.call(this,e,n,!0)||this;return o.type="select",o.templateOptions.options=r,o}return r(e,t),e}(e);t.Select=s,t.TEXT_EDITOR_TOOLBAR_THEMES={ALL:"ALL",SIMPLE:"SIMPLE",TEXT:"TEXT"};var l=function(e){function n(n,r){var o=e.call(this,n,r,!0)||this;return o.type="quillTextEditor",o.validation={messages:{required:function(t,e,n){return n.to.label+" is required"},maxLength:function(t,e,n){return"Max length is larger than "+n.to.htmlQuillEditor.maxlength+" characters "},minwords:function(t,e,n){var r=n.to;return n.to.label+" must have at least "+r.htmlQuillEditor.mdMinWordCount+" words..."},maxwords:function(t,e,n){var r=n.to;return n.to.label+" must not have more than "+r.htmlQuillEditor.mdMaxWordCount+" words..."}}},o.templateOptions.htmlQuillEditor={placeholder:"write a post",height:200,minlength:10,maxlength:240,toolbarTheme:t.TEXT_EDITOR_TOOLBAR_THEMES.ALL,mdMaxWordCount:100,mdMinWordCount:10},o}return r(n,e),n}(e);t.WysiwygTextEditor=l;var u=function(t){function e(e,n,r,o){void 0===o&&(o=[]);var i=t.call(this,e,n)||this;return i.type="chipItem",i.templateOptions.chipItem={},i.templateOptions.chipItem.options=o,i.templateOptions.chipItem.placeholder="Categories",i.templateOptions.chipItem.fieldDisplay=r,i.templateOptions.chipItem.optionsPromise=null,i.validation={messages:{empty:function(t,e,n){return n.to.label+" is required"}}},i}return r(e,t),e}(e);t.ChipOptions=u,t.IMAGE_PREVIEW_UPLOAD_TYPES={PROFILE:"MISSING_PROFILE_IMAGE",IMAGE:"MISSING_POST_IMAGE"};var c=function(t){function e(e,n,r,o){void 0===o&&(o=!1);var i=t.call(this,e,n)||this;return i.type="Image-Preview-Uploader",i.templateOptions.imgUploader={imgType:"MISSING_POST_IMAGE",aspectRatio:r,mdPreviewImg:!1,mdBtnText:""},i.validation={messages:{minWidth:function(t,e,n){return"Minimun width must be: "+n.to.imgUploader.aspectRatio.w+"px"},minHeight:function(t,e,n){return"Minimun height must be: "+n.to.imgUploader.aspectRatio.w+"px"}}},o&&(i.validators={requireimg:{expression:function(t,e){return!(!e&&!t)},message:function(t,e,n){return n.to.label+" is required"}}}),i}return r(e,t),e}(e);t.ImagePreviewerUpload=c}(e.Inputs||(e.Inputs={}))},16:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.name="form",this.model={},this.working=!1,this.options={},this.disabled=!1}return t}();e.FormDefinition=r},17:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){!function(t){t.FEED="items",t.ITEMS_GRID="itemsgrid";!function(t){!function(t){t.MAIN="PROFILE",t.CATEGORY_TILE_VIEW="CATEGORY_TILE_VIEW"}(t.VIEWS||(t.VIEWS={})),t.EDIT_IMAGE="profile_edit_image",t.EDIT_BIO="profile_edit_bio"}(t.PROFILE||(t.PROFILE={}));!function(t){t.ADD="MILESTONE_ADD",t.POST="MILESTONE_POST",t.MILESTONE_VIEW="milestone_view"}(t.MILESTONE||(t.MILESTONE={}));!function(t){t.INVITE="INVITE",t.CATEGORY="category"}(t.ADMIM||(t.ADMIM={}));!function(t){t.MAIN="WIZARD_ADD"}(t.WIZARD_ADD||(t.WIZARD_ADD={}))}(t.NAMES||(t.NAMES={}))}(e.DASHBOARD||(e.DASHBOARD={}))},209:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(56);!function(t){!function(t){function e(){return{template:i,controller:r,controllerAs:"vm",bindToController:!0,scope:{groups:"=",onFinished:"&",busy:"="}}}var r=function(){function t(){}return t.prototype.Submit=function(t){t==this.groups.Size-1?this.onFinished.call(this):this.selectedIndex=t+1},t.prototype.Back=function(){this.selectedIndex--},t}(),i=n(271);o.POST_MODULE.directive("formTabWizard",e)}(t.Posts||(t.Posts={}))}(r||(r={}))},210:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o,i=n(56),a=n(80),s=n(78),l=n(79),u=n(41);!function(t){!function(t){function e(){return{template:c,controller:o,controllerAs:"vm",bindToController:!0,scope:{injected:"="}}}var o=function(t){function e(e,n,r,o){var i=t.call(this,e,n,r,o)||this;return i.InitForm=function(){i.Model.type=u.MilestoneType.Book;var t=l.FIELDS.THEME();t.templateOptions.label="Book Title",t.templateOptions.placeholder="Enter Book Title";var e=l.FIELDS.IMAGE();e.templateOptions.imgUploader.mdBtnText="Upload Book Image";var n={Fields:[t]},r={Fields:[l.FIELDS.POST()]},o={Fields:[e]};i.Forms=new a.FormTabWizard([n,r,o],i.Model)},i.TypeTitle="Book",i.icon="icon-book",i.InitForm(),i}return r(e,t),e}(s.Base);o.$inject=["MilestoneService","$timeout","ToasterService","$state"];var c=n(58);i.POST_MODULE.directive("bookPost",e)}(t.Book||(t.Book={}))}(o||(o={}))},211:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o,i=n(78),a=n(56),s=n(79),l=n(41),u=n(80);!function(t){!function(t){function e(){return{template:c,controller:o,controllerAs:"vm",bindToController:!0,scope:{injected:"="}}}var o=function(t){function e(e,n,r,o,i){var a=t.call(this,e,n,r,o)||this;return a.CategoryService=i,a.InitForm=function(){a.Model.type=l.MilestoneType.LandMark;var t=s.FIELDS.THEME();t.templateOptions.label="Milestone",t.templateOptions.placeholder="Enter Milestone";var e=s.FIELDS.POST();e.templateOptions.htmlQuillEditor.placeholder="Share the Lecture biggest takeaway";var n=s.FIELDS.IMAGE();n.templateOptions.imgUploader.mdBtnText="Upload Image";var r=s.FIELDS.CATEGORY();r.templateOptions.chipItem.optionsPromise=a.$categoryQuery;var o={Fields:[t,r]},i={Fields:[e]},c={Fields:[n]};a.Forms=new u.FormTabWizard([c,o,i],a.Model)},a.$categoryQuery=function(t){return a.CategoryService.MatchCategory(t)},a.TypeTitle="Milestone",a.icon="icon-flag",a.InitForm(),a}return r(e,t),e}(i.Base);o.$inject=["MilestoneService","$timeout","ToasterService","$state","CategoryService"];var c=n(58);a.POST_MODULE.directive("landmarkPost",e)}(t.Landmark||(t.Landmark={}))}(o||(o={}))},212:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o,i=n(78),a=n(56),s=n(79),l=n(41),u=n(80);!function(t){!function(t){function e(){return{template:c,controller:o,controllerAs:"vm",bindToController:!0,scope:{injected:"="}}}var o=function(t){function e(e,n,r,o){var i=t.call(this,e,n,r,o)||this;return i.InitForm=function(){i.Model.type=l.MilestoneType.Class;var t=s.FIELDS.THEME();t.templateOptions.label="Lecture",t.templateOptions.placeholder="Enter Lecture or Class Attended";var e=s.FIELDS.POST();e.templateOptions.htmlQuillEditor.placeholder="Share the Lecture biggest takeaway";var n=s.FIELDS.IMAGE();n.templateOptions.imgUploader.mdBtnText="Upload Lecture Picture",n.templateOptions.required=!1,delete n.validators.requireimg;var r={Fields:[t]},o={Fields:[e]},a={Fields:[n]};i.Forms=new u.FormTabWizard([a,r,o],i.Model)},i.TypeTitle="Lecture",i.icon="icon-calendar",i.InitForm(),i}return r(e,t),e}(i.Base);o.$inject=["MilestoneService","$timeout","ToasterService","$state"];var c=n(58);a.POST_MODULE.directive("lecturePost",e)}(t.Lecture||(t.Lecture={}))}(o||(o={}))},213:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o,i=n(78),a=n(56),s=n(79),l=n(41),u=n(80);!function(t){!function(t){function e(){return{template:c,controller:o,controllerAs:"vm",bindToController:!0,scope:{injected:"="}}}var o=function(t){function e(e,n,r,o){var i=t.call(this,e,n,r,o)||this;return i.InitForm=function(){i.Model.type=l.MilestoneType.Podcast;var t=s.FIELDS.THEME();t.templateOptions.label="Podcast",t.templateOptions.placeholder="Enter Podcast Title";var e=s.FIELDS.POST();e.templateOptions.htmlQuillEditor.placeholder="Share podcast biggest takeaway";var n={Fields:[t]},r={Fields:[e]};i.Forms=new u.FormTabWizard([n,r],i.Model)},i.TypeTitle="Podcast",i.icon="icon-microphone",i.InitForm(),i}return r(e,t),e}(i.Base);o.$inject=["MilestoneService","$timeout","ToasterService","$state"];var c=n(58);a.POST_MODULE.directive("podcastPost",e)}(t.Podcast||(t.Podcast={}))}(o||(o={}))},27:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){t.FlexSize=function(t){return"flex-"+t+" flex-xs-100 flex-sm-100"},t.FlexCenter50=function(){return"flex-gt-sm-50 flex-offset-gt-sm-25 layout-column flex-100"},t.FlexPadding=function(){return"layout-padding"},t.RowWrapper=function(t){return{className:"layout-row layout-xs-column layout-sm-column",fieldGroup:t}},t.ColumnWrapper=function(t){return{className:"layout-column",fieldGroup:t}}}(e.Wrappers||(e.Wrappers={}))},271:function(t,e){t.exports='\r\n    <md-tabs md-selected="vm.selectedIndex" md-border-bottom md-autoselect md-swipe-content flex md-dynamic-height class="form-tab-wizard">\r\n\r\n        <md-tab ng-repeat="tab in vm.groups.Forms"\r\n                ng-disabled="tab.disabled"\r\n                label="{{$index}}">\r\n            \r\n                <md-content style="overflow-x:hidden">\r\n\r\n                    \r\n                        <div  flex-gt-sm="90" flex-offset-gt-sm="5" layout="column" flex="100">\r\n\r\n                        <json-form form-definition="tab"\r\n                                   button-text="{{ ($index == (vm.groups.Size - 1)) ? \'Save\' : \'Next\' }}"\r\n                                   button-text-busy="Saving..."\r\n                                   on-form-submit="vm.Submit($index)"\r\n                                   button-busy="vm.busy">\r\n\r\n                        </json-form>\r\n\r\n\r\n                        <div class="prior">\r\n                            <md-button class="md-raised md-warn" ng-disabled="vm.busy" ng-if="($index > 0)" ng-click="vm.Back()"> << </md-button>\r\n                        </div>\r\n\r\n                    \r\n\r\n                       </div>\r\n                </md-content>\r\n\r\n        </md-tab>\r\n\r\n            \r\n\r\n</md-tabs>\r\n'},41:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){t[t.None=0]="None",t[t.LandMark=1]="LandMark",t[t.Post=2]="Post",t[t.Book=3]="Book",t[t.Podcast=4]="Podcast",t[t.Class=5]="Class"}(e.MilestoneType||(e.MilestoneType={}))},459:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(209),n(210),n(213),n(212),n(211)},55:function(t,e,n){"use strict";function r(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n={},r=0,o=t;r<o.length;r++){var i=o[r];for(var a in i)n[a]=i[a]}return n}Object.defineProperty(e,"__esModule",{value:!0}),e.MergeObject=r},56:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.POST_MODULE=angular.module("postactions",[])},58:function(t,e){t.exports='<md-animate md-animate-class="fx-bounce-down fx-dur-742 fx-ease-sine " md-delay="700">\r\n\r\n    <div layout="column" flex ng-show="true">\r\n        <div layout-margin layout="row">\r\n            <div flex-gt-sm="60" flex-offset-gt-sm="20" \r\n                 flex-gt-md="50" flex-offset-gt-md="25" \r\n                 layout="column" flex="100">\r\n\r\n                <md-card flex class="md-whiteframe-12dp margin-top-25" layout="column">\r\n\r\n\r\n\r\n                    <user-header profile="vm.injected" label="\'Share \' + vm.TypeTitle" icon="vm.icon" flex></user-header>\r\n\r\n                    <div layout="column" flex>\r\n\r\n                        <div layout="column" flex ng-show="true">\r\n                            <div layout-margin layout="row" flex>\r\n                                <form-tab-wizard class="flex" groups="vm.Forms" on-finished="vm.onFinilized()" busy="vm.IsWorking">\r\n\r\n                                </form-tab-wizard>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </md-card>\r\n\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</md-animate>\r\n'},78:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(17),o=function(){function t(t,e,n,r){this.MilestoneService=t,this.$timeout=e,this.ToasterService=n,this.$state=r,this.IsWorking=!1,this.Model={categories:[]}}return t.prototype.onFinilized=function(){var t=this;this.IsWorking=!0;var e=this.Forms.getValue();this.MilestoneService.Add(e).then(function(e){e.state&&(t.ToasterService.ShowAsStatus(t.TypeTitle+" Added Successfully"),t.IsWorking=!1,t.$timeout(function(){t.$state.go(r.DASHBOARD.NAMES.FEED)},1500))})},t}();e.Base=o},79:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(11),o=n(27),i=new r.Inputs.Text("theme","Enter Book Title",!0),a=new r.Inputs.WysiwygTextEditor("postContent","Your Takeaway");a.templateOptions.htmlQuillEditor.toolbarTheme=r.Inputs.TEXT_EDITOR_TOOLBAR_THEMES.SIMPLE,a.templateOptions.htmlQuillEditor.placeholder="Share your biggest takeaway",a.templateOptions.htmlQuillEditor.mdMinWordCount=40,a.templateOptions.htmlQuillEditor.mdMaxWordCount=90;var s=new r.Inputs.ImagePreviewerUpload("image","Image",{w:300,h:135},!0);s.templateOptions.imgUploader.mdBtnText="Add Book Image",s.className=o.Wrappers.FlexCenter50();var l=new r.Inputs.ChipOptions("categories","Category","name");e.FIELDS={THEME:function(){return angular.copy(i)},POST:function(){return angular.copy(a)},IMAGE:function(){return angular.copy(s)},CATEGORY:function(){return angular.copy(l)}}},80:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(16),o=n(55),i=function(){function t(t,e){void 0===e&&(e={});var n=this;this.model=e,this.Forms=[],this.Init=function(t){t.forEach(function(t,e){var o=new r.FormDefinition;o.fields=t.Fields,o.name="form"+e,o.model=n.model,n.Forms.push(o)}),n.Size=n.Forms.length},this.Init(t)}return t.prototype.getValue=function(){var t={};return this.Forms.forEach(function(e){t=o.MergeObject(t,e.model)}),t},t}();e.FormTabWizard=i}});
//# sourceMappingURL=bundle.js.map