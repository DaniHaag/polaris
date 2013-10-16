define([ 'postal', 'underscore' ], function(postal, _) {

	function MediatorService() {
	}

	MediatorService.DEFAULT_OPTIONS = 'DEFAULT_CHANNEL';

	MediatorService.prototype = {

		channel : null,

		publish : function(event, params) {
			channel.publish(event, params);
		},

		subscribe : function(topic, handler, options) {
			var defaultOptions = {
				channel : MediatorService.DEFAULT_CHANNEL
			};

			_.extend(defaultOptions, options);

			return channel.subscribe({
				channel : defaultOptions.channel,
				topic : topic,
				callback : handler
			});
		},

		unsubscribe : function(subscription) {
			subscription.unsubscribe();
		}

	};

	return MediatorService;

});
