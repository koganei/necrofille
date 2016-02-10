import $ from 'jquery';

class zoomSize {
    constructor() {
        this.prepareResizeAnimation();
    }
    
    prepareResizeAnimation() {
        let $device = $('#phone-hardware').find('.marvel-device');
        
        this.windowHeight = window.innerHeight;
        this.deviceHeight = $device.innerHeight();
        this.container = $('#container');
            
    }
    
    zoom(zoomSize) {
        let ratio = windowHeight / deviceHeight * zoomSize;
        this.text = `scale(${ratio})`;
    }
    
}

export default new zoomSize();
