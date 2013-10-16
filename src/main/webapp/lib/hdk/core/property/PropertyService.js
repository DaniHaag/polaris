define([ 'when', 'dojo/store/Observable' ], function(when, Observable) {

	function PropertyService(store, options) {
		this.store = new Observable(store);
		this.observation = this.store.query();
	}

	PropertyService.prototype = {

		store : null,

		observation : null,

		getProperty : function(name) {
			return when(this.store.get(name));
		},

		setProperty : function(name, value) {
			return when(this.store.put({
				id : name,
				name : value
			}));
		},

		removeProperty : function(name) {
			return when(this.store.remove(name));
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