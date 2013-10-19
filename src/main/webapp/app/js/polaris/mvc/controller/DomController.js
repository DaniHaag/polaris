define([ 'jquery', 'underscore' ], function ($, _) {

    function DomController(scope, handlers, options) {
        this.scope = $(scope);
        this.handlers = handlers;
    }

    DomController.prototype = {

        scope : null,

        routes: null,

        handlers: null,

        addRoutes: function (newHandlers) {
            _.extend(this.handlers, newHandlers);
        },

        start: function () {
            for (path in this.handlers) {
                if (this.handlers.hasOwnProperty(path)) {
                    this.scope.find(path).each(function (index, parent) {
                        var paramString = $(this).attr("params");
                        var params = paramString ? eval("({" + paramString + "})") : {};

                        $(this).trigger('DEACTIVATE_HANDLERS');

                        $(this).bind('DEACTIVATE_HANDLERS', function () {
                            (function (handler) {
                                handler.deactivate();
                            })(this.handlers[path]);
                        });
                        this.handlers[path].activate($(parent), params);
                    }.bind(this));
                }
            }
        }

    };

    return DomController;

});