import { angular } from './../../js/base';

class ConnectionBarElement {
    constructor() {

    }
}

class ConnectionBarElementLinker {
    constructor(scope, element, attrs, controller) {

    }
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