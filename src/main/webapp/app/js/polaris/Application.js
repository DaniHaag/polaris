define([ 'require', 'wire', 'when', './mvc/controller/DomController', './bundles/header/globalnavigation/Bundle', './bundles/footer/disclaimers/Bundle', './mvc/controller/UrlController', './bundles/content/page/Bundle', './bundles/content/external/Bundle', './bundles/content/modal/Bundle', './bundles/content/index/Bundle' ],
function(require, wire, when, DomController, GlobalNavigationBundle, DisclaimerBundle, UrlController, PageBundle, ExternalBundle, ModalBundle, IndexBundle) {

	function Application(options) {
	}

	Application.prototype = {

		context : null,

		init : function() {
			return when(wire([ 'polaris/context' ]))
			.then(this.setContext.bind(this));
		},

		setContext : function(context) {
			this.context = context;
		},

		getContext : function() {
			return this.context;
		},
		
		start : function() {
			return when(this.startControllers());
		},
		
		startControllers : function() {
			var deferred = when.defer();
			try {
				// setup dom controller
				var domController = new DomController('.app', this.context);
				domController.addRoute('.globalNavigation', new GlobalNavigationBundle(this.context));
				domController.addRoute('.disclaimers', new DisclaimerBundle(this.context));
				domController.start();
				
				// setup url controller
				var urlController = new UrlController('.content', this.context);
				var pageBundle = new PageBundle(this.context);
				var externalBundle = new ExternalBundle(this.context);
				var modalBundle = new ModalBundle(this.context);
				var indexBundle = new IndexBundle(this.context);
				this.context.navigationService.getNodes()
				.then(function(nodesJson) {
					var nodes = JSON.parse(nodesJson);
					for(var i = 0; i < nodes.length; i++) {
						var node = nodes[i];
						switch (node.type) {
							case 'page':
								urlController.addRoute(node.route, pageBundle);
								break;
							case 'external':
								urlController.addRoute(node.route, externalBundle);
								break;
							case 'modal':
								urlController.addRoute(node.route, modalBundle);
								break;
							case 'index':
								urlController.addRoute(node.route, indexBundle);
								break;
							default:
								break;
						}
					}
					urlController.start();
					deferred.resolve();
				}.bind(this), function(error) {
					deferred.reject(error);
				});
			}
			catch(error) {
				deferred.reject(error);
			}
			return deferred.promise;
		},
		
		handleError : function(error) {
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
