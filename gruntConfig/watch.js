module.exports = {

    /**
     * If any of the JS files change (excluding the bundles to avoid recursion) then
     * execute the linter, then bundle using webpack, then run the unit tests using jasmine.
     */
    js: {
        files: [
            './app.js',
            './Gruntfile.js',
            'src/**/*.js',
            'src/templates/*._.html',
            'test/**/*.js',
            'grunt/**/*.js',
            '!public/js/bundle.js',
            '!test/bundle.js',
            'templates/*.html'
        ],
        tasks: [
            'jshint',
            'jscs',
            'webpack',
            'jasmine'
        ]
    }
};
