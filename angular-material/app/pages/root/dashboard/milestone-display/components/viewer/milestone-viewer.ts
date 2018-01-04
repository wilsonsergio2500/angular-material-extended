
import * as angular from 'angular';
import { APP_MODULE } from '../../../../../../main/index';
import { ILikeService } from '../../../../../../services/domains/like/like-service';

namespace View.Componets {

    class MilestoneViewerCtrl {

        record: any;
        static $inject = ['LikeService', '$element']
        constructor(private LikeService: ILikeService, private $element: angular.IAugmentedJQuery) {
            console.log(this.record);

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
            const counterComponent = angular.element(counter);
            setTimeout(() => counterComponent.data().$likeCountController.Refresh() , 100);
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