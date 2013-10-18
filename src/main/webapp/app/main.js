'use strict';

require.config({

    baseUrl: '.',
    
    //urlArgs: 'timestamp=' + (new Date()).getTime(),

    paths: {
    	bootstrap: 'lib/bootstrap/dist/js/bootstrap',
    	modernizr : 'lib/modernizr/modernizr',
    	respond : 'lib/respond/respond.src',
    	jquery: 'lib/jquery/jquery-1.10.2',
    	polymer : 'lib/polymer/polymer.min',
    	xtag: 'components/x-tag-core/src/core',
        underscore: 'lib/lodash/lodash',
        router: 'lib/router/dist/router.amd',
        'route-recognizer': 'lib/route-recognizer/route-recognizer.amd',
        history: 'lib/history/scripts/bundled/html4+html5/native.history',
        knockout: 'lib/knockout/knockout-3.0.0rc.debug',
        // plugins
    	text: 'lib/require/text',
    	wc: 'lib/require/wc',
    	i18n: 'lib/require/i18n',
        domReady: 'lib/require/domReady'
    },

    shim: {
        bootstrap: {
            deps: [ 'modernizr', 'respond', 'jquery' ]
        },
        history: {},
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