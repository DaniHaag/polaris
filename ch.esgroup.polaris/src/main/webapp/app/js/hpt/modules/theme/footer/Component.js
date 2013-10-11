define([ 'hdk/mvc/view/ViewTemplate', 'wc!hdk/ui/elements/example/std-html1.html!dec', 'text!./view.html' ], 
function(ViewTemplate, stdHtml1, template) {

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
