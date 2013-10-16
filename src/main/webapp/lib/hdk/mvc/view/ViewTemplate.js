define([ 'hdk/core/dom/Styler', 'hdk/core/localization/Localizer', 'underscore' ], function (Styler, Localizer, _) {

    function ViewTemplate(parent, viewTemplate, nls, styleText) {
        this.createView(parent, viewTemplate, nls, styleText);
    }

    ViewTemplate.setStyleText = function (styleId, styleText) {
        Styler.attachCssText(styleId, styleText);
    };

    ViewTemplate.setStyleLink = function (href, linkId) {
        Styler.attachCssLink(href, linkId);
    };

    ViewTemplate.prototype = {

        getElementId: function () {
            return this.viewId;
        },

        getJQueryElement: function () {
            return this.jQueryElement;
        },

        getDomElement: function () {
            return this.jQueryElement.get(0);
        },

        appendTo: function (parent) {
            this.jQueryElement.appendTo(parent);
        },

        remove: function () {
            this.jQueryElement.remove();
        },

        hide: function () {
            this.jQueryElement.hide();
        },

        show: function () {
            this.jQueryElement.show();
        },

        createView: function (parentElement, viewText, nls, styleText) {
            viewText = Localizer.localize(viewText, nls);
            this.viewId = _.uniqueId([ 'bpjscontainer_' ]);
            this.jQueryElement = $("<span id='" + this.viewId + "'>" + viewText + "</span>");
            Styler.attachScopedCss(this.jQueryElement, styleText);
            if (parentElement) {
                parentElement.append(this.jQueryElement);
            }
        }

    };

    return ViewTemplate;

});