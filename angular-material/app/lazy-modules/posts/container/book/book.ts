
declare var angular: angular.IAngularStatic;
import { POST_MODULE } from '../../module';
import { FormTabWizard, IFormTabWizardItem } from '../../models/formtabwizard';

namespace Components.Book{

    class BookCtrl {
        constructor() {

        }
    }

  const template = require('!!raw-loader!./book.html');
    function bookPost(): angular.IDirective {
        return <angular.IDirective>{
            template: template,
            controller: BookCtrl,
            controllerAs: 'vm',
            bindToController: true,
        }

 }
    POST_MODULE.directive('bookPost', bookPost)
}