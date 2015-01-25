Definitions
===========
#Angular
A client-side JavaScript Framework for adding interactivity to HTML.
#Directive
A marker on a HTML tag that tells Angular to run or reference some JavaScript code.
#Module
Where we write pieces of our Angular application
Where we define dependencies of our app
#Expressions
{{ 1 + 2 }}
#Controllers
Are where we define our app's behavior by defining functions and values
#Filter
{{ data* | filter:options* }}

Directives
==========
ng-app
ng-controller
ng-show
ng-hide
ng-repeat
ng-src
ng-click
ng-init (should only be used for prototyping)
ng-class
ng-model
ng-submit
ng-options
ng-include="'product-title.html'"

Validation
==========
novalidate attr for forms
required attribute
name attribute for form
formName.$valid
type="email" for input
type="url" for urls
type="number" for numbers, min and max attrs

ng-pristine
ng-invalid
ng-dirty
ng-valid

Invalid and dirty -> highlight invalid
.ng-invalid.ng-dirty

Valid and dirty -> highlight valid

Filters
=======
date
currency
uppercase
lowercase
limitTo:3
orderBy:'-price'

Directives
==========
restrict: 'A' -> attr, 'E' -> element
templateUrl: 'path/to/file.html'
controller: fn for controller
controllerAs: alias for controller in html

Services
========
$http
$http({ method: 'GET', url: '/products.json'});
$http.get('/products.json', { apiKey: 'myApiKey' });
post, delete

$log
$filter
'$' is for built it angular services

Promises
========
.success
.error

Resources
=========
Tutorial with phone cat app
Developer Guide -> Learning Resources
API Reference
egghead.io
thinkster.io
kapeli.com/dash, for mac ->
  http://velocity.silverlakesoftware.com/ for Windows by Jamie Da Silva
Soup to Bits: Shaping Up With Angular -> paid thing
CoffeeScript
