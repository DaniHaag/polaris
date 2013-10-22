define([ 'when' ], function(when) {

	function NavigationService(remoteStore, options) {
		this.remoteStore = remoteStore;
	}

	NavigationService.prototype = {

		remoteStore : null,

		getNode : function(id, options) {
			return this.remoteStore.get(id);
		},

		getNodes : function(options) {
			return this.remoteStore.query();
		}

	};

	return NavigationService;

});
