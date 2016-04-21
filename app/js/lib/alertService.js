/*jslint browser */
/*global angular */
angular.module('ui.alerts', []).factory('AlertService', ['$timeout', function ($timeout) {
    'use strict';
    var alerts = [];

    return {
        alerts: alerts,
        addAlert: function (type, msg, timeout) {
            if (type === 'success') {
                this.alerts.length = 0;
            }
            alerts.push({
                'type': type,
                'msg': msg,
                close: function () {
                    alerts.splice(alerts.indexOf(this), 1);
                }
            });

            if (timeout) {
                $timeout(function () {
                    alerts.splice(alerts.indexOf(this), 1);
                }, timeout);
            }
        },
        closeAlert: function (alert) {
            alerts.splice(alerts.indexOf(alert), 1);
        },
        clear: function () {
            alerts.length = 0;
        }
    };
}]);
