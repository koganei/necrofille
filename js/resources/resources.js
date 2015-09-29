import 'angular-resource';

function Resources($resource) {
    return {
        getResources: function (url) {
            return $resource(url);
        }
    };
}

angular.module('portfolio.resources', ['ngResource']).service('Resources', Resources);
