define([ 'hasher', 'crossroads', 'when', 'when/pipeline' ], function(hasher, crossroads, when, pipeline) {

	function RoutingService() {
		this.router = crossroads.create();
		this.router.normalizeFn = crossroads.NORM_AS_OBJECT;
		this.handlers = {};
	}

	RoutingService.prototype = {

		router : null,

		handlers : null,

		deferred : null,

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

		addRoute : function(pattern, handler, options) {
			var handlers = function(id) {
				if (this.deferred != null) {
					this.deferred.reject('cancel');
				}
				this.deferred = when.defer();
				var promises = [];
				if (options && options.before) {
					promises.push(options.before);
				}
				promises.push(handler);
				if (options && options.after) {
					promises.push(options.after);
				}
				pipeline(promises, id).then(function() {
					this.deferred.resolve();
				}.bind(this), this.handleError);
			};
			this.router.addRoute(pattern, handlers);
		},

		routeTo : function(path) {
			hasher.setHash(path);
		},

		handleError : function(error) {
			if ("cancel" != "error") {
				if (error != null && error.message) {
					console.error('an error occured:' + error.message);
				}
				else {
					console.error('an error occured:' + error);
				}
			}
			else {
				console.warn('route cancelled:' + error);
			}
		}

	};

	return RoutingService;

});
