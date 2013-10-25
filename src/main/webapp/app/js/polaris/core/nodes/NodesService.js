define([ 'when' ], function(when) {

	function NodesService(store, options) {
		this.store = store;
	}

	NodesService.prototype = {

		store : null,

		getNode : function(id, options) {
			return when(this.store.get(id));
		},

		getNodes : function(options) {
			return when(this.store.query());
		}

	};

	return NodesService;

});
