import '../../js/resources/resources';

    function TwitterResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=twitter_post&parameters[]=node');
    }

    function TwitterAppController(posts, $scope, $rootScope) {
        this.posts = posts;
        $rootScope.currentAppName = 'twitter';
    }

    angular.module('app.twitter', ['ngResource', 'portfolio.resources'])
        .service('TwitterResources', TwitterResources)
        .controller('TwitterAppController', TwitterAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.twitter', {
                    url: "/twitter",
                    templateUrl: "apps/twitter/app.html",
                    resolve: {
                        posts: function (TwitterResources, $sce) {
                            return TwitterResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'TwitterAppController as twitter'
                });
        });