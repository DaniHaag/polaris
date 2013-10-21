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
        signals: 'lib/signals/dist/signals',
        hasher: 'lib/hasher/dist/js/hasher',
        crossroads: 'lib/crossroads/dist/crossroads',
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
        history: { exports: 'History' },
    },

    packages: [
        { name: 'polaris', location: 'app/js/polaris' },
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

require([ 'bootstrap', 'polaris/Application', 'when', 'domReady' ],
function (bootstrap, Application, when, domReady) {
    var app = new Application();
    when(app.start())
    .then(function () {
    	console.info('polaris successfully started');
    }, function (error) {
    	console.error('polaris failed to start:', error);
    });
});