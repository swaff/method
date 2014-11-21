module.exports = {

    /**
     * For testing require in all the tests in the main.js file and
     * have webpack create a single file that the test page can link to.
     */
    test: {
        context: "./test",
        entry: "./main.js",
        output: {
            path: "./test",
            filename: "bundle.js"
        }
    }
};
