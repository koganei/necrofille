import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';

    class GmailAppController {
        constructor(posts, $rootScope) {
            this.posts = posts;
            this.expanded = undefined;
            $rootScope.currentAppName = 'gmail';
        }

        loadPost(post) {
            this.loadedPost = post;
            this.expanded = _.last(post.body);
            console.log(this.expanded);
        }

        unloadPost() {
            this.loadedPost = undefined;
        }
    }

    function GmailResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=gmail_post&parameters[]=node');
    }

    angular.module('app.gmail', ['ngResource', 'portfolio.resources'])
        .service('GmailResources', GmailResources)
        .controller('GmailAppController', GmailAppController)
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.gmail', {
                    url: "/gmail",
                    templateUrl: "apps/gmail/app.html",
                    resolve: {
                        posts: function (GmailResources, $sce) {
                            return GmailResources.query().$promise.then(function (posts) {
                                posts.forEach(function (post) {

                                    const dateText = post.node.field_gmail_email_dates.und[post.node.body.und.length - 1].value;

                                    console.log(post.node.field_gmail_email_dates.und.length, post.node.body.und.length);
                                    post.sender = post.node.field_gmail_sender.und[0].value;
                                    post.subject = post.node.field_gmail_subject.und[0].value;
                                    post.preview = $sce.trustAsHtml(post.node.field_gmail_preview.und[0].value);
                                    post.date = new Date(dateText);

                                    
                                    post.body = post.node.body.und.map((body, i) => {
                                        const isFromSender = !(i%2 && post.node.field_first_email_is_necrofille.und[0].value === "0");
                                        const host = 'http://dev.nataschasimard.com/sites/default/files/';
                                        return {
                                            author: isFromSender ? post.sender : 'necrofille',
                                            date: new Date(post.node.field_gmail_email_dates.und[i].value),
                                            to: isFromSender ? 'me' : post.node.field_gmail_short_sender_name.und[0].value,
                                            text: $sce.trustAsHtml(body.safe_value),
                                            unsafe_text: body.safe_value,
                                            avatar: isFromSender ? host + post.node.field_gmail_sender_avatar.und[0].filename : '/images/avatar.jpg'
                                        };
                                    });
                                });


                                return posts;
                            });
                        }
                    },
                    controller: 'GmailAppController as gmail'
                });
        });
