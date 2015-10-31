import '../../js/resources/resources';

    function SnapchatResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=snapchat_post&parameters[]=node');
    }

    function SnapchatAppController(posts, $rootScope) {
        this.posts = posts;
        $rootScope.currentAppName = 'snapchat';
    }

    angular.module('app.snapchat', ['ngResource', 'portfolio.resources'])
        .service('SnapchatResources', SnapchatResources)
        .controller('SnapchatAppController', SnapchatAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.snapchat', {
                    url: "/snapchat",
                    templateUrl: "apps/snapchat/app.html",
                    resolve: {
                        posts: function (SnapchatResources, $sce) {
                            return SnapchatResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'SnapchatAppController as snapchat'
                });
        });