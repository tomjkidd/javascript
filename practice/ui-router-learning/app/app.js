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
                    /*abstract: true,*/
                    url: '/configuration/{type:int}/{subtype:int}',
                    /*url: '/configuration',*/
                    templateUrl: 'templates/configuration.html',
                    controller: function ($scope, $stateParams) {
                        $scope.items = ['A', 'List', 'Of', 'Items'];
                        $scope.type = $stateParams.type;
                        $scope.subtype = $stateParams.subtype;

                        /*$scope.state = {
                            type: $stateParams.type,
                            subtype: $stateParams.subtype
                        }*/

                        $scope.add1Type = function(){
                            $scope.type = $scope.type + 1;
                        }
                    },
                    resolve: {
                        type: ['$stateParams', function($stateParams) {
                            return $stateParams.type;
                        }],
                        subtype: ['$stateParams', function($stateParams) {
                            return $stateParams.subtype;
                        }],
                    }
                })
                .state('configuration.details', {
                    url: '/details',
                    templateUrl: 'templates/configuration.details.html',
                    controller: function($scope, $stateParams, type, subtype) {
                        /*$scope.type = type || 0;
                        $scope.subtype = subtype || 1;*/
                    }
                })
                .state('configuration.summary', {
                    url: '/design',
                    templateUrl: 'templates/configuration.design.html'
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
