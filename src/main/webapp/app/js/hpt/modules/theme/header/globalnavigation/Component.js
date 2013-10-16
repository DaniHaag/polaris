define([ 'hdk/mvc/view/ViewTemplate', './ViewModel', 'text!./view.html', , ], function(ViewTemplate, ViewModel, view) {

	var Component = function(moduleContext) {

		var panel, vm = null;

		this.activate = function(parent, params) {
			if (!panel) {
				panel = new Boiler.ViewTemplate(parent, template, nls);
				Boiler.ViewTemplate.setStyleLink(stylePath);
				vm = new ViewModel(moduleContext);
				ko.applyBindings(vm, panel.getDomElement());
			}
			vm.initialize(params.name);
			panel.show();
		};

		this.deactivate = function() {
			if (panel) {
				panel.hide();
			}
		};
	};

	return Component;

});
