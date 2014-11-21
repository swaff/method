var _ = require('lodash');

/**
 * A simple spy method that simply returns a function that keeps a count
 * of the number of times the method was executed and what is was last executed
 * with.
 */
var spy = function () {

    // Variables to maintain the state in the closure
    var callCount = 0;
    var args = null;

    // Create a simple function that updates the above state
    var spyFunc = function () {
        callCount += 1;
        args = Array.prototype.slice.call(arguments);
    };

    // Add functions to the function so that the consumer can
    // easily extract the information

    spyFunc.calledWith = function () {
        return args;
    };

    spyFunc.wasCalled = function () {
        return callCount > 0;
    };

    spyFunc.callCount = function () {
        return callCount;
    };

    spyFunc.calledWithAt = function (index) {
        return spyFunc.calledWith()[index];
    };

    return spyFunc;
};

/**
 * A method for use in unit testing that will allow an object
 * to have a method disabled and then restored later on.
 *
 * Useful for removing calls to apis etc.
 */
var disable = function (obj, functionName) {

    // keep a reference to the original function
    var originalFunction = obj[functionName];

    // create a new function that is a no-op
    var newFunc = spy();

    // augment the new function with a restore method that
    // will reasign the original function back onto the
    // object
    newFunc.restore = function () {
        obj[functionName] = originalFunction;
    };

    // finally, assign the disabled function to the object
    obj[functionName] = newFunc;

    return newFunc;
};

/**
 * A method to stub out a function but allow the function to
 * continue to be executed via a spy and to execute any
 * of the arguments that are passed to the function.
 *
 * Useful for stubbing out window.setTImeout for example.
 */
var stub = function (obj, functionName) {

    var stubbedFunc;
    var args;
    var disabledFunction = disable(obj, functionName);

    // create a new function that wraps the disabled function
    // but captures any arguments that are used in it's execution
    stubbedFunc = function () {
        args = Array.prototype.slice.call(arguments);
        disabledFunction.apply(disabledFunction, args);
    };

    // copy all the useful functions from the disabled function (calledWith, restore etc)
    _.assign(stubbedFunc, disabledFunction);

    // add a new function that allows the arguments that the original
    // function is called with to be executed.
    stubbedFunc.executeArgAt = function (index, argumentsToApply) {
        args[index].apply(args, argumentsToApply);
    };

    // resasign the original objects function
    obj[functionName] = stubbedFunc;

    return stubbedFunc;
};

module.exports = {
    disable: disable,
    stub: stub,
    spy: spy
};
