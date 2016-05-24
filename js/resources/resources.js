import 'angular-resource';

function Resources($resource) {
    return {
        getResources: function (url) {
            return $resource(url);
        }
    };
}

class PostResources {
    constructor(Resources) {
        this.resources = Resources;
        this.query = Resources.getResources('http://dev.nataschasimard.com/poems/node.json?pagesize=500').query().$promise;
    }
    
    getFullData() {
        if(!this.fullData) this.fullData = this.resources.getResources('http://dev.nataschasimard.com/poems/node.json?pagesize=500&parameters[]=node').query().$promise;
        return this.fullData;
    }
}

angular.module('portfolio.resources', ['ngResource'])
.service('PostResources', PostResources)
.service('Resources', Resources);
