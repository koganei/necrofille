import { angular } from './../../js/base';
import jQuery from 'jquery';
import BaseController from '../base-controller/index.js';

let $timeout, $q;

class phoneOrientation extends BaseController {
    constructor($rootScope, _$timeout_, _$q_, $injector) {
        super($injector);
        $rootScope.orientation = this;
        this.current = "phone-portrait";
        $timeout = _$timeout_;
        $q = _$q_;
    }

    rotate(orientation) {
        let defer = $q.defer();
        this.rotating = true;

        $timeout(() => {
            this.current = "phone-" + orientation;
            $timeout(() => {
                this.rotating = false;
                defer.resolve(true);
            }, 1700);
        }, 400);

       return defer.promise;
    }

    toLandscape() {
        if(this.current != 'phone-landscape') {
            return this.rotate('landscape');
        }
        return $q.when();
    }

    toPortrait() {
        if(this.current != 'phone-portrait') {
            return this.rotate('portrait');
        }
        return $q.when();
    }
}

angular.module('phone-orientation', [])
    .service('phoneOrientation', phoneOrientation);