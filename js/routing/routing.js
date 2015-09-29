import { angular } from './../base';
import 'ui-router';
import './../resources/resources';

    function Routing() {
        this.getService = function() { return this; };



        this.config = function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: "/",
                    controller: function($rootScope) {
                        $rootScope.showApp = false;
                        $rootScope.isScreenUnlocked = true;
                        $rootScope.currentAppName = 'menu';}
                })
                .state('app', {
                    url: "/app",
                    templateUrl: "partials/app.html",
                    controller: function($rootScope) {
                        $rootScope.showApp = true;
                        $rootScope.isScreenUnlocked = true;
                    }
                });


        };
    }

    var Router = new Routing();


    angular.module('portfolio.routing', ['ui.router', 'portfolio.resources']).service('Router', Router.getService)
        .config(Router.config);