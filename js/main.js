import { angular } from './base';
import $ from 'jquery';

import 'angular-animate';
import 'angular-clock';

import './routing/routing';

import '../apps/facebook/facebook';
import '../apps/tumblr/tumblr';
import '../apps/twitter/twitter';
import '../apps/whisper/whisper';
import '../apps/newhive/newhive';
import '../apps/instagram/instagram';
import '../apps/notes/notes';
import '../apps/messages/messages';
import '../apps/camera/camera';
import '../apps/youtube/youtube';
import '../apps/gmail/gmail';
import '../apps/snapchat/snapchat';
import '../apps/netflix/netflix';
import '../apps/manga/manga';
import '../apps/borderland/borderland';

import '../components/notifications/notifications';
import '../components/timeago/main';
import '../components/connection-bar/main';
import '../components/unlock-animation/main';
import '../components/bookflip-animation/main';
import '../components/binder-animation/main';

angular.module('portfolio', [
    'ngAnimate',
    'ds.clock',

    'portfolio.routing',

    'app.facebook',
    'app.tumblr',
    'app.twitter',
    'app.whisper',
    'app.newhive',
    'app.instagram',
    'app.notes',
    'app.messages',
    'app.camera',
    'app.youtube',
    'app.gmail',
    'app.snapchat',
    'app.netflix',
    'app.manga',
    'app.borderland',

    'notifications',
    'timeago',
    'connectionBar',
    'unlockanimation',
    'bookflipanimation',
    'binderanimation'
]);
