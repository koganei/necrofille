import { angular } from './../../js/base';

class SlideShowElement {
    constructor() {
        console.log('CONTTRUCIUOTN');
        this.slides = [];
        this.cursor = 0;
    }

    register(newSlide) {
        this.slides.push(newSlide);
    }

    start(cursorPos) {
        console.log('RUNNING RUNNING');
        this.isRunning = true;
        if(cursorPos) this.cursor = cursorPos;
    }

    stop() {
        this.isRunning = false;
    }

    next() {
        this.slides[this.cursor].hide();
        this.cursor++;
        this.slides[this.cursor].show();
    }

    previous() {
        this.cursor--;
    }
}

class SlideShowElementLinker {
    constructor(scope, element, attrs, controller) {
        console.log('CONTROLLER LINKER', controller);
    }
}

class SlideShowTargetElement {
    constructor() {

    }

    show() {
        this.element.addClass('slide-show-target');
    }
}

class SlideShowTargetElementLinker {
    constructor(scope, element, attrs, slideShow, controller) {
        this.element = element;
        slideShow.register(this);
    }

}



angular.module('slideShow', [])
    .controller('SlideShowElement', SlideShowElement)
    .directive('slideShow', function() {
        console.log('SLIDESHOW ');
        return {
            restrict: 'A',
            controller: 'SlideShowElement',
            link: function() { return new SlideShowElementLinker(...arguments); },

            bindToController: true,
            scope: {
            },
            controllerAs: 'slideShow'
        }
    })
    .controller('SlideShowTargetElement', SlideShowTargetElement)
    .directive('slideShowTarget', function() {
        return {
            restrict: 'A',
            controller: 'SlideShowTargetElement',
            link: function() { return new SlideShowTargetElementLinker(...arguments); },

            bindToController: true,
            scope: {
            },
            controllerAs: 'target',
            require: '^slideShow'
        }
    });