import jQuery from 'jquery';
import '../../js/resources/resources';

    function FacebookResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=facebook_post');
    }

    function FacebookAppController(posts, $rootScope) {
        this.posts = posts;
        $rootScope.currentAppName = 'facebook';

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

    }

    angular.module('app.facebook', ['ngResource', 'portfolio.resources'])
        .service('FacebookResources', FacebookResources)
        .controller('FacebookAppController', FacebookAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.facebook', {
                    url: "/facebook",
                    templateUrl: "apps/facebook/app.html",
                    resolve: {
                        posts: function (FacebookResources, $sce) {
                            console.log('Face ', FacebookResources);

                            return FacebookResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {
                                    post.node.body.und[0].safe_value = $sce.trustAsHtml(post.node.body.und[0].safe_value);
                                });
                                return posts;
                            });
                        }
                    },
                    controller: 'FacebookAppController as facebook'
                });
        });