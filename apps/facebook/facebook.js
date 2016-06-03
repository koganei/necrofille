import jQuery from 'jquery';
import '../../js/resources/resources';
import _ from 'lodash';

    function FacebookResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=facebook_post&parameters[]=node');
    }

    function FacebookAppController(posts, $rootScope, $stateParams, $timeout) {
        let $element = jQuery('#facebook-app > .body');
        this.posts = posts;
        $rootScope.currentAppName = 'facebook';
        
        this.scrollTo = function(post) {
            let $elementToScroll = $element.find('.facebook-post[data-post-nid="'+post.nid+'"]');
            if(!$elementToScroll) return;
            
            console.log('scrolling', $elementToScroll.offset().top, $element.offset().top);
            
            $element.animate({
                scrollTop: $elementToScroll.offset().top - $element.offset().top
            }, 2500, function() {
                console.log('DONE', $element.scrollTop(), $elementToScroll.position().top, $elementToScroll.offset().top);
            });
        };

        // English (Template)
        jQuery.timeago.settings.strings = {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: "ago",
            suffixFromNow: "from now",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years",
            wordSeparator: " ",
            numbers: []
        };

        if($stateParams.post) {
            $timeout(()=>{
                $rootScope.isScreenUnlocked = true;
                let postToLoad = _.find(posts, {nid: $stateParams.post});
                this.scrollTo(postToLoad);    
            }, 1000);
        }
        
    }

    angular.module('app.facebook', ['ngResource', 'portfolio.resources'])
        .service('FacebookResources', FacebookResources)
        .controller('FacebookAppController', FacebookAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.facebook', {
                    url: "/facebook?post",
                    templateUrl: "apps/facebook/app.html",
                    resolve: {
                        posts: function (FacebookResources, $sce) {
                            return FacebookResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                    post.comments = _.map(post.node.field_comment_dates.und, function(comment_date, $index) {
                                        return {
                                            date: comment_date.safe_value,
                                            body: $sce.trustAsHtml(post.node.field_comment_bodies.und[$index].safe_value)
                                        };
                                    }) 
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'FacebookAppController as facebook'
                });
        });
