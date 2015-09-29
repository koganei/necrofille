import { angular, toastr } from './../../js/base';

let controllerName = 'notifications';

class BaseController {
    constructor(ctrlName, $scope) {
        this.$watch = function(name, fn) {
            return $scope.$watch(ctrlName + '.' + name, fn);
        }
    }
}

class NotificationsAttribute {
    constructor() {
        console.log('in linker');
    }
}

class NotificationTargetAttribute extends BaseController {
    constructor($scope) {
        super($scope);
    }

    start() {
        //var watchDestroyer = this.$watch(function())
        //if(!this.notificationsCtrl) {
        //    throw new Error('No notifications controller found. When I looked, I only found: ' + this.notificationsCtrl);
        //}

    }
}

class NotificationTargetAttributeLinker {
    constructor(scope, element, attrs, notificationsCtrl) {
        console.log('a', scope, element, attrs, notificationsCtrl);
        scope.target.notificationsCtrl = notificationsCtrl;
    }
}

angular.module('notifications', [])
    .controller('NotificationsAttribute', NotificationsAttribute)
    .directive('notifications', function() {
        return {
            restrict: 'A',
            controller: 'NotificationsAttribute',
            // link: NotificationsAttributeLinker,
            bindToController: {
                notifications: '='
            },
            controllerAs: 'notifications'
        }
    })
    .controller('NotificationTargetAttribute', NotificationTargetAttribute)
    .directive('notificationTarget', function() {
        return {
            restrict: 'A',
            controller: 'NotificationTargetAttribute',
            link: function() { return new NotificationTargetAttributeLinker(...arguments); },
            bindToController: {
                notificationTarget: '='
            },
            controllerAs: 'target',
            require: '^notifications'
        }
    });