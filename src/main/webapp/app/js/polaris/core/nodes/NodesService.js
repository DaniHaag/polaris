define([ 'when' ], function(when) {

	function NodesService(remoteStore, options) {
		this.remoteStore = remoteStore;
	}

	NodesService.prototype = {

		remoteStore : null,

		getNode : function(id, options) {
			return this.remoteStore.get(id);
		},

		getNodes : function(options) {
			return this.remoteStore.query();
		}

	};

	return NodesService;

});
