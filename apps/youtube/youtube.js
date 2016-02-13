import '../../js/resources/resources';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';

    class YoutubeAppController {
        constructor(posts, $rootScope, phoneOrientation) {
            this.posts = posts;
            $rootScope.currentAppName = 'youtube';
            this.orientation = phoneOrientation;
        }

        loadPost(post) {
            this.orientation.toLandscape().then(() => {
                this.loadedPost = post;
            });
        }

        unloadPost() {
            document.getElementById('youtube-current-video').pause();
            this.orientation.toPortrait().then(() => {
                this.loadedPost = undefined;
            });
        }
    }

    function YoutubeResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=youtube_post&parameters[]=node');
    }

    angular.module('app.youtube', ['ngResource', 'portfolio.resources', 'phone-orientation'])
        .service('YoutubeResources', YoutubeResources)
        .controller('YoutubeAppController', YoutubeAppController)
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.youtube', {
                    url: "/youtube",
                    templateUrl: "apps/youtube/app.html",
                    resolve: {
                        posts: function (YoutubeResources, $sce) {
                            return YoutubeResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.thumbnail = post.node.field_video_thumbnail.und[0].filename;
                                    post.video = $sce.trustAsResourceUrl(post.node.field_youtube_video_link.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'YoutubeAppController as youtube'
                });
        });
