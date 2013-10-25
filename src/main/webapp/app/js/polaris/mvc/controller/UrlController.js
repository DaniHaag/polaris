define([], function() {

	function UrlController(scope, context) {
		this.scope = $(scope);
		this.context = context;
	}

	UrlController.DEACTIVATE_HANDLERS = 'DEACTIVATE_HANDLERS';
	
	UrlController.prototype = {
		
		context : null,
			
		handlers : null,

		RouteHandlerWrapper : function(handler, scope) {

			var self = this;
			
			this.routeHandler = handler;
			
			this.scope = scope;

			this.activate = function(model) {
				scope.trigger(UrlController.DEACTIVATE_HANDLERS);
				self.routeHandler.activate(this.scope, model);
			}.bind(this);

			this.deactivate = function() {
				if (jQuery.isFunction(self.routeHandler.deactivate)) {
					self.routeHandler.deactivate();
				}
			};
		},

		addRouteHandler : function(route, handler) {
			var routeHandlerWrapper = new this.RouteHandlerWrapper(handler.setup, this.scope);
			handler.setup = routeHandlerWrapper.activate;
			this.context.routingService.addHandler(route, handler);
			this.scope.bind(UrlController.DEACTIVATE_HANDLERS, function() {
				routeHandlerWrapper.deactivate();
			}.bind(this));
		},

		start : function() {
			this.context.routingService.start();
		}

	};

	return UrlController;

});
