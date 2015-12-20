import { angular } from './../base';
import 'ui-router';
import './../resources/resources';
import '../../components/phone-orientation/main';

    function Routing() {
        this.getService = function() { return this; };

        this.config = function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: "/",
                    controller: function($rootScope) {
                        $rootScope.hideConnectionBar = false;
                        $rootScope.showApp = false;
                        $rootScope.currentAppName = 'menu';
                    },
                    resolve: {
                        orientation: function(phoneOrientation) {
                            return phoneOrientation && phoneOrientation.toPortrait();
                        }
                    }
                })
                .state('app', {
                    url: "/app",
                    templateUrl: "partials/app.html",
                    controller: function($rootScope) {
                        $rootScope.hideConnectionBar = false;
                        $rootScope.showApp = true;
                    }
                });


        };
    }

    var Router = new Routing();

    angular.module('portfolio.routing', ['ui.router', 'portfolio.resources']).service('Router', Router.getService)
        .config(Router.config);