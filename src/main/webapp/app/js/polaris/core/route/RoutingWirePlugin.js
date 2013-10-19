(function(define) { 'use strict';
define(function(require) {
 
	var pipeline, when;
 
	pipeline = require('wire/lib/pipeline');
	when = require('when');
 
	return function(/* options */) {
		var routeMap = [];
 
		return {
			context: {
				ready: function(resolver) {
					processRoutes(getUrl(window));
					window.addEventListener('hashchange', handleHashChange);
					resolver.resolve();
				},
				destroy: function(resolver) {
					window.removeEventListener('hashchange', handleHashChange);
					routeMap = null;
					resolver.resolve();
				}
			},
			facets: {
				route: {
					connect: routeFacet
				}
			}
		};
 
		function handleHashChange(e) {
			processRoutes(getUrl(e.target));
		}
 
		function processRoutes(url) {
			routeMap.forEach(function(route) {
				if(route.matcher.test(url)) {
					route.handler(url);
				}
			});
		}
 
		function routeFacet(resolver, proxy, wire) {
			var promises, options;
 
			options = proxy.options;
 
			promises = when.map(Object.keys(options), function(route) {
				return parseRoute(route, options[route], proxy, wire);
			}).then(function(routes) {
					routeMap = routeMap.concat(routes);
				});
 
			resolver.resolve(promises);
		}
 
	}
 
	function getUrl(target) {
		return target.location.hash.slice(1);
	}
 
	function parseRoute(rx, handlerSpec, proxy, wire) {
		return pipeline(proxy, handlerSpec, wire).then(function(h) {
			return {
				matcher: new RegExp(rx),
				handler: h
			};
		});
	}
 
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));