// Wrap controller in a closure for purpose of not exposing to the global namespace.
(function(){
    // We are creating a module for the store and have no dependencies
    var app = angular.module('store', []);

    app.controller('StoreController', function(){
        this.products = gems;
    });

    var gems = [
        {
            name: 'Dodecahedron',
            price: 110.5,
            description: 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.',
            canPurchase: true,
            soldOut: true
        }, {
            name: 'Pentagonal Gem',
            price: 5.95,
            description: 'Five sides of fury.',
            canPurchase: true,
            soldOut: false
        }
    ];
})();
