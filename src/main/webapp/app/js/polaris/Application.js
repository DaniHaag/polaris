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
                return when(this.setupControllers());
            },

            setupControllers: function () {
            	try {
            		this.startDomController();
                	this.startUrlController();
                	return when.resolve();
            	}
            	catch(error) {
            		return when.reject(error);
            	}
            },

            startDomController: function () {
            	var domController = new DomController('.app', this.context);
            	domController.addRoute('.globalNavigation', new GlobalNavigationBundle(this.context));
                domController.addRoute('.disclaimers', new DisclaimerBundle(this.context));
                domController.start();
            },

            startUrlController: function () {
        		var urlController = new UrlController('.content', this.context);
        		var model = function (handlerParams, transition, queryParams) {
                    return this.context.nodesService.getNode(transition.targetName);
                }.bind(this);
                var serialize = function (post) {
                    return { id: post.get('id') };
                }.bind(this);
                urlController.addRouteHandler('page', model, serialize, new PageBundle(this.context));
                urlController.addRouteHandler('index', model, serialize, new PageBundle(this.context));
                urlController.start();
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
