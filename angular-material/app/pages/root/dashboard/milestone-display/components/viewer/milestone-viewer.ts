
import * as angular from 'angular';
import { APP_MODULE } from '../../../../../../main/index';
import { ILikeService } from '../../../../../../services/domains/like/like-service';

namespace View.Componets {

    class MilestoneViewerCtrl {

        record: any;
        static $inject = ['LikeService']
        constructor(private LikeService: ILikeService) {
            console.log(this.record);
        }

        Like = (milestoneId: string) => {
            return this.LikeService.Like(milestoneId);
        }
        Unlike = (milestoneId: string) => {
            return this.LikeService.Unlike(milestoneId);
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