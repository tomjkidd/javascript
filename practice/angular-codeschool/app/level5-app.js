// Wrap controller in a closure for purpose of not exposing to the global namespace.
(function(){
  // We are creating a module for the store and have dependencies
  var app = angular.module('store', ['store-directives']);

  app.controller('StoreController', ['$http', function($http){
    var store = this;
    store.products = [];

    $http.get('/data/store-products.json').success(function(data) {
      store.products = data;
    });
  }]);

  app.controller('ReviewController', function(){
    this.review = {};

    this.addReview = function(product, form) {
      // Add the review to the product, and clear out the form
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};

      // Set the form back to a pristine state
      form.$setPristine();
    }
  });
})();
