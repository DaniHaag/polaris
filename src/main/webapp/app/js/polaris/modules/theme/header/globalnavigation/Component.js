define([ 'knockout', 'polaris/mvc/view/ViewTemplate', './ViewModel', 'text!./template/View.html'], function(ko, ViewTemplate, ViewModel, template) {

	function Component() {
	}

	Component.prototype = {
		
		panel : null,

		vm : null,

		activate : function(parent, params) {
			if (!this.panel) {
				this.panel = new ViewTemplate(parent, template, null);
				this.vm = new ViewModel();
				ko.applyBindings(this.vm , this.panel.getDomElement());
			}
			this.panel.show();
		},

		deactivate : function() {
			if (this.panel) {
				this.panel.hide();
			}
		}
	};

	return Component;

});
