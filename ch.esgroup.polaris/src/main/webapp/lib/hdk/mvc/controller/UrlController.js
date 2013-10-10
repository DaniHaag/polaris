define([ 'hdk/core/route/Router' ], function (Router) {

    var UrlController = function (scope) {

        var allHandles = {};
        var router = new Router();

        scope.bind('DEACTIVATE_HANDLERS', function () {
            for (handler in allHandles) {
                if (allHandles.hasOwnProperty(handler)) {
                    allHandles[handler].deactivate();
                }
            }
        });

        function Wrapper(handle) {

            this.handle = handle;

            var selfWrapper = this;
            this.activate = function (vals) {
                scope.trigger('DEACTIVATE_HANDLERS');
                selfWrapper.handle.activate(scope, vals);
            };

            this.deactivate = function () {
                if (jQuery.isFunction(selfWrapper.handle.deactivate)) {
                    selfWrapper.handle.deactivate();
                }
            };
        }

        return {

            addRoutes: function (handles) {
                for (path in handles) {
                    if (handles.hasOwnProperty(path)) {
                        var handlerObj = new Wrapper(handles[path]);
                        router.addRoute(path, handlerObj.activate);
                        allHandles[path] = handlerObj;
                    }
                }
            },

            start: function () {
                router.init();
            }
        };

    };

    UrlController.goTo = function (newPath) {
        Router.routeTo(newPath);
    };

    return UrlController;

});
