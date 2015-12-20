import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function CameraResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=camera_post&parameters[]=node');
    }


    class CameraAppController {
        constructor(posts, $rootScope, $timeout) {
            this.posts = posts;
            $rootScope.currentAppName = 'camera';
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
        }

        loadPost(post) {
            this.$rootScope.hideConnectionBar = true;
            this.loadedPost = post;
            document.getElementById('camera-video').play();
        }
    }

    angular.module('app.camera', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('CameraResources', CameraResources)
        .controller('CameraAppController', CameraAppController)
        .config(function ($stateProvider) {

            $stateProvider
                .state('app.camera', {
                    url: "/camera",
                    templateUrl: "apps/camera/app.html",
                    resolve: {
                        posts: function (CameraResources, $sce) {
                            return CameraResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {

                                    post.post = post.node.field_camera_post.und[0].uri.replace('public://', '');
                                    console.log('post', post.post);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'CameraAppController as camera'
                });
        });