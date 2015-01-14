'use strict';

var app = angular.module('learningApp', []);

// This directive is used as an element, <tk-template>
app.directive('tkTemplate', function($compile) {
    return {
        restrict: 'E',
        scope: {
            // Use the viewmodel attribute to pass an object to use as the viewmodel
            viewmodel: '=viewmodel'
        },
        link: function(scope, element, attrs){
            scope.getTemplateUrl = function(){
                // use the template attribute to pass the templateUrl to use
                return attrs.template;
            };
        },
        replace: true,
        template: '<div ng-include="getTemplateUrl()"></div>'
    };
});

app.controller('DashboardCtrl', ['$scope', function ($scope) {
    var paletteWidgets = [
        { name: 'w1', icon: 'i1', url: 'widget1' },
        { name: 'w2', icon: 'i2', url: 'widget2' },
        { name: 'w3', icon: 'i3', url: 'widget3' }
    ];
    var dashboardWidgets = []

    function DashboardWidget(p) {
        var d = angular.copy(p);
        d.info = d.name + ' ' + d.url;
        return d;
    };

    function mapWidgetFromPaletteToDashboard(p) {
        var d = new DashboardWidget(p);
        return d;
    };

    function moveWidgetFromPaletteToDashboard(p) {
        dashboardWidgets.push(mapWidgetFromPaletteToDashboard(p));
    };

    $scope.paletteWidgets = paletteWidgets;
    $scope.dashboardWidgets = dashboardWidgets;
    $scope.moveWidgetFromPaletteToDashboard = moveWidgetFromPaletteToDashboard;

}]);
