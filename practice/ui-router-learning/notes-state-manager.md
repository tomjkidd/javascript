Components
----------
* ui-view: directive,
* ui-sref: directive, auto-generates href if corresponding state has a url
* $stateProvider:
    * $stateProvider.state
        * template/ templateUrl -> allow specification of template
        * controller -> map a controller
        * resolve -> map a set of dependencies to services
        * data -> attach custom data, access through $state.current.data
        * onEnter -> event handler function for when state becomes active, access to all resolved dependencies
        * onExit -> event handler function for when state becomes inactive, access to all resolved dependencies
* $state:
    * $state.go
* State Change Events
    * { $stateChangeStart, $stateNotFound, $stateChangeSuccess, $stateChangeError }
    * $stateChangeStart can be prevented!
    * Use like -> $rootScope.$on('$stateChangeStart')
* View Load Events
    * { $viewContentLoading, $viewContentLoaded }

Terms
=====

state
-----
* corresponds to a "place" in the application
* describes what the UI looks like and does at that place
* usually nested in a hierarchy
* activated by $state.go, ui-sref, navigation to url associated with the state.
