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

	plugins : [ {
		module : 'rest/wire'
	} ]

});
