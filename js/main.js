import { angular } from './base';

import 'angular-animate';
import 'angular-clock';

import './routing/routing';

import '../apps/facebook/facebook';
import '../apps/tumblr/tumblr';
import '../apps/twitter/twitter';
import '../apps/whisper/whisper';
import '../apps/newhive/newhive';
import '../apps/messages/messages';

import '../components/notifications/notifications';
import '../components/timeago/main';
import '../components/connection-bar/main';

angular.module('portfolio', [
    'ngAnimate',
    'ds.clock',

    'portfolio.routing',

    'app.facebook',
    'app.tumblr',
    'app.twitter',
    'app.whisper',
    'app.newhive',
    'app.messages',

    'notifications',
    'timeago',
    'connectionBar'
]);