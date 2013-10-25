define([ 'when', 'dojo/store/Memory', 'dojo/store/Observable' ], function(when, Memory, Observable) {

	function PropertyService(store, options) {
		this.store = store;
	}

	PropertyService.prototype = {

		store : null,

		memoryStore : null,

		observation : null,

		init : function() {
			this.store.query()
			.then(function(result) {
				this.memoryStore = new Memory({
					data : result
				});
				this.observation = this.memoryStore.query();
			}.bind(this));
		},

		getProperty : function(id) {
			return when(this.memoryStore.get(id));
		},

		setProperty : function(id, name) {
			return when(this.memoryStore.put({
				id : id,
				name : name
			}));
		},

		removeProperty : function(id) {
			return when(this.memoryStore.remove(id));
		},

		getProperties : function(id, options) {
			return this.memoryStore.query();
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
