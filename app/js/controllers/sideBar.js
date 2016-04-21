/*jslint browser: true */
/*global angular */
angular.module('yugiho').factory('menu',['$rootScope',
    function($rootScope) {
        'use strict';
        var self;
        var menuArray = $rootScope.cardArray.map(function(card){
            return {
               name: card,
               path: '#' + card,
               title: card,
               sref: 'cardDetails({cardId:"' + card + '"})',
               type: 'link'
            }
        });

        return self = {
            sections: menuArray,
            
            toggleSelectSection: function(section) {
                self.openedSection = (self.openedSection === section ? null : section);
            }
        };

    }])
    .directive('menuLink', function() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'views/menu.html',
            link: function ($scope, $element, $state) {
                var controller = $element.parent().controller();

                $scope.toggle = function () {
                    controller.toggleOpen($scope.section);
                };
            }
        };
    })
    .controller('SideBarController',
        [
            '$scope',
            '$state',
            'menu',
            function ($scope, $state, menu) {
                var vm = this;
                
                vm.toggleOpen = toggleOpen;
                vm.menu = menu;

                $scope.collection = menu.sections;
                
                function toggleOpen(section) {
                    menu.toggleSelectSection(section);
                }
                
                $scope.isActive = function (item) {
                    return $state.includes(item.sref);
                };
                
            }
        ]
    );
