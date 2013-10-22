define([ 'when', 'dojo/store/Memory', 'dojo/store/Observable' ], function(when, Memory, Observable) {

	function PropertyService(remoteStore, options) {
		this.remoteStore = remoteStore;
	}

	PropertyService.prototype = {

		remoteStore : null,

		localStore : null,

		observation : null,

		init : function() {
			this.remoteStore.query()
			.then(function(result) {
				this.localStore = new Memory({
					data : result
				});
				this.observation = this.localStore.query();
			}.bind(this));
		},

		getProperty : function(name) {
			return when(this.localStore.get(name));
		},

		setProperty : function(name, value) {
			return when(this.localStore.put({
				id : name,
				name : value
			}));
		},

		removeProperty : function(name) {
			return when(this.localStore.remove(name));
		},

		addListener : function(listener) {
			return observation.observe(listener);
		},

		removeListener : function(listener) {
			listener.cancel();
		}

	};

	return PropertyService;

});
