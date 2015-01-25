(function(){

  var app = angular.module('store-directives', []);

  app.directive('productTabs', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/product-tabs.html',
      controller: TabController,
      controllerAs: 'tabCtrl'
    }
  });

  app.directive('productGallery', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/product-gallery.html',
      controller: GalleryController,
      controllerAs: 'gallery'
    };
  });

  app.directive('productTitle', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/product-title.html'
    };
  });

  app.directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/product-description.html'
    };
  });

  app.directive('productSpecs', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/product-specs.html'
    };
  });

  app.directive('productReviews', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/product-reviews.html'
    };
  });

  function TabController() {
    this.tab = 1;

    this.setTab = function(newTab) {
      this.tab = newTab;
    };

    this.isSet = function(x) {
      return x === this.tab;
    };
  };

  function GalleryController() {
    this.current = 0;

    this.setCurrent = function(i) {
      if (i) {
        this.current = i;
      } else {
        this.current = 0;
      }
    };
  };
})()
