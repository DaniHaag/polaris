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
			return when(this.startDomController())
			.then(this.startUrlController.bind(this));
		},
		
		startDomController : function() {
			var deferred = when.defer();
			try {
				var domController = new DomController('.app', this.context);
				domController.addRoute('.globalNavigation', new GlobalNavigationBundle(this.context));
				domController.addRoute('.disclaimers', new DisclaimerBundle(this.context));
				domController.start();
				deferred.resolve();
			}
			catch(error) {
				deferred.reject(error);
			}
			return deferred.promise;
		},
		
		startUrlController : function() {
			var deferred = when.defer();
			try {
				var urlController = new UrlController('.content', this.context);
				var pageBundle = new PageBundle(this.context);
				var externalBundle = new ExternalBundle(this.context);
				var modalBundle = new ModalBundle(this.context);
				var indexBundle = new IndexBundle(this.context);
				this.context.nodesService.getNodes()
				.then(function(nodes) {
					try {
						var routeOptions = {
							before : function(route) {
								return this.context.nodesService.getNode(route.request_);
							}.bind(this)
						};
						for(var i = 0; i < nodes.length; i++) {
							var node = nodes[i];
							switch (node.type) {
								case 'page':
									urlController.addRoute(node.bookmark, pageBundle, routeOptions);
									break;
								case 'external':
									urlController.addRoute(node.bookmark, externalBundle);
									break;
								case 'modal':
									urlController.addRoute(node.bookmark, modalBundle);
									break;
								case 'index':
									urlController.addRoute(node.bookmark, indexBundle);
									break;
								default:
									break;
							}
						}
						urlController.start();
						deferred.resolve();
					}
					catch(error) {
						deferred.reject(error);
					}
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
