import '../../js/resources/resources';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';


    function MessagesResources(Resources) {
        return Resources.getResources('http://dev.nataschasimard.com/poems/node.json?parameters[type]=messages_post&parameters[]=node');
    }


    class MessagesAppController {
        constructor(posts, $rootScope, $timeout) {
            this.posts = posts;
            $rootScope.currentAppName = 'messages';
            this.$timeout = $timeout;
        }

        loadPost(post) {
            this.loadedPost = this.asMessage(post);
            this.$timeout(() => {
                let body = jQuery('.messages-message-body');
                body.scrollTop(body[0].scrollHeight);
            }, 0);

        }

        asMessage(post) {
            post.messages = _(post.node.body.und[0].value)
                .split('\r\n')
                .map(this.getMessageFromLine)
                .map(this.attachLines)
                .compact()
                .value();

            return post;
        }

        attachLines(line) {
            let previous;
            if(line && line.type === 'attach' && previous) {
                previous.message = previous.message + '<br />' + line.message;
                return false;
            } else {
                previous = line;
                return line;
            }
        }

        getMessageFromLine(line) {
            if(_.trim(line) === '') { return false; }
            if(line.indexOf('~~~') === 0) {
                return {
                    type: 'date',
                    message: line.slice(3)
                }
            } else if(line.indexOf('~~') === 0) {
                return {
                    type: 'recipient',
                    message: line.slice(2)
                }
            } else if(line.indexOf('~') === 0) {
                return {
                    type: 'author',
                    message: line.slice(1)
                }
            } else {
                return {
                    type: 'attach',
                    message: line
                }
            }
        }

    }

    angular.module('app.messages', ['ngResource', 'portfolio.resources', 'slideShow'])
        .service('MessagesResources', MessagesResources)
        .controller('MessagesAppController', MessagesAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.messages', {
                    url: "/messages",
                    templateUrl: "apps/messages/app.html",
                    resolve: {
                        posts: function (MessagesResources, $sce) {
                            return MessagesResources.query().$promise.then(function (posts) {
                                return posts;
                            });
                        }
                    },
                    controller: 'MessagesAppController as messages'
                });
        });