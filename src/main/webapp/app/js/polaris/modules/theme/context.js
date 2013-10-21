define({

	themeDomController : {
		create : {
			module : 'polaris/mvc/controller/DomController',
			args : [ '.theme', {
				'.globalNavigation' : {
					$ref : 'globalNavigationComponent'
				},
				'.disclaimers' : {
					$ref : 'disclaimerComponent'
				}
			} ]
		},
		ready : 'start'
	},

	globalNavigationComponent : {
		create : {
			module : './header/globalnavigation/Component'
		}
	},

	disclaimerComponent : {
		create : {
			module : './footer/disclaimers/Component'
		}
	},

	themeUrlController : {
		create : {
			module : 'polaris/mvc/controller/UrlController',
			args : [ '.content', {
				$ref : 'routingService'
			}, {
				'main/home' : {
					$ref : 'pageComponent'
				}
			} ]
		},
		ready : 'start'
	},

	pageComponent : {
		create : {
			module : './content/page/Component'
		}
	}

});
