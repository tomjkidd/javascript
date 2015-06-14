'use strict';

function TestService ($q) {
    var service = {
        getInts: getInts,
        getLetters: getLetters
    };

    function getInts() {
        return $q.when([1,2,3]);
    };
    function getLetters() {
        return $q.when(['A','B','C'])
    }

    return service;
}

TestService.$inject = ['$q']

export { TestService }
