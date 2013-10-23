define([ 'knockout', 'polaris/mvc/view/View', './ViewModel', 'text!./template/View.html'], function(ko, View, ViewModel, template) {

	function Bundle(context) {
		this.context = context;
	}

	Bundle.prototype = {
		
		context : null,
			
		view : null,

		vm : null,

		activate : function(parent, model) {
			if (!this.view) {
				this.view = new View(parent, template, null);
				this.vm = new ViewModel(JSON.parse(model), this.context);
				ko.applyBindings(this.vm , this.view.getDomElement());
			}
			this.view.show();
		},

		deactivate : function() {
			if (this.view) {
				this.view.remove();
				this.view = null;
			}
		}
	};

	return Bundle;

});
