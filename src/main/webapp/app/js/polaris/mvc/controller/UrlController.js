define([], function() {

	function UrlController(scope, routingService, handlers) {
		this.scope = $(scope);
		
		this.allHandlers = {};
		
		this.routingService = routingService;
		
		this.addRoutes(handlers);

		this.scope.bind('DEACTIVATE_HANDLERS', function() {
			for (handler in this.allHandlers) {
				if (this.allHandlers.hasOwnProperty(handler)) {
					this.allHandlers[handler].deactivate();
				}
			}
		});
	}

	UrlController.prototype = {
		
		allHandlers : null,
		
		routingService : null,

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
	
		addRoutes : function(handlers) {
			for (path in handlers) {
				if (handlers.hasOwnProperty(path)) {
					var handlerObj = new this.Wrapper(handlers[path], this.scope);
					this.routingService.addRoute(path, handlerObj.activate);
					this.allHandlers[path] = handlerObj;
				}
			}
		},

		start : function() {
			this.routingService.init();
		}

	};

	return UrlController;

});
