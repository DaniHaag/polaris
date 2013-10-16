define(function() {

	function EventTarget() {
		this._namedListeners = {};
	}

	EventTarget.prototype = {

		dispatchEvent: function(event) {
			if (!event.type) {
				throw new Error("unspecified type");
			}
			var listeners = this._namedListeners[event.type];
			if (listeners) {
				listeners.forEach(function(listener) {
					try {
						if (typeof listener === "function") {
							listener(event);
						} else {
							listener.handleEvent(event);
						}
					} catch (e) {
						if (typeof console !== 'undefined') {
							console.log(e);
						}
					}			
				});
			}
			return !event.defaultPrevented;
		},

		addEventListener: function(eventName, listener) {
			if (typeof listener === "function" || listener.handleEvent) {
				this._namedListeners[eventName] = this._namedListeners[eventName] || [];
				this._namedListeners[eventName].push(listener);
			}
		},

		removeEventListener: function(eventName, listener) {
			var listeners = this._namedListeners[eventName];
			if (listeners) {
				for (var i = 0; i < listeners.length; i++) {
					if (listeners[i] === listener) {
						if (listeners.length === 1) {
							delete this._namedListeners[eventName];
						} else {
							listeners.splice(i, 1);
						}
						break;
					}
				}
			}
		}
	};
	
	EventTarget.prototype.constructor = EventTarget;
	
	EventTarget.attach = function(obj) {
		var eventTarget = new EventTarget();
		obj.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);
		obj.addEventListener = eventTarget.addEventListener.bind(eventTarget);
		obj.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
	};
	
	return EventTarget;
	
});