define([], function() {

	function Bundle(context) {
		this.context = context;
	}

	Bundle.prototype = {
		
		context : null,
			
		panel : null,

		vm : null,

		activate : function(parent, params) {
			this.context.nodesService.getNode()
			.then(function(node) {
				alert(node);
			});
		},

		deactivate : function() {
		}
	};

	return Bundle;

});
