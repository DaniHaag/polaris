define({

    settingsService: {
        create: {
            module: 'hdk/core/property/PropertyService',
            args: [
                {
                    $ref: 'settingsStore'
                }
            ]
        }
    },

    settingsStore: {
        create: {
            module: 'dojo/store/Memory',
            args: [
                {
                    id: 1,
                    name: "One"
                },
                {
                    id: 2,
                    name: "Two"
                }
            ]
        }
    }

});
