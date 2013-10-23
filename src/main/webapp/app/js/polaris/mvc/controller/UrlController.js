define([], function() {

	function UrlController(scope, context) {
		this.scope = $(scope);
		this.context = context;
		this.handlers = {};

		this.scope.bind('DEACTIVATE_HANDLERS', function() {
			for (var handler in this.handlers) {
				if (this.handlers.hasOwnProperty(handler)) {
					this.handlers[handler].deactivate();
				}
			}
		});
	}

	UrlController.prototype = {
		
		context : null,
			
		handlers : null,

		Wrapper : function(handler, scope) {

			var selfWrapper = this;
			
			this.handler = handler;
			
			this.scope = scope;

			this.activate = function(vals) {
				scope.trigger('DEACTIVATE_HANDLERS');
				selfWrapper.handler.activate(this.scope, vals);
			}.bind(this);

			this.deactivate = function() {
				if (jQuery.isFunction(selfWrapper.handler.deactivate)) {
					selfWrapper.handler.deactivate();
				}
			};
		},

		addRoute : function(route, handler) {
			var handlerObj = new this.Wrapper(handler, this.scope);
			this.context.routingService.addRoute(route, handlerObj.activate);
			this.handlers[route] = handlerObj;
		},
		
		addRoutes : function(handlers) {
			for (var route in handlers) {
				if (handlers.hasOwnProperty(route)) {
					var handlerObj = new this.Wrapper(handlers[route], this.scope);
					this.routingService.addRoute(route, handlerObj.activate);
					this.handlers[route] = handlerObj;
				}
			}
		},

		start : function() {
			this.context.routingService.init();
		}

	};

	return UrlController;

});
