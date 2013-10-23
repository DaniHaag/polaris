define([ 'jquery', 'underscore' ], function ($, _) {

    function DomController(scope, context, options) {
        this.scope = $(scope);
        this.context = context;
        this.handlers = {};
    }

    DomController.DEACTIVATE_HANDLERS = 'DEACTIVATE_HANDLERS';
    
    DomController.prototype = {

    	context : null,
    		
        scope : null,

        routes: null,

        handlers: null,

        addRoute: function (route, handler) {
        	this.handlers[route] = handler;
        },
        
        addRoutes: function (handlers) {
            for(var route in handlers) {
            	this.handlers[route] = handlers[route];
            }
        },

        start: function () {
            for (path in this.handlers) {
                if (this.handlers.hasOwnProperty(path)) {
                    this.scope.find(path)
                    .each(function (index, parent) {
                        var paramString = $(this).attr("params");
                        var params = paramString ? eval("({" + paramString + "})") : {};

                        $(this).trigger(DomController.DEACTIVATE_HANDLERS);

                        $(this).bind(DomController.DEACTIVATE_HANDLERS, function () {
                            (function (handler) {
                                handler.deactivate();
                            })(this.handlers[path]);
                        }.bind(this));
                        
                        this.handlers[path].activate($(parent), params);
                    }.bind(this));
                }
            }
        }

    };

    return DomController;

});