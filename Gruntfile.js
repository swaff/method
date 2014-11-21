module.exports = function(grunt) {

    // this is to deal with the presence of <% and %> in the underscore code
    // which seems to cause a problem with the replace task.
    grunt.template.addDelimiters('config', '{%', '%}');

    grunt.initConfig({
        watch: require('./gruntConfig/watch'),
        webpack: require('./gruntConfig/webpack'),
        jshint: require('./gruntConfig/jshint'),
        jasmine: require('./gruntConfig/jasmine'),
        jscs: require('./gruntConfig/jscs')
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-jscs");


    /* The default task that will be run.
     *
     * Will set up a watch on the file system to rebuild for each change.
     */
    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'webpack',
        'jasmine',
        'watch'
    ]);
};


