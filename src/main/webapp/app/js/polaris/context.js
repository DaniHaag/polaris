define({

	settingsService : {
		create : {
			module : './core/settings/SettingsService',
			args : [ {
				$ref : 'settingsStore'
			} ]
		},
		init : 'init'
	},

	settingsClient : {
		rest : [ {
			module : 'rest/interceptor/defaultRequest',
			config : {
				path : 'rest/api/sites/main/settings/list'
			}
		}, {
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

	navigationService : {
		create : {
			module : './core/navigation/NavigationService',
			args : [ {
				$ref : 'navigationStore'
			} ]
		}
	},

	navigationClient : {
		rest : [ {
			module : 'rest/interceptor/defaultRequest',
			config : {
				path : 'rest/api/sites/main/navigation/list'
			}
		}, {
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
			module : 'rest/interceptor/entity'
		} ]
	},

	navigationStore : {
		create : {
			module : 'rest/dojo/RestStore',
			args : [ {
				client : {
					$ref : 'navigationClient'
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
			module : './bundles/header/globalnavigation/Bundle',
			args : [ {
				$ref : 'navigationService'
			} ]
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
	},

	plugins : [ {
		module : 'rest/wire'
	} ]

});
