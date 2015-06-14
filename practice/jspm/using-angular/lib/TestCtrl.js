'use strict';

import { TestService } from 'lib/TestService'

function TestCtrl($scope, TestService) {
    $scope.title = 'TK Test Title';

    $scope.getInts = function() {
        TestService.getInts().then(ints => {
            ints.forEach(i => console.log(`Int ${i} received`))
        });
    };

    $scope.getLetters = function() {
        TestService.getLetters().then(letters => {
            letters.forEach(letter => console.log(`Letter ${letter} received`))
        });
    };
}

TestCtrl.$inject = ['$scope', 'TestService'];

export { TestCtrl }
