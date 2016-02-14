import '../../js/resources/resources';
import '../../components/phone-orientation/main';
import _ from 'lodash';
import moment from 'moment';
import jQuery from 'jquery';

import UnityObject2 from './game/UnityObject2';




    class BorderlandAppController {
        constructor($rootScope, phoneOrientation, $timeout) {
            $rootScope.currentAppName = 'borderland';
            this.hasGameStarted = true;
            this.timeout = $timeout;


            const config = {
                width: 586, 
                height: 310,
                params: { enableDebugging:"0" }
            };

            this.timeout(() => {
                this.player = new UnityObject2(config);

                this.player.observeProgress((progress) => {
                    console.log('progress', progress);
                    if(progress.pluginStatus === 'broken' || progress.pluginStatus === 'missing' || progress.pluginStatus === 'unsupported') {
                        this.hasGameStarted = false;
                    }
                });

                this.player.initPlugin(jQuery("#unityPlayer")[0], "/apps/borderland/game/WebBuild.unity3d");     
            }, 250);
        }
    }

    function BorderlandAppController($rootScope, phoneOrientation) {
        

    }

    angular.module('app.borderland', ['phone-orientation'])
        .controller('BorderlandAppController', BorderlandAppController)
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app.borderland', {
                    url: "/borderland",
                    templateUrl: "apps/borderland/app.html",
                    resolve: {
                        orientation: function(phoneOrientation) {
                            return phoneOrientation.toLandscape();
                        }
                    },
                    controller: 'BorderlandAppController as borderland'
                });
        });