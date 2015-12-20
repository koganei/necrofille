import $ from 'jquery';
import { angular } from './../../js/base';
import _ from 'lodash';


class bookflipAnimation {
    constructor($element, $rootScope) {
        this.$rootScope = $rootScope;
        this.listeners = {
            click: this.onClick.bind(this),
            DOMNodeRemoved: this.onDestroy.bind(this),
            mouseenter: this.onMouseEnter.bind(this)
        };
        this.element = $($element);
        this.container = $('#container');
        this.element.on(this.listeners);
        this.open = false;
        this.originalText = this.container.css('transform');
        this.text = '';
        this.prepareResizeAnimation();

    }

    onClick(event) {
        if(!this.$rootScope.isScreenUnlocked && !this.open) {
            this.open = true;
            this.executeResizeAnimation();

            this.element.addClass('opened');
        }
    }

    onMouseEnter(event) {
        if(!this.$rootScope.isScreenUnlocked && !this.open) {
            this.element.addClass('canBeOpened');
        } else {
            this.element.removeClass('canBeOpened');
        }
    }

    close() {
        this.element.addClass('closing');
        this.element.removeClass('opened');
        this.container.css({transform: this.originalText});

        setTimeout(() => {
            this.open = false;
            this.element.removeClass('closing');
        }, 1100);
    }

    prepareResizeAnimation() {
        //let windowHeight = window.innerHeight,
        //    deviceHeight = this.element.height(),
        //    ratio = windowHeight / deviceHeight * 0.75;

        let ratio = 1;

        this.text = `scale(${ratio})`;
    }

    executeResizeAnimation() {
        this.container.css({transform: this.text});
    }

    onDestroy() {
        console.log('destroyed');
    }

}

angular.module('bookflipanimation', [])
    .directive('bookflipAnimation', function() {
        return {
            restrict: 'A',
            controller: bookflipAnimation,
            bindToController: true,
            controllerAs: 'bookflipAnimation'
        }
    });
