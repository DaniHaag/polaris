define({

	settingsService : {
		create : {
			module : './core/property/PropertyService',
			args : [ {
				$ref : 'settingsStore'
			} ]
		}
	},

	settingsStore : {
		create : {
			module : 'dojo/store/Memory',
			args : [ {
				id : 1,
				name : 'one'
			}, {
				id : 2,
				name : 'two'
			} ]
		}
	},

	routingService : {
		create : {
			module : './core/route/RoutingService'
		}
	}

});
