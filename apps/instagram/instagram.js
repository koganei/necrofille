import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function InstagramResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=instagram_post&parameters[]=node');
    }


    class InstagramAppController {
        constructor(posts, $rootScope, $timeout) {
            this.posts = posts;
            $rootScope.currentAppName = 'instagram';
            this.$timeout = $timeout;
        }
    }

    angular.module('app.instagram', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('InstagramResources', InstagramResources)
        .controller('InstagramAppController', InstagramAppController)
        .config(function ($stateProvider) {

            $stateProvider
                .state('app.instagram', {
                    url: "/instagram",
                    templateUrl: "apps/instagram/app.html",
                    resolve: {
                        posts: function (InstagramResources, $sce) {
                            return InstagramResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.body = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'InstagramAppController as instagram'
                });
        });