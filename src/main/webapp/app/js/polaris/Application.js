define([ 'wire', 'when', 'when/sequence' ], function(wire, when, sequence) {

	function Application(options) {
		this.subModuleContexts = {};
	}

	Application.prototype = {
		
		context : null,
		
		subModuleContexts : null,

		init : function() {
			return wire('polaris/context')
			.then(function(context) {
				this.context = context;
			}.bind(this));
		},

		start : function() {
			return this.loadModule('polaris/modules/context');
		},

		stop : function() {
		},
		
		loadModule : function(location) {
			return this.context.wire(location)
			.then(function(context) {
				this.subModuleContexts[ 'location' ] = context;
			}.bind(this));
		},

		unloadModules : function(location) {
			return this.subModuleContexts[ 'location' ].destroy();
		}
		
	};

	return Application;

});
