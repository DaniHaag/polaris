define({

	domController : {
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

	urlController : {
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
