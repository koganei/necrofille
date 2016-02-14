import $ from 'jquery';
import { angular } from './../../js/base';
import _ from 'lodash';


class binderAnimation {
    constructor($element, $rootScope, $timeout) {
        this.$rootScope = $rootScope;
        this.listeners = {
            click: this.onClick.bind(this)
        };
        this.timeout = $timeout;
        this.element = $($element);
        this.container = $('#container');
        this.element.on(this.listeners);
        this.open = false;
        this.originalText = this.container.css('transform');
        this.transformText = '';
        this.prepareResizeAnimation();

    }

    onClick(event) {
        if(!this.$rootScope.isScreenUnlocked && !this.open) {
            this.open = true;
            this.executeResizeAnimation();

            this.element.addClass('opened');
        } else if(this.open) {
        	this.close();
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
            $('body').animate({
	    		scrollTop: 0,
	    		scrollLeft: 0
	    	}, {duration: 1000});
        }, 750);
    }

    prepareResizeAnimation() {
        const windowHeight = window.innerHeight,
           deviceHeight = this.element.height(),
           ratio = windowHeight / deviceHeight * 0.5;

        this.transformText = `scale(${ratio})`;

        
    }

    getScrollPositions() {
    	const page = this.element.find('.binder-pages > object').first();
    	return {
    		left: page.offset().left - 100,
    		top: page.offset().top - 100
    	};
    }

    executeResizeAnimation() {
        this.container.css({transform: this.transformText});
	
		this.timeout(() => {
			const positions = this.getScrollPositions();

	        $('body').animate({
	    		scrollTop: positions.top,
	    		scrollLeft: positions.left
	    	}, {duration: 1000, queue: false, complete: () => {

				var ev = document.createEvent("SVGEvents");
				ev.initEvent("click",true,true);

				var doc = document.getElementById("binder-tolerance").getSVGDocument();
			    var play = doc.getElementById("play-button"); // suppose our image contains a <rect>
			    play.dispatchEvent(ev);

			    const checkAnimationDone = setInterval(() => {
			    	if(play.getAttribute('animation-done') === 'true') {
			    		clearInterval(checkAnimationDone);
			    		if(this.open) this.flipToNextPage();
			    	}
			    }, 3000);

			} });
		}, 1000);
	}

	flipToNextPage() {
		$("#binder-tolerance").addClass('flipped');

		this.timeout(() => {

			var ev = document.createEvent("SVGEvents");
			ev.initEvent("click",true,true);

			var doc = document.getElementById("binder-10steps").getSVGDocument();
		    var play = doc.getElementById("play-button"); // suppose our image contains a <rect>
		    play.dispatchEvent(ev);

		    // const checkAnimationDone = setInterval(() => {
		    // 	if(play.getAttribute('animation-done') === 'true') {
		    // 		clearInterval(checkAnimationDone);
		    // 		$("#binder-10steps").addClass('flipped');
		    // 	}
		    // }, 3000);

		}, 1000);
	}

    onDestroy() {
        console.log('destroyed');
    }

}

angular.module('binderanimation', [])
    .directive('binderAnimation', function() {
        return {
            restrict: 'A',
            controller: binderAnimation,
            bindToController: true,
            controllerAs: 'bookflipAnimation'
        }
    });
