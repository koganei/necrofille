import '../../js/resources/resources';
import '../../components/slide-show/main';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function WhisperResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=whisper_post&parameters[]=node');
    }

    function WhisperAppController(posts, $rootScope) {
        this.posts = posts;
        $rootScope.currentAppName = 'whisper';

        jQuery.timeago.settings.strings = {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: "",
            suffixFromNow: "",
            seconds: "1m",
            minute: "1m",
            minutes: "%dm",
            hour: "1h",
            hours: "%dh",
            day: "1d",
            days: "%dd",
            month: "1mo",
            months: "%dmo",
            year: "1yr",
            years: "%dyr",
            wordSeparator: " ",
            numbers: []
        };
    }

    angular.module('app.whisper', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('WhisperResources', WhisperResources)
        .controller('WhisperAppController', WhisperAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.whisper', {
                    url: "/whisper",
                    templateUrl: "apps/whisper/app.html",
                    resolve: {
                        posts: function (WhisperResources, $sce) {
                            return WhisperResources.query().$promise.then(function (posts) {
                                //posts.forEach(function (post) {
                                //    console.log('POST POST', post);
                                //    //console.log('WHAT', ta, post.node, post.node.field_whisper_date_posted.und);
                                //    if(!_.isEmpty(post.node.field_whisper_date_posted.und)) {
                                //        var posted = moment(post.node.field_whisper_date_posted.und[0].safe_value, "DD/MM/YYYY");
                                //        post.postedTimeAgo = ta().ago(posted.format());
                                //        debugger;
                                //        console.log('TIME AGO', posted.format(), post.node.field_whisper_date_posted.und[0].safe_value, post.postedTimeAgo);
                                //    }
                                //
                                //});
                                return posts;
                            });
                        }
                    },
                    controller: 'WhisperAppController as whisper'
                });
        });