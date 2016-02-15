import $ from 'jquery';
import { angular } from './../../js/base';
import _ from 'lodash';


class bookflipAnimation {
    constructor($element, $rootScope, $timeout, $interval) {
        this.$rootScope = $rootScope;
        this.timeout = $timeout;
        this.interval = $interval;
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
            this.currentPage = 1;
            this.executeResizeAnimation();

            this.element.addClass('opened');
            this.element.addClass('opening');
            this.element.removeClass('closed');

            this.timeout(() => {
                this.element.removeClass('opening');
            }, 1000);

        
            this.timeout(() => {

                var doc = document.getElementById("scarlet-page-1").getSVGDocument();
                var s = doc.getElementById("status");


                const pageStatusCheck = setInterval(() => {
                    if(s.getAttribute('animation-done') === 'true') {
                        clearInterval(pageStatusCheck);
                        console.log(this);
                        this.currentPage = 2;
                    }
                }, 1500);    
            }, 5000);
            
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
            this.element.addClass('closed');

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
