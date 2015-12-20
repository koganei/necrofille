import $ from 'jquery';
import { angular } from './../../js/base';
import _ from 'lodash';


class unlockAnimation {
    constructor($element, $rootScope) {
        this.$rootScope = $rootScope;
        this.listeners = {
            click: this.onClick.bind(this),
            DOMNodeRemoved: this.onDestroy.bind(this)
        };
        $($element).on(this.listeners);
        this.prepareResizeAnimation();

    }

    onClick(event) {
        if(!this.$rootScope.isScreenUnlocked) {
            this.executeResizeAnimation();
        }
    }

    prepareResizeAnimation() {
        let $device = $('#phone-hardware').find('.marvel-device'),
            windowHeight = window.innerHeight,
            deviceHeight = $device.innerHeight(),
            ratio = windowHeight / deviceHeight * 1.25;

        this.text = `scale(${ratio})`;

        console.log(`wd: ${windowHeight}, ${deviceHeight}, ${this.text}, ${ratio}`);
    }

    executeResizeAnimation() {
        $('#container').css({transform: this.text});

        this.screenUnlockSource = 'images/lockscreen-password.gif';
        this.$rootScope.isScreenUnlocked = true;
    }

    onDestroy() {
        console.log('destroyed');
        //this.listeners.forEach($($element).off);
    }

}

angular.module('unlockanimation', [])
    .directive('unlockAnimation', function() {
        return {
            restrict: 'A',
            controller: unlockAnimation,
            bindToController: true,
            controllerAs: 'unlockAnimation'
        }
    });
