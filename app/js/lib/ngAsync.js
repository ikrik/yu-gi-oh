/*jslint browser: true */
/*global angular, async */
angular.module('ngAsync', []).constant('async', null).config(['$provide', function ($provide) {
    'use strict';
    return $provide.constant('async', async);
}]);
