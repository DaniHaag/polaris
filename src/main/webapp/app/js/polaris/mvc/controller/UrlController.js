define([ 'polaris/core/route/Router' ], function (Router) {

	function UrlController (scope, routes, routingService) {

        var allHandlers = {};
        


        scope.bind('DEACTIVATE_HANDLERS', function () {
            for (handler in allHandlers) {
                if (allHandlers.hasOwnProperty(handler)) {
                    allHandlers[handler].deactivate();
                }
            }
        });

        function Wrapper(handler) {

            this.handler = handler;

            var selfWrapper = this;
            this.activate = function (vals) {
                scope.trigger('DEACTIVATE_HANDLERS');
                selfWrapper.handler.activate(scope, vals);
            };

            this.deactivate = function () {
                if (jQuery.isFunction(selfWrapper.handler.deactivate)) {
                    selfWrapper.handler.deactivate();
                }
            };
        }

        return {

            addRoutes: function (handlers) {
                for (path in handles) {
                    if (handlers.hasOwnProperty(path)) {
                        var handlerObj = new Wrapper(handlers[path]);
                        router.addRoute(path, handlerObj.activate);
                        allHandlers[path] = handlerObj;
                    }
                }
            },

            start: function () {
                router.init();
            }
        };

    }

	UrlController.prototype = {
		
		routingService : null,
			
		goTo : function (newPath) {
			this.Router.routeTo(newPath);
		}
			
	};

    return UrlController;

});
