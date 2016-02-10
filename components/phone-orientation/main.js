import { angular } from './../../js/base';
import $ from 'jquery';
import BaseController from '../base-controller/index.js';

let $timeout, $q;

class phoneOrientation extends BaseController {
    constructor($rootScope, _$timeout_, _$q_, $injector) {
        super($injector);
        $rootScope.orientation = this;
        this.current = "phone-portrait";
        $timeout = _$timeout_;
        $q = _$q_;
        this.prepareResizeAnimation();
    }

    rotate(orientation, zoomSize) {
        let defer = $q.defer();
        this.rotating = true;

        $timeout(() => {
            this.current = "phone-" + orientation;
            $timeout(() => {
                this.rotating = false;
                this.executeResizeAnimation(zoomSize);
                defer.resolve(true);
            }, 1700);
        }, 400);

       return defer.promise;
    }

    toLandscape() {
        if(this.current != 'phone-landscape') {
            return this.rotate('landscape', 1.75);
        }
        return $q.when();
    }

    toPortrait() {
        if(this.current != 'phone-portrait') {
            return this.rotate('portrait', 1.25);
        }
        return $q.when();
    }
    
    prepareResizeAnimation() {
        let $device = $('#phone-hardware').find('.marvel-device');
        this.windowHeight = window.innerHeight;
        this.deviceHeight = $device.innerHeight();
    }
    
    executeResizeAnimation(zoomSize) {
        let ratio = this.windowHeight / this.deviceHeight * zoomSize,
            text = `scale(${ratio})`;
        $('#container').css({transform: text});
    }
}

angular.module('phone-orientation', [])
    .service('phoneOrientation', phoneOrientation);
