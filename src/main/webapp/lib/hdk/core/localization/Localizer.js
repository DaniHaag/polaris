var userLang = localStorage.getItem("user-language");
if (userLang) {
    require.config({
        locale : userLang
    });
}

define([ 'underscore' ], function(_) {

	var Localizer = function() {
	};

	function template(text) {
		var orig_settings = _.templateSettings;
		_.templateSettings = {
			interpolate : /\{\{(.+?)\}\}/g
		};

		var compiled = _.template(text);
		_.templateSettings = orig_settings;
		return compiled;
	}

	Localizer.localize = function(text, nlsObject) {
		if (!nlsObject) {
			return text;
		}

		var compiled = template(text);
		return compiled({
			nls : nlsObject
		});
	};

	Localizer.setLanguage = function(locale) {
		localStorage.setItem("user-language", locale);
		location.reload();
	};

	Localizer.clearLanguage = function() {
		localStorage.removeItem("user-language");
		location.reload();
	};

	return Localizer;

});
