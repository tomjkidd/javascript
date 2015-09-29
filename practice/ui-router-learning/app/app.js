(function(angular){
    var app = angular.module('tkApp', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/reporting/details');

            $stateProvider
                .state('reporting', {
                    url: '/reporting',
                    templateUrl: 'templates/reporting.html'
                })
                .state('reporting.details', {
                    url: '/details',
                    templateUrl: 'templates/reporting.details.html'
                })
                .state('configuration', {
                    url: '/configuration',
                    templateUrl: 'templates/configuration.html',
                    controller: function ($scope) {
                        $scope.items = ['A', 'List', 'Of', 'Items'];
                    }
                })
                .state('configuration.details', {
                    url: '/details',
                    templateUrl: 'templates/configuration.details.html'
                })
                .state('administration', {
                    url: '/administration',
                    templateUrl: 'templates/administration.html'
                })
                .state('administration.report', {
                    url: '/report',
                    views: {
                        'graphs': {
                            templateUrl: 'templates/administration.graphs.html'
                        },
                        'grid': {
                            templateUrl: 'templates/administration.grid.html'
                        },
                        'hud': {
                            templateUrl: 'templates/administration.hud.html'
                        }
                    }
                })
        }
    ])
})(angular);
