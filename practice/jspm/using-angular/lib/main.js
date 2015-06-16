import angular from 'angular'
import { TestService } from 'lib/TestService'
import { TestCtrl } from 'lib/TestCtrl'

import 'styles/style.css!'
import colors from 'api/color-data.json!json'

console.log(colors);

angular
    .module('app', [])
    .factory('TestService', TestService)
    .controller('TestCtrl', TestCtrl);
