define([ 'hdk/mvc/view/ViewTemplate', 'text!./view.html' ], 
function(ViewTemplate, template) {

	function Component() {
	}

	Component.prototype = {

		panel : null,

		activate : function(parent) {
			if (!this.panel) {
				this.panel = new ViewTemplate(parent, template);
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
