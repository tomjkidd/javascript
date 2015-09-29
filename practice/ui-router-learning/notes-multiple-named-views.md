Notes
=====
* Named views allow more than one ui-view per template

Example
-------
    <body>
        <div ui-view="filters"></div>
        <div ui-view="tabledata"></div>
        <div ui-view="graph"></div>
    </body>

    $stateProvider
        .state('report', {
            views: {
                'filters': { ... templates and/or controllers ...},
                'tabledata': {},
                'graph': {}
            }
        })

Relative vs. Absolute View Names
================================
* scheme of viewname@statename
