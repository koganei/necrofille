import jQuery from 'jquery';
import '../../js/resources/resources';
import _ from 'lodash';
import scrollIntoView from '../../components/scroll-into-view/scrollIntoView';

    function TumblrResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=tumblr_post&parameters[]=node');
    }

    function TumblrAppController(posts, $rootScope, $stateParams, $timeout) {
        let $element = jQuery('#tumblr-app');
        this.posts = posts;
        $rootScope.currentAppName = 'tumblr';
        this.convertTag = function(value) { return value.replace('#', '').replace(/ /g, '+'); }
        
        this.scrollTo = function(post) {
            let $elementToScroll = $element.find('.post[data-post-nid="'+post.nid+'"]')[0];
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

    angular.module('app.tumblr', ['ngResource', 'portfolio.resources'])
        .service('TumblrResources', TumblrResources)
        .controller('TumblrAppController', TumblrAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.tumblr', {
                    url: "/tumblr?post",
                    templateUrl: "apps/tumblr/app.html",
                    resolve: {
                        posts: function (TumblrResources, $sce) {
                            return TumblrResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.title = $sce.trustAsHtml(post.node.title);
                                    post.body = post.node.body.und ? $sce.trustAsHtml(post.node.body.und[0].safe_value) : $sce.trustAsHtml('');
                                    post.header = post.node.field_tumblr_header.und ? $sce.trustAsHtml(post.node.field_tumblr_header.und[0].safe_value) : undefined;  
                                    post.isAsk = post.node.field_tumblr_is_ask_post.und ? post.node.field_tumblr_is_ask_post.und[0].value === '1' : false;
                                    post.question = post.isAsk ? $sce.trustAsHtml(post.node.field_tumblr_ask_question.und[0].safe_value) : undefined;
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'TumblrAppController as tumblr'
                });
        });
