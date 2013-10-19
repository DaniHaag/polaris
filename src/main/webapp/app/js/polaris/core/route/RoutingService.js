define([ 'router', 'history' ], function(Router, History) {

	function RoutingService(routes, handlers) {
		this.router = new Router();
		this.router.map(function(match) {
			for ( var route in routes) {
				match(route).to(routes[route]);
			}
		});
		this.router.getHandler = function(name) {
			return handlers[name];
		};
	}

	RoutingService.prototype = {

		router : null,

		init : function() {
			this.router.init();
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
