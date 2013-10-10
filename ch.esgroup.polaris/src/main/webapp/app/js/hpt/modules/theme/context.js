define({

    themeDomController: {
        create: {
            module: 'hdk/mvc/controller/DomController',
            args: [ '#theme', {
                '.footer': {
                    $ref: 'footerComponent'
                }
            } ]
        },
        ready: 'start'
    },

    footerComponent: {
        create: {
            module: './footer/Component'
        }
    }

});
