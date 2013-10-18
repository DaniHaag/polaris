define({

	themeDomController : {
		create : {
			module : 'hdk/mvc/controller/DomController',
			args : [ '#theme', {
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
	}

});
