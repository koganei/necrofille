import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function NotesResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=notes_post&parameters[]=node');
    }


    class NotesAppController {
        constructor(posts, $rootScope, $timeout, $stateParams) {
            this.posts = posts;
            $rootScope.currentAppName = 'notes';
            this.$timeout = $timeout;
            
            if($stateParams.post) {
                $rootScope.isScreenUnlocked = true;
                let postToLoad = _.find(posts, {nid: $stateParams.post});
                this.loadPost(postToLoad);
            }
        }

        loadPost(post) {
            this.loadedPost = post;
        }
    }

    angular.module('app.notes', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('NotesResources', NotesResources)
        .controller('NotesAppController', NotesAppController)
        .config(function ($stateProvider) {

            $stateProvider
                .state('app.notes', {
                    url: "/notes?post",
                    templateUrl: "apps/notes/app.html",
                    resolve: {
                        posts: function (NotesResources, $sce) {
                            return NotesResources.query().$promise.then(function (posts) {
                                return posts;
                            });
                        }
                    },
                    controller: 'NotesAppController as notes'
                });
        });
