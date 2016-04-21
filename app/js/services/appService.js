/*jslint browser */
/*global angular */

angular.module('yugiho.appServices', [
    'restangular',
    'ui.alerts',
    'ngLodash'
]).factory('appService', ['Restangular',
    function (Restangular) {
    'use strict';
    var cardEndPoint;

    Restangular = Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setDefaultHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Accept, X-Requested-With',
            'Content-Type': 'application/jsonp',
            'Accept': 'application/jsonp'
        });
        RestangularConfigurer.setRestangularFields({id: 'name'});
        var url = 'https://jsonp.afeld.me/?url=' + encodeURIComponent('http://yugiohprices.com/api');
        RestangularConfigurer.setBaseUrl(url);
    });

    return {

        getCard: function (card) {
            return Restangular.one('card_data', card).get();
        }
        
    };
}]);
