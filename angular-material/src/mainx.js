/// <reference path="services/secure-route/secure-route.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
//services
require('./services/resize-detector-service/resize-detector-service');
require('./services/img-enums/imgenums');
require('./services/toaster-service/toater-service');
require('./services/http-service/http-service');
require('./services/domains/category/category-service');
require('./services/domains/role/role-service');
require('./services/domains/invite/invite-service');
require('./services/domains/milestone/milestone-service');
require('./services/domains/login/login-service');
require('./services/domains/user/user-service');
require('./services/domains/like/like-service');
require('./services/secure-route/secure-route');
//services component
require('./services/toaster-service/toaster-status/toaster-status');
//components services
require('./components/img-cropper/img-cropper-dialog-service.ts');
//components
require('./components/loading-button/loading-button');
require('./components/loading-button/message/message');
require('./components/loading-button/loading-message/loading-message');
require('./components/img-uploader/img-uploader');
require('./components/img-loader/image-loader');
require('./components/img-cropper/img-cropper');
require('./components/quill-text-editor/quill-text-editor');
require('./components/md-chip-items/md-chip-items');
require('./components/example/example-component');
require('./components/fit-to-element/fit-to-element');
require('./components/tile-view/tile-view');
require('./components/tile-view-responsive/tile-view-responsive');
require('./components/loading-panel/loading-panel');
require('./components/img-upload-cropper/img-upload-cropper');
require('./components/img-profile-upload/img-profile-upload');
require('./components/img-previewer-upload/img-previewer-upload');
require('./components/check/check-animation');
require('./components/thumbs-up/thumbs-up');
require('./components/animate/animate');
//component viewers
require('./pages/root/dashboard/milestone-display/components/viewer/milestone-viewer');
//forms
require('./forms/login/login');
require('./forms/invite/invite');
require('./forms/category/category');
require('./forms/profile/profile');
require('./forms/milestone/milestone');
require('./forms/blog/blog');
require('./forms/profile/edit-image/edit-image');
require('./forms/profile/edit-bio/edit-bio');
//views
require('./views/login-view/login-view');
//config
require('./main/config');
//controllers
//import './main/rootctrl'; 
//# sourceMappingURL=mainx.js.map