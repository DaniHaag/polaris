define([ 'rest' ], function(rest) {

	function MenuItem(itemText, command, items) {
		this.text = ko.observable(itemText);
		this.command = command || ko.command({
			execute : function() {
			}
		});
		this.items = ko.observableArray(items || []);
		this.hasSubMenu = ko.computed(function() {
			return this.items().length > 0;
		}, this);
	}

	MenuItem.prototype = {

		addMenuItem : function(menuItem, position) {
			if (position) {
				this.items.splice(position, 0, menuItem);
			}
			else {
				this.items.push(menuItem);
			}
		},

		addDivider : function(position) {
			var item = {
				divider : true
			};
			if (position) {
				this.items.splice(position, 0, item);
			}
			else {
				this.items.push(item);
			}
		}

	};

	function Menu(text, items) {
		this.text = ko.observable(text);
		this.items = ko.observableArray(items || []);
	}

	Menu.prototype = {

		addMenuItem : function(menuItem, position) {
			if (position) {
				this.items.splice(position, 0, menuItem);
			}
			else {
				this.items.push(menuItem);
			}

			return menuItem;
		}
	};

	var ViewModel = function(moduleContext) {

		var self = this;

		this.initialize = function() {
		};

	};

	return ViewModel;

});
