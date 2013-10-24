define([ 'router', 'history' ], function(Router, History) {

	function RoutingService(routes, handlers) {
		this.router = new Router();
	}

	RoutingService.prototype = {

		router : null,
		
		init : function(routes, handler) {
			this.router.map(routes);
			this.router.getHandler = handler;
			History.Adapter.bind(window, 'statechange', function() {
				var state = History.getState();
				this.router.handleURL(state.url);
			});
			
			this.router.updateURL = function(url) {
				History.pushState(null, null, url);
			};
		},

		startRouting : function() {
			var state = History.getState();
			return this.transitionTo(state.url);
		},

		transitionTo : function(name) {
			this.router.transitionTo.apply(this.router, arguments);
		},

		hasRoute : function(route) {
			return this.router.hasRoute(route);
		},

		reset : function() {
			this.router.reset();
		}

	};

	return RoutingService;

});
