define([ 'knockout', 'polaris/mvc/view/View', './ViewModel', 'text!./template/View.html' ], function(ko, View, ViewModel, template) {

	function Bundle(context) {
		this.context = context;
	}

	Bundle.prototype = {

		context : null,
			
		view : null,

		vm : null,
	
		activate : function(parent, params) {
			if (!this.view) {
				this.view = new View(parent, template, null);
				this.vm = new ViewModel();
				ko.applyBindings(this.vm, this.view.getDomElement());
			}
			this.view.show();
		},

		deactivate : function() {
			if (this.view) {
				this.view.hide();
			}
		}
	};

	return Bundle;

});
