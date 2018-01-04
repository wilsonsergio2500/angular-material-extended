import * as angular from 'angular';
import { ILikeService } from '../../services/domains/like/like-service';
import { APP_MODULE } from '../../main/index';

const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

namespace Components.LikeCount {

    class LikeCountCtrl{
        postId: string;

        msg: string;
        delay: boolean;
        static $inject = ['LikeService', '$timeout']
        constructor(private LikeService: ILikeService, private $timeout: angular.ITimeoutService) {
            this.Init();
            this.delay = false;
        }
        Init = () => {
            this.LikeService.GetPostCount(this.postId).then((r) => {
                this.msg = `${numberWithCommas(r.count)} Likes`

                this.$timeout(() => {
                    this.delay = true;
                }, 1000)
                
            })
           
        }

        Refresh = () => {
            this.Init();
        }

    }

    const template = require('!!raw-loader!./like-count.html');
    function likeCount(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controllerAs: 'vm',
            bindToController: true,
            controller: LikeCountCtrl,
            scope: {
                postId : '='
            }
        }        

    }

    APP_MODULE.directive('likeCount', likeCount)

    
}