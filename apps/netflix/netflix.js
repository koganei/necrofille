import '../../js/resources/resources';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';

    class NetflixAppController {
        constructor(posts, $rootScope, phoneOrientation) {
            this.posts = posts;
            $rootScope.currentAppName = 'netflix';
            this.orientation = phoneOrientation;
        }

        loadPost(post) {
            this.orientation.toLandscape().then(() => {
                this.loadedPost = post;
            });
        }

        unloadPost() {
            document.getElementById('netflix-current-video').pause();
            this.orientation.toPortrait().then(() => {
                this.loadedPost = undefined;
            });
        }
    }

    function NetflixResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=netflix_post&parameters[]=node');
    }

    angular.module('app.netflix', ['ngResource', 'portfolio.resources', 'phone-orientation'])
        .service('NetflixResources', NetflixResources)
        .controller('NetflixAppController', NetflixAppController)
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.netflix', {
                    url: "/netflix",
                    templateUrl: "apps/netflix/app.html",
                    resolve: {
                        posts: function (NetflixResources, $sce) {
                            return NetflixResources.query().$promise.then(function (posts) {
                                const host = 'http://dev.nataschasimard.com/sites/default/files/';

                                posts.forEach(function (post) {
                                    post.poster = host + post.node.field_poster.und[0].filename;
                                    post.title = post.node.title;
                                    post.rating = host + post.node.field_rating.und[0].filename;
                                    post.video_link = $sce.trustAsResourceUrl(post.node.field_video_link.und[0].safe_value);
                                    post.description = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                    console.log(post.node.body);
                                });


                                return posts;
                            });
                        }
                    },
                    controller: 'NetflixAppController as netflix'
                });
        });
