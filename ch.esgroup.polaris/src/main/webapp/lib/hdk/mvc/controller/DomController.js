define([ 'jquery', 'underscore' ], function ($, _) {

    function DomController(scope, routes, options) {
        this.scope = $(scope);
        this.handles = routes;
    }

    DomController.prototype = {

        scope : null,

        routes: null,

        handles: null,

        addRoutes: function (newHandles) {
            _.extend(this.handles, newHandles);
        },

        start: function () {
            for (path in this.handles) {
                if (this.handles.hasOwnProperty(path)) {
                    this.scope.find(path).each(function (index) {
                        var paramString = $(this).attr("params");
                        var params = paramString ? eval("({" + paramString + "})") : {};

                        $(this).trigger('DEACTIVATE_HANDLERS');

                        $(this).bind('DEACTIVATE_HANDLERS', function () {
                            (function (handler) {
                                handler.deactivate();
                            })(this.handles[path]);
                        });
                        this.handles[path].activate(this.scope, params);
                    }.bind(this));
                }
            }
        }

    };

    return DomController;

});