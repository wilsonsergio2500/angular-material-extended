
import * as angular from 'angular';
import { APP_MODULE } from '../../../../../../main/index';
import { ILikeService } from '../../../../../../services/domains/like/like-service';
import { IDialogService } from '../../../../../../services/dialog-service/dialog-service';

namespace View.Componets {

    class MilestoneViewerCtrl {

        record: any;
        content: string;
        static $inject = ['LikeService', '$element', 'DialogService', '$location', '$timeout', '$sce']
        constructor(private LikeService: ILikeService, private $element: angular.IAugmentedJQuery,
            private DialogService: IDialogService, private $location: angular.ILocationService,
            private $timeout: angular.ITimeoutService, private $sce: angular.ISCEService
        ) {
           
            this.Init();
        }
        Init = () => {
            this.content = this.$sce.trustAsHtml(this.record.milestone.postContent);
            console.log(this.content);
        }
        Like = (milestoneId: string) => {
            this.CounterRefresh();
            return this.LikeService.Like(milestoneId);
            
        }
        Unlike = (milestoneId: string) => {
            this.CounterRefresh();
            return this.LikeService.Unlike(milestoneId);
            
        }
        CounterRefresh = () => {
            const counter = this.$element[0].querySelector('like-count');
            const thumbnail = this.$element[0].querySelector('like-thumbnails');
            const counterComponent = angular.element(counter);
            const thumbnailsComponent = angular.element(thumbnail);
            setTimeout(() => counterComponent.data().$likeCountController.Refresh(), 100);
            setTimeout(() => thumbnailsComponent.data().$likeThumbnailsController.Refresh(), 100);
        }

        Remove = ($event: any) => {
            
            this.DialogService.DisplayRemoveLandmarkConfirmation($event, this.record).then((response) => {

                if (response && !!response.removed) {

                    this.$timeout(() => {
                        this.$location.path('/');
                    }, 2000);

                }

            });
        }


    }
    const template = require('!!raw-loader!./milestone-viewer.html');
    function milestoneViewer() {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            controller: MilestoneViewerCtrl,
            bindToController: true,
            scope: {
                record: '='
            }
        }
    }

    APP_MODULE.directive('milestoneViewer', milestoneViewer);

}