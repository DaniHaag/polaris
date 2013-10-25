define([ 'router', 'hasher', 'when' ], function(Router, hasher, when) {

	function RoutingService(store) {
		this.store = store;
		this.router = new Router();
		this.routes = {};
		this.handlers = {};
	}

	RoutingService.prototype = {

		store : null,

		router : null,

		routes : null,

		handlers : null,

		init : function() {
			return when(this.store.query())
			.then(this.addRoutes.bind(this));
		},

		addRoutes : function(routes) {
			for (var i = 0; i < routes.length; i++) {
				this.routes[routes[i].id] = routes[i];
			}
		},

		getRoutePattern : function(pattern) {
			for (var id in this.routes) {
				if(this.routes[id].pattern == pattern) {
					return id;
				}
			}
			return null;
		},
		
		addHandler : function(route, handler) {
			this.handlers[route] = handler;
		},

		start : function() {
			try {
				this.router.map(function(match) {
					for (var id in this.routes) {
						match(this.routes[id].pattern).to(id);
					}
				}.bind(this));
	
				this.router.getHandler = function(name) {
					return this.handlers[this.routes[name].handler];
				}.bind(this);
	
				hasher.changed.add(function(newHash, oldHash) {
					this.router.handleURL(newHash);
				}.bind(this));
	
				this.router.updateURL = function(url) {
					if(url.indexOf('/') == 0) {
						url = url.substring(1);
					}
					hasher.setHash(url);
				};
				
				hasher.init();
				
				var route = this.getRoutePattern(hasher.getHash());
				
				return this.router.transitionTo(route);
			}
			catch(error) {
				when.reject(error);
			}
		},

		transitionTo : function(route) {
			return this.router.transitionTo.apply(this.router, arguments);
		},

		hasRoute : function(route) {
			return this.router.hasRoute(route);
		}

	};

	return RoutingService;

});
