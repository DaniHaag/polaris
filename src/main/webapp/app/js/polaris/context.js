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
			module : 'rest/interceptor/pathPrefix',
			config : {
				prefix : 'api/rest/settings/'
			}
		}, {
			module : 'rest/interceptor/errorCode',
			config : {
				code : '400'
			}
		}, {
			module : 'rest/interceptor/mime',
			config : {
				mime : 'application/json',
				accept : 'application/json'
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

	nodesService : {
		create : {
			module : './core/nodes/NodesService',
			args : [ {
				$ref : 'nodesStore'
			} ]
		}
	},

	nodesClient : {
		rest : [ {
			module : 'rest/interceptor/pathPrefix',
			config : {
				prefix : 'api/rest/nodes/'
			}
		}, {
			module : 'rest/interceptor/errorCode',
			config : {
				code : '400'
			}
		}, {
			module : 'rest/interceptor/mime',
			config : {
				mime : 'application/json',
				accept : 'application/json'
			}
		}, {
			module : 'rest/interceptor/entity'
		} ]
	},

	nodesStore : {
		create : {
			module : 'rest/dojo/RestStore',
			args : [ {
				client : {
					$ref : 'nodesClient'
				}
			} ]
		}
	},

	routesClient : {
		rest : [ {
			module : 'rest/interceptor/pathPrefix',
			config : {
				prefix : 'api/rest/routes/'
			}
		}, {
			module : 'rest/interceptor/errorCode',
			config : {
				code : '400'
			}
		}, {
			module : 'rest/interceptor/mime',
			config : {
				mime : 'application/json',
				accept : 'application/json'
			}
		}, {
			module : 'rest/interceptor/entity'
		} ]
	},

	routesStore : {
		create : {
			module : 'rest/dojo/RestStore',
			args : [ {
				client : {
					$ref : 'routesClient'
				}
			} ]
		}
	},
	routingService : {
		create : {
			module : './core/routing/RoutingService',
			args : [ {
				$ref : 'routesStore'
			} ]
		},
		init : 'init'
	},

	plugins : [ {
		module : 'rest/dojo/wire'
	} ]

});
