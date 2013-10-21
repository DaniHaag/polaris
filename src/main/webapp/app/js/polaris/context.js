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
	},
	
	themeDomController : {
		create : {
			module : './mvc/controller/DomController',
			args : [ '.app', {
				'.globalNavigation' : {
					$ref : 'globalNavigationModule'
				},
				'.disclaimers' : {
					$ref : 'disclaimerModule'
				}
			} ]
		},
		ready : 'start'
	},

	globalNavigationModule : {
		create : {
			module : './modules/header/globalnavigation/Module'
		}
	},

	disclaimerModule : {
		create : {
			module : './modules/footer/disclaimers/Module'
		}
	},

	themeUrlController : {
		create : {
			module : './mvc/controller/UrlController',
			args : [ '.content', {
				$ref : 'routingService'
			}, {
				'/' : {
					$ref : 'pageModule'
				},
				'main/home' : {
					$ref : 'pageModule'
				}
			} ]
		},
		ready : 'start'
	},

	pageModule : {
		create : {
			module : './modules/content/page/Module'
		}
	}

});
