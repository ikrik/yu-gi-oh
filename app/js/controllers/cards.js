/*jslint browser: true */
/*global angular */

/*property
 backToCards, card, cardId, cardList, config, controller, data, find,
 getCard, go, length, module, name, resolve, seeCard, state, templateUrl,
 then, url
 */


angular.module('yugiho.cards', [
    'ui.router',
    'yugiho.appServices',
    'ngMdIcons',
    'ngLodash',
    'ngAsync',
    'focus-if'
]).controller('cardsController', ['$scope', '$state', function ($scope, $state) {
    'use strict';

    $scope.seeCard = function (card) {
        $state.go('cardDetails', {cardId: card.data.name});
    };
}]).controller('cardsDetailsController', ['$scope', '$state', 'card', function ($scope, $state, card) {
    'use strict';

    $scope.card = card;
    $scope.backToCards = function () {
        $state.go('cards');
    };
}]).config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider
        .state('cards', {
            url: '/cards',
            controller: 'cardsController',
            templateUrl: '/views/cards/list.html',
            resolve: {}
        })
        .state('cardDetails', {
            url: '/cards/:cardId',
            controller: 'cardsDetailsController',
            templateUrl: '/views/cards/details.html',
            resolve: {
                'card': ['$rootScope', '$stateParams', 'appService', 'lodash',
                        function ($rootScope, $stateParams, appService, lodash) {
                    if ($rootScope.cardList && $rootScope.cardList.length) {
                        var result = lodash.find($rootScope.cardList, {data: {name: $stateParams.cardId}});
                        if (result !== undefined) {
                            return result;
                        }
                    } else {
                        return appService
                            .getCard($stateParams.cardId)
                            .then(function (card) {
                                if (!card) {
                                    return;
                                }
                                return card;
                            });
                    }
                }]
            }
        });
}]);
