define([ 'wire', 'when', 'when/sequence' ], function(wire, when, sequence) {

	function Application(options) {
	}

	Application.prototype = {

		context : null,

		start : function() {
			wire([ 'polaris/context' ])
			.then(function(context) {
				this.context = context;
			}.bind(this));
		},

		handleError : function(error) {
			if (error != null && error.message) {
				console.error(error.message);
			}
			else {
				console.error(error);
			}
		}

	};

	return Application;

});
