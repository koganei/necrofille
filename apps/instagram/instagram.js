import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';
import scrollIntoView from '../../components/scroll-into-view/scrollIntoView';


    function InstagramResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=instagram_post&parameters[]=node');
    }


    class InstagramAppController {
        constructor(posts, $rootScope, $timeout, $stateParams) {
            let $element = jQuery('#instagram-app > .body');
    
            this.posts = posts;
            $rootScope.currentAppName = 'instagram';
            this.$timeout = $timeout;
            
            this.scrollTo = function(post) {
                let $elementToScroll = $element.find('.instagram-post[data-post-nid="'+post.nid+'"]')[0];
                if(!$elementToScroll) return;
                
                scrollIntoView($elementToScroll, {
                    time: 500, // half a second
                    skipBody: true,
                    align: { top: 0.1 },
                });
                
            };
    
            if($stateParams.post) {
                $timeout(()=>{
                    $rootScope.isScreenUnlocked = true;
                    let postToLoad = _.find(posts, {nid: $stateParams.post});
                    this.scrollTo(postToLoad);    
                }, 1000);
            }
        }
    }

    angular.module('app.instagram', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('InstagramResources', InstagramResources)
        .controller('InstagramAppController', InstagramAppController)
        .config(function ($stateProvider) {

            $stateProvider
                .state('app.instagram', {
                    url: "/instagram?post",
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
