define({

    themeDomController: {
        create: {
            module: 'hdk/mvc/controller/DomController',
            args: [ '#theme', {
                '.globalNavigation': {
                    $ref: 'globalNavigationComponent'
                }
            } ]
        },
        ready: 'start'
    },

    globalNavigationComponent: {
        create: {
            module: './header/globalnavigation/Component'
        }
    }

});
