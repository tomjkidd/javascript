import angular from 'angular'
import { TestService } from 'lib/TestService'
import { TestCtrl } from 'lib/TestCtrl'

angular
    .module('app', [])
    .factory('TestService', TestService)
    .controller('TestCtrl', TestCtrl);
