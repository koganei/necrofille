import '../../js/resources/resources';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function MangaResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=manga_post&parameters[]=node');
    }


    class MangaAppController {
        constructor(posts, $rootScope, phoneOrientation, $timeout) {
            this.posts = posts;
            $rootScope.currentAppName = 'manga';
            this.orientation = phoneOrientation;
            this.timeout = $timeout;
        }

        loadPost(post) {
            this.orientation.toLandscape().then(() => {
                this.loadedPost = post;
                this.showCloseBar = true;
                this.timeout(() => { this.showCloseBar = false; }, 2500);
            });
        }

        unloadPost() {
            this.showCloseBar = false;
            this.orientation.toPortrait().then(() => {
                this.loadedPost = undefined;
            });
        }

    }

    angular.module('app.manga', ['ngResource', 'portfolio.resources', 'phone-orientation'])
        .service('MangaResources', MangaResources)
        .controller('MangaAppController', MangaAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.manga', {
                    url: "/manga",
                    templateUrl: "apps/manga/app.html",
                    resolve: {
                        posts: function (MangaResources, $sce) {

                            const host = 'http://dev.nataschasimard.com/sites/default/files/';

                            return MangaResources.query().$promise.then(function (posts) {
                                posts.forEach((post) => {
                                    post.title = post.node.title;
                                    post.poster = $sce.trustAsResourceUrl(host + post.node.field_manga_poster.und[0].filename);
                                    post.author = post.node.field_manga_author.und[0].value;
                                    post.type = post.node.field_type.und[0].value;
                                    post.source_link = post.node.field_source_link.und[0].value;
                                    post.source = post.node.field_source.und[0].value;
                                    post.genres = post.node.field_genres.und[0].value;
                                    post.pages = post.node.field_pages.und.map(page => $sce.trustAsResourceUrl(host + page.uri.replace('public://', '')));
                                    post.description = post.node.body.und[0].value;
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'MangaAppController as manga'
                });
        });