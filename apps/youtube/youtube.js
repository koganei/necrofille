import '../../js/resources/resources';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';

    class YoutubeAppController {
        constructor(posts, $rootScope, phoneOrientation, $stateParams) {
            this.posts = posts;
            $rootScope.currentAppName = 'youtube';
            this.orientation = phoneOrientation;
            if($stateParams.post) {
                $rootScope.isScreenUnlocked = true;
                let postToLoad = _.find(posts, {nid: $stateParams.post});
                this.loadPost(postToLoad);
            }
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
                    url: "/youtube?post",
                    templateUrl: "apps/youtube/app.html",
                    resolve: {
                        posts: function (YoutubeResources, $sce) {
                            return YoutubeResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    let views = post.node.field_views.und[0].value;
                                    if(views >= 1000000) {
                                        post.views = Math.floor(views/1000000) + 'M';
                                    } else if(views >= 1000) {
                                        post.views = Math.floor(views/1000) + 'K';
                                    } else {
                                        post.views =views;
                                    }
                                    
                                    post.thumbnail = post.node.field_video_thumbnail.und[0].filename;
                                    post.video = $sce.trustAsResourceUrl(post.node.field_youtube_video_link.und[0].safe_value);
                                    
                                    post.timeago = post.node.field_youtube_timeago.und[0].value;
                                    console.log(post);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'YoutubeAppController as youtube'
                });
        });
