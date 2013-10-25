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

			this.activate = function(vals) {
				scope.trigger(UrlController.DEACTIVATE_HANDLERS);
				self.routeHandler.activate(this.scope, vals);
			}.bind(this);

			this.deactivate = function() {
				if (jQuery.isFunction(self.routeHandler.deactivate)) {
					self.routeHandler.deactivate();
				}
			};
		},

		addRouteHandler : function(route, model, serialize, handler) {
			var routeHandlerWrapper = new this.RouteHandlerWrapper(handler, this.scope);
			this.context.routingService.addHandler(route, {
				model : model,
				serialize : serialize,
				setup : routeHandlerWrapper.activate
			});
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
