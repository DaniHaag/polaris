'use strict';

require.config({

    baseUrl: '.',
    
    urlArgs: "timestamp="+(new Date()).getTime(),

    paths: {
    	text: 'lib/require/text',
    	i18n: 'lib/require/i18n',
    	wc: 'lib/require/wc',
    	polymer : 'lib/polymer/polymer/polymer',
    	xtag: 'components/x-tag-core/src/core',
        jquery: 'lib/jquery/jquery-1.10.2',
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        underscore: 'lib/lodash/lodash',
        director: 'lib/director/build/director',
        hasher: 'lib/hasher/dist/js/hasher',
        crossroads: 'lib/crossroads/dist/crossroads',
        knockout: 'lib/knockout/knockout-3.0.0rc.debug',
        postal: 'lib/postal/lib/postal',
        riveter: 'lib/riveter/riveter',
        domReady: 'lib/require/domReady'
    },

    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag', deps: ['polymer'] }
    },

    config: {
        ws: {
    		standardModule: 'polymer',
    		xTagModule: 'xtag',
    		polymerModule: 'polymer',
    		debug: true
        }
    },

    packages: [
        { name: 'hpt', location: 'app/js/hpt' },
        { name: 'hdk', location: 'lib/hdk' },
        { name: 'curl', location: 'lib/curl/src/curl' },
        { name: 'wire', location: 'lib/wire', main: 'wire' },
        { name: 'rest', location: 'lib/rest', main: 'rest' },
        { name: 'msgs', location: 'lib/msgs', main: 'msgs' },
        { name: 'when', location: 'lib/when', main: 'when' },
        { name: 'meld', location: 'lib/meld', main: 'meld' },
        { name: 'poly', location: 'lib/poly' },
       //{ name: 'polymer', location: 'lib/polymer', main: 'polymer-v0.0.20131003.min' }
        { name: 'yaap', location: 'lib/yaap', main: 'yaap' },
        { name: 'dojo', location: 'lib/dojo' }
    ]

});

require([ 'bootstrap', 'hpt/Application', 'when', 'domReady' ], function (bootstrap, Application, when, domReady) {
    var app = new Application();
    when(app.init())
        .then(app.start.bind(app))
        .then(function () {
            console.info('the application successfully started');
        }, function (error) {
            console.error('the application failed to start:', error);
        });
});