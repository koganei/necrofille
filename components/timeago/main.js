import { angular } from './../../js/base';
import jQuery from 'jquery';
import 'timeago';
import moment from 'moment';


class TimeAgoElement {
    constructor() {

    }
}

class TimeAgoElementLinker {
    constructor(scope, element, attrs, controller) {



        var el = jQuery(element);

        controller.formattedDate = moment(controller.date, 'DD/MM/YYYY').format('YYYY-MM-DDT00:00:00');

        el.attr('title', controller.formattedDate);
        el.timeago();
    }
}

angular.module('timeago', [])
    .controller('TimeAgoElement', TimeAgoElement)
    .directive('timeAgo', function() {
        return {
            restrict: 'E',
            controller: 'TimeAgoElement',
            link: function() { return new TimeAgoElementLinker(...arguments); },

            bindToController: true,
            scope: {
                date: '='
            },
            controllerAs: 'timeago'
        }
    });