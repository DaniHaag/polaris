define(function(require) {

	var createCssLink = function(href) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = href;
		document.getElementsByTagName("head")[0].appendChild(link);
	};

	var Styler = function() {
	};

	Styler.attachCssLink = function(href, elementId) {
		if (elementId) {
			var link = document.getElementById(elementId);
			if (!link) {
				createCssLink(href);
			}
			else {
				link.href = href;
			}
		}
		else {
			var links = document.getElementsByTagName('link');
			for ( var i = 0; i < links.length; i++) {
				if (links[i].href && (links[i].href.indexOf(href) !== -1)) {
					return;
				}
			}
			createCssLink(href);
		}
	};

	Styler.attachCssText = function(elementId, css) {

		var elem = document.getElementById(elementId);
		if (elem) {
			elem.parentNode.removeChild(elem);
		}

		var style = document.createElement('style');
		style.type = 'text/css';
		style.setAttribute("id", elementId);

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		}
		else {
			style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName('head')[0].appendChild(style);

	};

	Styler.attachScopedCss = function(parent, styleText) {
		if (styleText) {
			styleElement = $("<style type='text/css' scoped='scoped'>"
					+ styleText + "</style>");
			parent.prepend(styleElement);
		}
	};

	return Styler;

});
