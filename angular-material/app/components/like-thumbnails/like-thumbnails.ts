import * as angular from 'angular';
import { APP_MODULE } from '../../main/index';
import { ILikeService } from '../../services/domains/like/like-service';

namespace Components.LikeThumbnail {

    class LikeThumbnailCtrl {
        static $inject = ['LikeService', '$timeout']
        postId: string;
        items: any[];
        delay: boolean;
        constructor(private LikeService: ILikeService, private $timeout: angular.ITimeoutService) {
            this.delay = false;
            this.Init();
            
        }
        Init = () => {

            this.LikeService.GetRecent(this.postId).then((R) => {
                this.items = R.result;

                this.$timeout(() => {
                    this.delay = true;
                }, 1500)

            })
        }
        Refresh = () => {
            this.Init();
        }

    }

    const template = require('!!raw-loader!./like-thumbnails.html');
    function likeThumbnails(): angular.IDirective{
        return <angular.IDirective>{
            controllerAs: 'vm',
            bindToController: true,
            template: template,
            controller: LikeThumbnailCtrl,
            scope: {
                postId: '='
            }
        }
    }

    APP_MODULE.directive('likeThumbnails', likeThumbnails)
}