define({

    themeDomController: {
        create: {
            module: 'hdk/mvc/controller/DomController',
            args: [ '#theme', {
                '.disclaimers': {
                    $ref: 'disclaimersComponent'
                }
            } ]
        },
        ready: 'start'
    },

    disclaimersComponent: {
        create: {
            module: './disclaimers/Component'
        }
    }

});
