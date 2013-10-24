define([ 'require', 'wire', 'when', './mvc/controller/DomController', './bundles/header/globalnavigation/Bundle', './bundles/footer/disclaimers/Bundle', './mvc/controller/UrlController', './bundles/content/page/Bundle', './bundles/content/external/Bundle', './bundles/content/modal/Bundle', './bundles/content/index/Bundle' ],
    function (require, wire, when, DomController, GlobalNavigationBundle, DisclaimerBundle, UrlController, PageBundle, ExternalBundle, ModalBundle, IndexBundle) {

        function Application(options) {
        }

        Application.prototype = {

            context: null,

            init: function () {
                return when(wire([ 'polaris/context' ]))
                    .then(this.setContext.bind(this));
            },

            setContext: function (context) {
                this.context = context;
            },

            getContext: function () {
                return this.context;
            },

            start: function () {
                return when(this.startControllers());
            },

            startControllers: function () {
                return when(this.startDomController())
                .then(this.startUrlController.bind(this));
            },

            startDomController: function () {
                var deferred = when.defer();
                try {
                    var domController = new DomController('.app', this.context);
                    domController.addRoute('.globalNavigation', new GlobalNavigationBundle(this.context));
                    domController.addRoute('.disclaimers', new DisclaimerBundle(this.context));
                    domController.start();
                    deferred.resolve();
                }
                catch (error) {
                    deferred.reject(error);
                }
                return deferred.promise;
            },

            startUrlController: function () {
                var deferred = when.defer();
                try {
                    var urlController = new UrlController('.content', this.context);
                    this.context.nodesService.getNodes()
                    .then(function (nodes) {
                        var routes = this.createRoutes(nodes);
                        var handlers = this.createRouteHandlers(nodes);
                        var handler = function (name) {
                            return handlers[name];
                        }.bind(this);
                        this.context.routingService.init(routes, handler);
                        urlController.start();
                    }.bind(this), function (error) {
                            deferred.reject(error);
                        });
                }
                catch (error) {
                    deferred.reject(error);
                }
                return deferred.promise;
            },

            createRoutes: function (nodes) {
                return function(match)
                {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        match("/nodes/:id").to(node.bookmark);
                    }
                }
            },

            createRouteHandlers: function (nodes) {
                var bundles = {
                    'page': new PageBundle(this.context),
                    'external': new ExternalBundle(this.context),
                    'modal': new ModalBundle(this.context),
                    'index': new IndexBundle(this.context)
                };

                var handlers = {};

                for (var i = 0; i < nodes.length; i++) {

                    var node = nodes[i];

                    switch (node.type) {
                        case 'page':
                        case 'external':
                        case 'modal':
                        case 'index':
                            handlers[node.bookmark] = {

                                model: function (params) {
                                    return this.context.nodesService.getNode(params.id);
                                }.bind(this),

                                serialize: function (post) {
                                    return { id: post.get('id') };
                                }.bind(this),

                                setup: function (post) {
                                    bundles[node.type](post);
                                }.bind(this)

                            };
                            break;
                            break;
                        default:
                            break;
                    }
                }
            },

            handleError: function (error) {
                if (error != null && error.message) {
                    console.error('an error occured:' + error.message);
                }
                else {
                    console.error('an error occured:' + error);
                }
            }

        };

        return Application;

    });
