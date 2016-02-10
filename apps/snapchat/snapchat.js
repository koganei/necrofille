import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';

    class SnapchatAppController {
        constructor(posts, $rootScope, $interval) {
            this.posts = posts;
            $rootScope.currentAppName = 'snapchat';
            this.$interval = $interval;
        }

        loadPost(post) {
            this.loadedPost = post;
            this.loadedPostIndex = 0;
            this.loadedPostTimer = 0;

            this.totalTimeItShouldTake = 1000;
            this.tickPercentage = 1;

            this.loadedPostIntervalInterrupter = this.$interval(() => {
                this.loadedPostTimer += 2;
                if(this.loadedPostTimer >= 100) {
                    this.nextLoadedPostIndex();
                }
            }, 250);

        }

        nextLoadedPostIndex() {
            this.loadedPostIndex++;
            this.loadedPostTimer = 0;
            if(this.loadedPostIndex === this.loadedPost.node.field_posts.und.length) {
                this.unloadPost();
            }
        }

        unloadPost() {
            this.loadedPost = undefined;
            this.loadedPostIntervalInterrupter();
        }
    }

    function SnapchatResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=snapchat_post&parameters[]=node');
    }

    angular.module('app.snapchat', ['ngResource', 'portfolio.resources'])
        .service('SnapchatResources', SnapchatResources)
        .controller('SnapchatAppController', SnapchatAppController)
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.snapchat', {
                    url: "/snapchat",
                    templateUrl: "apps/snapchat/app.html",
                    resolve: {
                        posts: function (SnapchatResources, $sce) {
                            return SnapchatResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {

                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'SnapchatAppController as snapchat'
                });
        });
