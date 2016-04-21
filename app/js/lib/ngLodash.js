/*jslint browser: true */
/*global angular, _ */
angular.module('ngLodash', []).constant('lodash', null).config(['$provide', function ($provide) {
    'use strict';
    return $provide.constant('lodash', _);
}]);
