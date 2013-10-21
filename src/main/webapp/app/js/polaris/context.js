define({

	settingsService : {
		create : {
			module : './core/property/PropertyService',
			args : [ {
				$ref : 'settingsStore'
			} ]
		}
	},

	settingsClient : {
		rest : [ {
			module : 'rest/interceptor/errorCode',
			config : {
				code : '400'
			}
		}, {
			module : 'rest/interceptor/mime',
			config : {
				mime : 'application/x-www-form-urlencoded',
				accept : "application/json"
			}
		}, {
			module : 'rest/interceptor/pathPrefix',
			config : {
				prefix : 'api/v2/navigation'
			}
		}, {
			module : 'rest/interceptor/entity'
		} ]
	},

	settingsStore : {
		create : {
			module : 'rest/dojo/RestStore',
			args : [ {
				client : {
					$ref : 'settingsClient'
				}
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
