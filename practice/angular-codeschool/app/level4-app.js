// Wrap controller in a closure for purpose of not exposing to the global namespace.
(function(){
  // We are creating a module for the store and have no dependencies
  var app = angular.module('store', []);

  app.controller('StoreController', function(){
    this.products = gems;
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

  app.directive('productTabs', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/product-tabs.html',
      controller: TabController,
      controllerAs: 'tabCtrl'
    }
  });


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

  app.controller('GalleryController', GalleryController);

  app.directive('productGallery', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/product-gallery.html',
      controller: GalleryController,
      controllerAs: 'gallery'
    };
  });

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

  var gems = [
    {
      name: 'Dodecahedron',
      price: 110.5,
      description: 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.',
      images: ['img/gem-02.gif','img/gem-05.gif'],
      shine: 1,
      faces: 10,
      rarity: 100,
      color: 'purple',
      canPurchase: true,
      soldOut: true,
      reviews: [
      {stars:5, body:'I love this gem!', author:'joe@example.org', createdOn: 1397490980837 },
      {stars:1, body:'This gem sucks.', author:'tim@example.org', createdOn: 1397490980837 }
      ]
    }, {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: 'Five sides of fury.',
      images: ['img/gem-02.gif'],
      shine: 8,
      faces: 10,
      rarity: 100,
      color: 'purple',
      canPurchase: true,
      soldOut: false,
      reviews: []
    }
  ];
})();
