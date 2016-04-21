    /*jslint
    browser
*/
/*global angular */
/*property
    $on, alerts, assign, auth, authLevel, backdrop, backdropClass, close,
    closeAlert, companyId, companyTitle, config, controller, extend,
    getUserInfo, host, keyboard, loading, location, logout, module, open,
    openMenu, otherwise, preferredLanguage, protocol, refresh, resolve, result,
    run, setCompanyId, subscribe, templateUrl, then, token, urlTemplate,
    useLoader, userName
*/

angular.module('yugiho', [
    'ui.router',
    'ngLodash',
    'ngAsync',
    'ngMaterial',
    'yugiho.appServices',
    'yugiho.cards'
]).config(['$urlRouterProvider', '$mdThemingProvider', function ($urlRouterProvider, $mdThemingProvider) {
    'use strict';

    $urlRouterProvider
        .otherwise("/cards");
    

    var palettePrimary = $mdThemingProvider.extendPalette('blue-grey', {
        '500': '#4c5264'
    });

    var paletteAccent = $mdThemingProvider.extendPalette('grey', {
        '500': '#2b2f3e'
    });   
    

    $mdThemingProvider.definePalette('palettePrimary', palettePrimary);
    $mdThemingProvider.definePalette('paletteAccent', paletteAccent);

    $mdThemingProvider.theme('default')
        .primaryPalette('palettePrimary')
        .accentPalette('paletteAccent');

}]).run([
    '$rootScope','$mdSidenav', '$timeout', 'async', 'appService',
    function ($rootScope, $mdSidenav, $timeout, async, appService) {
        'use strict';

        $rootScope.cardArray = [
            'Burial from a Different Dimension',
            'Charge of the Light Brigade',
            'Infernoid Antra',
            'Infernoid Attondel',
            'Infernoid Decatron',
            'Infernoid Devyaty',
            'Infernoid Harmadik',
            'Infernoid Onuncu',
            'Infernoid Patrulea',
            'Infernoid Pirmais',
            'Infernoid Seitsemas',
            'Lyla, Lightsworn Sorceress',
            'Monster Gate',
            'One for One',
            'Raiden, Hand of the Lightsworn',
            'Reasoning',
            'Trap Hole',
            'Torrential Tribute',
            'Upstart Goblin',
            'Void Seer'
        ];

        var helpArray = $rootScope.cardArray.map(function(card) {
            return function getCard(callback) {
                appService.getCard(card)
                    .then(function (resultCard) {
                        return callback(null, resultCard);
                    })
                    .catch(function (err) {
                        console.log('error getting Card: ', err);
                        callback(null, 'Error getting Card');
                    });
            }
        });

        async.parallelLimit(helpArray, 5, function (err, results) {
            console.log(results);
            $rootScope.cardList = results;
            $rootScope.dataLoaded = true;
        });
        
        $rootScope.$on('$stateChangeStart', function (ignore, toState, toParams) {
            toState.resolve = angular.extend(toState.resolve || {});
            // close the main side nav if not locked
            $timeout(function () {
                $mdSidenav('left').close();
            });
        });

        $rootScope.openMenu = function openMenu() {
            $timeout(function () {
                $mdSidenav('left').open();
            });
        };
        $rootScope.loading = false;
    }
]);
