import { angular } from './../../js/base';
import _ from 'lodash';

class ConnectionBarElement {
    constructor() {
        this.changeConnection();
        this.state = {color: 'black'};
    }

    get textColor() { return this.state.color; }
    set textColor(value) { this.state.color = value; }

    changeConnection() {
        setTimeout(() => {
            this.isLow = !this.isLow; this.changeConnection();
        }, _.random(10000, 45000));
    }
}

class ConnectionBarElementLinker {
    constructor(scope, element, attrs, controller) {}
}

angular.module('connectionBar', [])
    .controller('ConnectionBarElement', ConnectionBarElement)
    .directive('connectionBar', function() {
        return {
            restrict: 'E',
            controller: 'ConnectionBarElement',
            templateUrl: 'components/connection-bar/connection-bar.html',
            link: function() { return new ConnectionBarElementLinker(...arguments); },

            bindToController: true,
            scope: {
            },
            controllerAs: 'connectionBar'
        }
    });