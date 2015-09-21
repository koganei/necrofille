(function() {
    'use strict';

    function Resources($resource) {
        return $resource('http://dev.nataschasimard.com/poems/node.json?parameters[type]=facebook_post');
    }

    angular.module('portfolio.resources', ['ngResource']).service('Resources', Resources);
}());