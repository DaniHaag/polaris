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
					$ref : 'globalNavigationBundle'
				},
				'.disclaimers' : {
					$ref : 'disclaimerBundle'
				}
			} ]
		},
		ready : 'start'
	},

	globalNavigationBundle : {
		create : {
			module : './bundles/header/globalnavigation/Bundle'
		}
	},

	disclaimerBundle : {
		create : {
			module : './bundles/footer/disclaimers/Bundle'
		}
	},

	themeUrlController : {
		create : {
			module : './mvc/controller/UrlController',
			args : [ '.content', {
				$ref : 'routingService'
			}, {
				'/' : {
					$ref : 'pageBundle'
				},
				'main/home' : {
					$ref : 'pageBundle'
				}
			} ]
		},
		ready : 'start'
	},

	pageBundle : {
		create : {
			module : './bundles/content/page/Bundle'
		}
	}

});
