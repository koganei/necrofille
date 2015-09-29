import { angular } from './base';

import 'angular-animate';
import 'angular-clock';

import routing from './routing/routing';

import '../apps/facebook/facebook';
import '../apps/tumblr/tumblr';
import '../apps/twitter/twitter';
import '../apps/whisper/whisper';

import '../components/notifications/notifications';
import '../components/timeago/main';
import '../components/connection-bar/main';

console.log('from main:', angular);

angular.module('portfolio', [
    'ngAnimate',
    'ds.clock',

    'portfolio.routing',

    'app.facebook',
    'app.tumblr',
    'app.twitter',
    'app.whisper',

    'notifications',
    'timeago',
    'connectionBar'
]);

//angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
//    return function(exception, cause) {
//        exception.message += ' (caused by "' + cause + '")';
//        console.log(exception);
//        throw exception;
//    };
//});