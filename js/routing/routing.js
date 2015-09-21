(function() {
    'use strict';

    function Routing() {
        this.getService = function() { return this; };

        this.config = function ($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /state1
            // $urlRouterProvider.otherwise("/state1");
            //
            // Now set up the states
            $stateProvider
                .state('home', {
                    url: "/",
                    controller: function($rootScope) {
                        $rootScope.showApp = false;
                    }
                })
                .state('app', {
                    url: "/app",
                    templateUrl: "partials/app.html",
                    controller: function($rootScope) {
                        $rootScope.showApp = true;
                    }
                })
                .state('app.facebook', {
                    url: "/facebook",
                    templateUrl: "partials/facebook.html",
                    resolve: {
                        FacebookResources: function(Resources, $sce) {
                            var facebookPosts = Resources.query().$promise.then(function(posts) {
                                posts.forEach(function(post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                            return facebookPosts;
                        }
                    },
                    controller: 'FacebookAppController as facebook'
                })
                .state('app.tumblr', {
                    url: "/tumblr",
                    templateUrl: "partials/tumblr.html"
                    //resolve: {
                    //    FacebookResources: function(Resources, $sce) {
                    //        var facebookPosts = Resources.query().$promise.then(function(posts) {
                    //            posts.forEach(function(post) {
                    //                post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                    //            });
                    //            return posts;
                    //        });
                    //        return facebookPosts;
                    //    }
                    //},
                    // controller: 'TumblrAppController as tumblr'
                });


        };
    }

    var Router = new Routing();
    var FacebookAppController = function(FacebookResources, $scope) {
        console.log('controller', FacebookResources, $scope);
        this.posts = FacebookResources;
    };

    angular.module('portfolio.routing', ['ui.router', 'portfolio.resources']).service('Router', Router.getService)
        .config(Router.config)
        .controller('FacebookAppController', FacebookAppController);
}());