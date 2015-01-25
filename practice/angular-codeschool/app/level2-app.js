// Wrap controller in a closure for purpose of not exposing to the global namespace.
(function(){
  // We are creating a module for the store and have no dependencies
  var app = angular.module('store', []);

  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('TabController', function() {
    this.tab = 1;

    this.setTab = function(newTab) {
      this.tab = newTab;
    };

    this.isSet = function(x) {
      return x === this.tab;
    };
  });

  app.controller('GalleryController', function(){
    this.current = 0;

    this.setCurrent = function(i) {
      if (i) {
        this.current = i;
      } else {
        this.current = 0;
      }
    };
  });

  var gems = [
    {
      name: 'Dodecahedron',
      price: 110.5,
      description: 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.',
      images: ['img/gem-02.gif','img/gem-05.gif'],
      shine: 1,
      canPurchase: true,
      soldOut: true
    }, {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: 'Five sides of fury.',
      images: ['img/gem-02.gif'],
      shine: 8,
      canPurchase: true,
      soldOut: false
    }
  ];
})();
