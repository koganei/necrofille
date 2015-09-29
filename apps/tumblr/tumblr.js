import '../../js/resources/resources';

    function TumblrResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=tumblr_post');
    }

    function TumblrAppController(posts, $rootScope) {
        console.log(posts);
        this.posts = posts;
        $rootScope.currentAppName = 'tumblr';
    }

    angular.module('app.tumblr', ['ngResource', 'portfolio.resources'])
        .service('TumblrResources', TumblrResources)
        .controller('TumblrAppController', TumblrAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.tumblr', {
                    url: "/tumblr",
                    templateUrl: "apps/tumblr/app.html",
                    resolve: {
                        posts: function (TumblrResources, $sce) {
                            return TumblrResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.title = $sce.trustAsHtml(post.node.title);
                                    post.body = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'TumblrAppController as tumblr'
                });
        });