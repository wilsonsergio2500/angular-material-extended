
import { APP_MODULE} from '../../main/index';

export interface IActionItem {
    FontIcon: string;
    Label: string;
    Path: string;

}

export interface IActionService {
    getActions(): IActionItem[];
}

namespace Services {

    class ActionsService implements IActionService {

        Actions: IActionItem[] = [];
        constructor() {

            this.Actions.push(<IActionItem>{
                FontIcon: 'icon-book',
                Label: 'Book',
                Path: 'dashboard/post/book'
            })

            this.Actions.push(<IActionItem>{
                FontIcon: 'icon-microphone',
                Label: 'Pocast',
                Path: 'dashboard/post/podcast'
            })

            this.Actions.push(<IActionItem>{
                FontIcon: 'icon-calendar',
                Label: 'Training',
                Path: 'dashboard/post/lecture'
            });
        }

        getActions() {
            return this.Actions;
        }



    }
    APP_MODULE.service('ActionService', ActionsService);

}