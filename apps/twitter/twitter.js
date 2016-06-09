import jQuery from 'jquery';
import '../../js/resources/resources';
import _ from 'lodash';
import scrollIntoView from '../../components/scroll-into-view/scrollIntoView';

function TwitterResources(Resources) {
    return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=twitter_post&parameters[]=node');
}

function TwitterAppController(posts, $scope, $rootScope, $stateParams, $timeout) {
    let $element = jQuery('#twitter-app > .body');
    this.posts = posts;
    $rootScope.currentAppName = 'twitter';
    
    this.scrollTo = function(post) {
        let $elementToScroll = $element.find('.twitter-post[data-post-nid="'+post.nid+'"]')[0];
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

angular.module('app.twitter', ['ngResource', 'portfolio.resources'])
    .service('TwitterResources', TwitterResources)
    .controller('TwitterAppController', TwitterAppController)
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.twitter', {
                url: "/twitter?post",
                templateUrl: "apps/twitter/app.html",
                resolve: {
                    posts: function (TwitterResources, $sce) {
                        return TwitterResources.query().$promise.then(function (posts) {
                            posts.forEach(function (post) {
                                post.avatar = post.node.field_twitter_avatar.und[0].uri.replace('public://', '');
                                post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                if(post.node.field_twitter_date.und && post.node.field_twitter_date.und.length) {
                                    var date = post.node.field_twitter_date.und[0].value;
                                    if(date) {
                                        post.date = date.split(' ')[0].replace(/\//g, '-');
                                    
                                        }
                                }
                            });
                            return posts;
                        });
                    }
                },
                controller: 'TwitterAppController as twitter'
            });
    });
