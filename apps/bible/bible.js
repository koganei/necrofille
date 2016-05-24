import jQuery from 'jquery';
import '../../js/resources/resources';
import _ from 'lodash';

    function BibleResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=bible_post&parameters[]=node');
    }

    function BibleAppController(posts, $rootScope) {
        this.posts = posts;
        $rootScope.currentAppName = 'bible';
    }

    angular.module('app.bible', ['ngResource', 'portfolio.resources'])
        .service('BibleResources', BibleResources)
        .controller('BibleAppController', BibleAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.bible', {
                    url: "/bible",
                    templateUrl: "apps/bible/app.html",
                    resolve: {
                        posts: function (BibleResources, $sce) {
                            return BibleResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value); 
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'BibleAppController as bible'
                });
        });
