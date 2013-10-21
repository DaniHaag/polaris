define([ 'hasher', 'crossroads' ], function(hasher, crossroads) {

	function RoutingService() {
		this.router = crossroads.create();
		this.router.normalizeFn = crossroads.NORM_AS_OBJECT;
	}

	RoutingService.prototype = {

		router : null,

		init : function() {
			var parseHash = function(newHash, oldHash) {
				this.router.parse(newHash);
			}.bind(this);
			hasher.initialized.add(parseHash);
			hasher.changed.add(parseHash);

			if (!hasher.isActive()) {
				hasher.init();
			}
		},

		addRoute : function(pattern, handler) {
			this.router.addRoute(pattern, handler);
		},

		routeTo : function(path) {
			hasher.setHash(path);
		}

	};

	return RoutingService;

});
