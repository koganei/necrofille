import { angular, toastr } from './../../js/base';
import _ from 'lodash';
import '../../js/resources/resources';
import BaseController from '../base-controller/index.js';

let controllerName = 'notifications';

class NotificationsAttribute {
    constructor(Resources, PostResources) {
        this.items = {};
        PostResources.query.then((allItems) => {
            _(allItems).groupBy('type')
                .each((value, key) => { this.items[key] = value.length; })
                .value();
        });
    }
}

class NotificationTargetAttribute extends BaseController {
    constructor($scope, $element) {
        super($scope);
        this.el = $element;

    }

    setNotificationValue(value) {
        this.el.attr('data-notification-value', value);
    }

    setWatcher(notificationTarget) {
        this.__$scope.$watch('target.notificationsCtrl.items.' + notificationTarget, (newValue) => {
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
