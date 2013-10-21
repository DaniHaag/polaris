define([ 'knockout' ], function(ko) {

	ko.bindingHandlers.component = {

		init : function(element, valueAccessor) {
			var $element = $(element), value = valueAccessor(), type = null;
		}

	};

});
