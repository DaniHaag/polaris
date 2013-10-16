define([ 'director' ], function(Router) {

	function RoutingService() {
		this.router = new Router();
	}

	RoutingService.prototype = {

		router : null,

		init : function() {
			this.router.init();
		},

		routeTo : function(path) {
			this.router.setRoute(path);
		},

		addRoute : function(pattern, handler) {
			this.router.on(pattern, handler);
		}

	};

	return RoutingService;

});
