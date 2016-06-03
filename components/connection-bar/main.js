import { angular } from './../../js/base';
import _ from 'lodash';

let infoByType = {
    tumblr_post: {
        name: 'Tumblr',
        route: 'app.tumblr',
        image: 'images/apps/tumblr.jpg',
        getPreview: post => {
            if(_.get(post, 'node.field_tumblr_is_ask_post.und[0].value') === '1') {
                return '<b>anonymous</b> asked you a question';
            } else {
                return _.get(post, 'node.body.und[0].value');
            }
        },
        getDate: post => _.get(post, 'node.field_tumblr_post_date.und[0].value'),
        getAggregateLabel: post => _.get(post, 'node.field_tumblr_aggregate_label.und[0].value')
    },
    facebook_post: {
        name: 'Facebook',
        route: 'app.facebook',
        image: 'images/apps/facebook.png',
        getAuthor: post => _.get(post, 'node.field_name.und[0].safe_value'),
        getPreview: post => _.get(post, 'node.body.und[0].safe_value'),
        getDate: post => _.get(post, 'node.field_facebook_post_date.und[0].value')
    },
    twitter_post: {
        name: 'Twitter',
        route: 'app.twitter',
        image: 'images/apps/twitter.png',
        getAuthor: post => _.get(post, 'node.field_twitter_handle.und[0].safe_value'),
        getPreview: post => _.get(post, 'node.body.und[0].safe_value'),
        getAggregateLabel: post => _.get(post, 'node.field_twitter_aggregate_label.und[0].value'),
        getDate: post => _.get(post, 'node.field_twitter_date.und[0].value')
        
    },
    whisper_post: {
        name: 'Whisper',
        route: 'app.whisper',
        image: 'images/apps/whisper.png' ,
        getAuthor: post => _.get(post, 'node.name'),
        getAggregateLabel: post => _.get(post, 'node.field_whisper_aggregate_label.und[0].value'),
        getDate: post => _.get(post, 'node.field_whisper_post_date.und[0].value') 
    },
    newhive_post: {
        name: 'Newhive',
        route: 'app.newhive',
        image: 'images/apps/newhive.jpg',
        getAuthor: post => _.get(post, 'node.field_newhive_author.und[0].safe_value'),
        getPreview: post => _.get(post, 'node.title'),
        getDate: post => _.get(post, 'node.field_newhive_post_date.und[0].value') 
    },
    instagram_post: {
        name: 'Instagram',
        route: 'app.instagram',
        image: 'images/apps/instagram.png',
        getAuthor: post => _.get(post, 'node.field_instagram_author.und[0].safe_value'),
        getPreview: post => _.get(post, 'node.body.und[0].safe_value'),
        getDate: post => _.get(post, 'node.field_instagram_post_date.und[0].value')
    },
    camera_post: {
        name: 'Camera',
        route: 'app.camera',
        image: 'images/apps/camera.jpg',
        getPreview: post => `<b>${_.get(post, 'node.title')}</b> has been uploaded to your iCloud account.`,
        getDate: post => _.get(post, 'node.field_camera_post_date.und[0].value')
    },
    youtube_post: {
        name: 'Youtube',
        route: 'app.youtube',
        image: 'images/apps/youtube.png',
        getPreview: post => `<b>necrofille</b> posted a new video.<br />${_.get(post, 'node.title')}`,
        getDate: post => _.get(post, 'node.field_youtube_post_date.und[0].value')
    },
    snapchat_post: {
        name: 'Snapchat',
        route: 'app.snapchat',
        image: 'images/apps/snapchat.png',
        getPreview: post => `<b>${_.get(post, 'node.field_author.und[0].value')}</b> sent a snap to their story.`,
        getDate: post => _.get(post, 'node.field_snapchat_post_date.und[0].value') 
    },
    netflix_post: {
        name: 'Netflix',
        route: 'app.netflix',
        image: 'images/apps/netflix.png',
        getPreview: post => `<b>${_.get(post, 'node.title')}</b> is now available.`,
        getDate: post => _.get(post, 'node.field_netflix_post_daate.und[0].value')
    },
    manga_post: {
        name: 'Manga Rock',
        route: 'app.manga',
        image: 'images/apps/mangarock.png',
        getAuthor: post => _.get(post, 'node.title'),
        getPreview: () => 'A new chapter has been released',
        getDate: post => _.get(post, 'node.field_manga_post_date.und[0].value') 
    },
    bible_post: {
        name: 'Holy Bible',
        route: 'app.bible',
        image: 'images/apps/bible.png',
        getPreview: post => _.get(post, 'node.body.und[0].safe_value'),
        getDate: post => _.get(post, 'node.field_bible_date.und[0].value')
    },
    messages_post: {
        name: 'Messages',
        route: 'app.messages',
        image: 'images/apps/messages.png',
        getAuthor: post => _.get(post, 'node.field_messages_recipient.und[0].safe_value'),
        getPreview: post => {
            let body = _.get(post, 'node.body.und[0].safe_value').split('~');
            let message = body[body.length - 1].replace(/<\/p>/g, '');
            console.log(message);
            return message;
            // let body = _.get(post, 'node.body.und[0].value');
            // body = body.replace(/~~~/g, '++++++');
            // let exploded = body.split('~~');
            // return '';
        },
        getDate: post => _.get(post, 'node.field_messages_post_date.und[0].value')
    },
    gmail_post: {
        name: 'Gmail',
        route: 'app.gmail',
        image: 'images/apps/gmail.gif',
        getAuthor: post => _.get(post, 'node.field_gmail_sender.und[0].value'),
        getPreview: post => _.get(post, 'node.field_gmail_preview.und[0].safe_value'),
        getDate: post => _.get(post, 'node.field_gmail_post_date.und[0].value') 
    },
    notes_post: {
        name: 'Notes',
        route: 'app.notes',
        image: 'images/apps/notes.png',
        getPreview: post => `<b>${_.get(post, 'node.title')}</b> has been uploaded to your iCloud account.`,
        getDate: post => _.get(post, 'node.field_notes_post_date.und[0].value')
    }
};

class ConnectionBarElement {
    constructor(PostResources, $sce, $state, $rootScope) {
        this.$state = $state;
        this.changeConnection();
        this.lockScreenState = $rootScope;
        this.state = {color: 'black'};
        PostResources.getFullData().then(posts => {
            
            let labels = {};
            
            this.posts = _(posts).filter(post => {
                post.info = this.getInfoFromType(post.type);
                if(_.isFunction(post.info.getAuthor)) {
                    post.author = post.info.getAuthor(post);
                }
                
                if(_.isFunction(post.info.getPreview)) {
                    let preview = post.info.getPreview(post);
                    preview = preview.replace(/a href/g, 'span no-href');
                    preview = preview.replace(/<\/a>/g, '<\/span>');
                    post.preview = $sce.trustAsHtml(preview);
                }
                
                
                if(_.isFunction(post.info.getDate)) {
                    let date = post.info.getDate(post);
                    if(date) {
                        post.datetime = date;
                        date = date.split(' ');
                        post.date = date[0];
                        
                        let time = date[1].split(':');
                        post.time = time[0] + ':' + time[1];
                    }
                    
                }
                
                if(_.isFunction(post.info.getAggregateLabel)) {
                    labels[post.type] = labels[post.type] || [];
                    post.aggregateLabel = post.info.getAggregateLabel(post);
                    if(!post.aggregateLabel) return true;
                    
                    post.author = post.aggregateLabel;
                    if(labels[post.type].indexOf(post.aggregateLabel) !== -1) {
                        return false;
                    } else {
                        labels[post.type].push(post.aggregateLabel);
                    }
                }
                return true;
            }).sortBy(post => {
                if(!post.datetime) return 9999999900000; 
                let date = new Date(post.datetime);
                return date.getTime();
            }).value();
            
            
        });
    }

    get textColor() { return this.state.color; }
    set textColor(value) { this.state.color = value; }

    changeConnection() {
        setTimeout(() => {
            this.isLow = !this.isLow; this.changeConnection();
        }, _.random(10000, 45000));
    }
    
    toggleNotifications() {
        this.isNotificationsOpen = !this.isNotificationsOpen;
    }
    
    getInfoFromType(type) {
        return infoByType[type];
    }
    
    goToPost(post) {
        console.log('going to post', post);
        this.lockScreenState.isScreenUnlocked = true;
        this.toggleNotifications();
        this.$state.go(post.info.route, { post: post.nid });
    }
}

class ConnectionBarElementLinker {
    constructor(scope, element, attrs, controller) {}
}

angular.module('connectionBar', [])
    .controller('ConnectionBarElement', ConnectionBarElement)
    .directive('connectionBar', function() {
        return {
            restrict: 'E',
            controller: 'ConnectionBarElement',
            templateUrl: 'components/connection-bar/connection-bar.html',
            link: function() { return new ConnectionBarElementLinker(...arguments); },

            bindToController: true,
            scope: {
            },
            controllerAs: 'connectionBar'
        }
    });
