import '../../js/resources/resources';
import '../../components/slide-show/main';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';

    class NewhiveAppController {
        constructor(posts, $rootScope) {
            this.posts = posts;
            $rootScope.currentAppName = 'newhive';
        }

        loadPost(post) {
            this.loadedPost = post;
        }
    }

    function NewhiveResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=newhive_post&parameters[]=node');
    }

    angular.module('app.newhive', ['ngResource', 'portfolio.resources', 'phone-orientation'])
        .service('NewhiveResources', NewhiveResources)
        .controller('NewhiveAppController', NewhiveAppController)
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.newhive', {
                    url: "/newhive",
                    templateUrl: "apps/newhive/app.html",
                    resolve: {
                        posts: function (NewhiveResources, $sce) {
                            return NewhiveResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    if(!_.isEmpty(post.node.field_newhive_posturl.und)) {
                                        post.postUrl = $sce.trustAsResourceUrl(post.node.field_newhive_posturl.und[0].safe_value);
                                    }

                                    if(!_.isEmpty(post.node.field_newhive_thumbnail.und)) {
                                        post.thumbnail = $sce.trustAsResourceUrl(post.node.field_newhive_thumbnail.und[0].safe_value);
                                    }
                                });

                                return posts;
                            });
                        },
                        orientation: function(phoneOrientation) {
                            return phoneOrientation.toLandscape();
                        }
                    },
                    controller: 'NewhiveAppController as newhive'
                });
        });
