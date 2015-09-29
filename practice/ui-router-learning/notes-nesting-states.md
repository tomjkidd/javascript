Notes
=====
* When the application is in a particular state, when a state is "active",
all of its ancestor states are implicitly active as well.
* Child states load their templates into their parent's ui-view
* Child States inherit
    * dependencies via resolve
    * custom data properties
* Children of abstract state inherit
    * url property of their parent as a prefix of their own url
* Scope properties only inherit down the state chain if the views of you states are nested.

Terms
=====

Nesting
-------
* Using 'dot notation'
    * .state('contacts.list', {})
* Using ui-router.stateHelper to build states from a nested state tree.
* Using the <code>parent</code> property with the parent name as string
    * parent:'contacts'
* Using the <code>parent</code> property with the parent object
    * parent: contacts

Abstract States
---------------
* Can have child states, but can not get activated itself.

Dot Notation
============
    $stateProvider
        .state('contacts', {})
        .state('contacts.list', {})

Parent Property using State Name String
=======================================
    $stateProvider
        .state('contacts', {})
        .state('list', {
            parent: 'contacts'
        })
