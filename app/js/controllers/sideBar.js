/*jslint browser: true */
/*global angular */
/*property
 cardArray, collection, controller, directive, factory, includes, isActive,
 link, map, menu, module, name, openedSection, parent, path, scope, section,
 sections, sref, templateUrl, title, toggle, toggleOpen,
 toggleSelectSection, type
 */

angular.module('yugiho').factory('menu', ['$rootScope', function ($rootScope) {
    'use strict';
    var self;
    var menuArray = $rootScope.cardArray.map(function (card) {
        return {
            name: card,
            path: '#' + card,
            title: card,
            sref: 'cardDetails({cardId:"' + card + '"})',
            type: 'link'
        };
    });

    self = {
        sections: menuArray,
        toggleSelectSection: function (section) {
            self.openedSection = (
                self.openedSection === section
                    ? null
                    : section
            );
        }
    };

    return self;
}])
    .directive('menuLink', function () {
        'use strict';
        return {
            scope: {
                section: '='
            },
            templateUrl: 'views/menu.html',
            link: function ($scope, $element) {
                var controller = $element.parent().controller();

                $scope.toggle = function () {
                    controller.toggleOpen($scope.section);
                };
            }
        };
    })
    .controller('SideBarController', ['$scope', '$state', 'menu', function ($scope, $state, menu) {
        'use strict';
        var vm = this;

        function toggleOpen(section) {
            menu.toggleSelectSection(section);
        }

        vm.toggleOpen = toggleOpen;
        vm.menu = menu;

        $scope.collection = menu.sections;

        $scope.isActive = function (item) {
            return $state.includes(item.sref);
        };
    }]);
