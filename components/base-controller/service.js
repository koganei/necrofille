import { angular, toastr } from './../../js/base';
import _ from 'lodash';
import '../../js/resources/resources';

let controllerName = 'notifications';

class NotificationTargetAttribute extends BaseController {
    constructor($injector, $element) {
        super($injector);
        this.el = $element;

    }

    setNotificationValue(value) {
        this.el.attr('data-notification-value', value);
    }

    setWatcher(notificationTarget) {
        this.$watch('notificationsCtrl.items.' + notificationTarget, (newValue) => {
            this.setNotificationValue(newValue);
        });
    }
}

class NotificationTargetAttributeLinker {
    constructor(scope, element, attrs, notificationsCtrl) {
        scope.target.notificationsCtrl = notificationsCtrl;
        scope.target.setWatcher(scope.target.notificationTarget);
    }
}

angular.module('notifications', ['portfolio.resources'])
    .controller('NotificationsAttribute', NotificationsAttribute)
    .directive('notifications', function() {
        return {
            restrict: 'A',
            controller: 'NotificationsAttribute',
            // link: NotificationsAttributeLinker,
            scope: {},
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
            scope: {},
            link: function() { return new NotificationTargetAttributeLinker(...arguments); },
            bindToController: {
                notificationTarget: '@'
            },
            controllerAs: 'target',
            require: '^notifications'
        }
    });