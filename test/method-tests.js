var method = require('../src/method');
var _ = require('lodash');

describe('method', function () {

    describe('disable', function () {

        var testObject;

        beforeEach(function () {
            testObject = {
                count: 0,
                increment: function () {
                    this.count += 1;
                }
            };
        });

        it('can disable the behaviour of a function', function () {

            // Just to prove the method works
            testObject.increment();
            expect(testObject.count).toBe(1);

            // Now disable the function
            method.disable(testObject, 'increment');

            // Check things are still as expected
            expect(testObject.count).toBe(1);

            // Call the function
            testObject.increment();

            // Once again, check things are still as expected
            expect(testObject.count).toBe(1);
        });

        it('can restore the original method to the object', function () {

            // Disable the function
            method.disable(testObject, 'increment');

            // Check things are still as expected
            expect(testObject.count).toBe(0);

            // Call the function
            testObject.increment();

            // Once again, check things are still as expected
            expect(testObject.count).toBe(0);

            // Restore the original behaviour
            testObject.increment.restore();

            // Call the method and test
            testObject.increment();
            expect(testObject.count).toBe(1);
        });
    });

    describe('spy', function () {

        it('should create a function', function () {
            expect(_.isFunction(method.spy())).toBe(true);
        });

        describe('keeps a count of the number of calls', function () {

            it('should initially be zero', function () {
                var spy = method.spy();
                expect(spy.callCount()).toBe(0);
                expect(spy.wasCalled()).toBe(false);
            });

            it('should be one after a single execution', function () {
                var spy = method.spy();
                spy();
                expect(spy.callCount()).toBe(1);
                expect(spy.wasCalled()).toBe(true);
            });

            it('should be three after many executions', function () {
                var spy = method.spy();

                _.times(50, spy);
                expect(spy.callCount()).toBe(50);
                expect(spy.wasCalled()).toBe(true);
            });
        });

        describe('keeps the arguments that were used to call the method', function () {

            it('should return an empty array for no arguments', function () {
                var spy = method.spy();
                spy();
                expect(spy.calledWith()).toEqual([]);
            });

            it('should return an array for arguments', function () {
                var spy = method.spy();
                spy(1);
                expect(spy.calledWith()).toEqual([1]);

                spy(1, 'two');
                expect(spy.calledWith()).toEqual([1, 'two']);
            });

            it('should return the argument at the correct index using calledWithAt', function () {

                var spy = method.spy();
                spy(1, 'two');

                expect(spy.calledWithAt(0)).toEqual(1);
                expect(spy.calledWithAt(1)).toEqual('two');
            });
        });
    });

    describe('stub', function () {

        describe('can replace the incrementBy function', function () {

            var testObject;

            beforeEach(function () {

                testObject = {
                    count: 0,
                    incrementBy: function (val) {
                        this.count += val;
                    }
                };
            });

            it('should be replaced and not affect the count', function () {

                // Stub out the incrementBy method
                method.stub(testObject, 'incrementBy');

                // Call it
                testObject.incrementBy(123);

                expect(testObject.incrementBy.wasCalled()).toBe(true);
                expect(testObject.count).toBe(0);
            });

            it('should be able to be restored', function () {

                // Stub out the incrementBy method
                method.stub(testObject, 'incrementBy');

                // Restore again
                testObject.incrementBy.restore();

                // Call it
                testObject.incrementBy(1);

                expect(testObject.count).toBe(1);
            });
        });

        describe('can execute the stubbed function', function () {

            var testObject;

            beforeEach(function () {

                testObject = {
                    count: 0,
                    incrementBy: function (val) {
                        this.count += val;
                    }
                };
            });

            it('should track it was called', function () {

                // Stub out the incrementBy method
                method.stub(testObject, 'incrementBy');

                // Call it
                testObject.incrementBy();

                expect(testObject.incrementBy.wasCalled()).toBe(true);
            });

            it('can pass arguments to the stubbed function', function () {

                 // Stub out the incrementBy method
                method.stub(testObject, 'incrementBy');

                // Call it
                testObject.incrementBy(40);

                expect(testObject.incrementBy.calledWithAt(0)).toBe(40);
                expect(testObject.count).toBe(0);
            });

            it('can execute an argument at a given index', function () {

                // Create an object similar to the window object, i.e. has setTimeout
                var testWindow = {

                        // the same signature as window.setTimeout
                        setTimeout: function (callback, delay) {
                            if (delay) {
                                callback();
                            }
                        }
                    },

                    // Create a stub of the test window object
                    stub = method.stub(testWindow, 'setTimeout'),
                    callbackSpy = method.spy();

                // Call setTimeout with a spy callback in a way that means that the
                // test implementation of setTimeout will not call the callback itself
                testWindow.setTimeout(callbackSpy, false);

                // Force the execture of the argument
                stub.executeArgAt(0);

                // Assert that the argument was called
                expect(callbackSpy.wasCalled()).toBe(true);
            });

            it('can pass arguments when forcing an argument to be exectuted', function () {

                // Create an object similar to the window object, i.e. has setTimeout
                var testWindow = {

                        // The same signature as window.setTimeout
                        setTimeout: function (callback, delay) {
                            if (delay) {
                                callback();
                            }
                        }
                    },

                    // Create a stub of the test window object
                    stub = method.stub(testWindow, 'setTimeout'),
                    callbackSpy = method.spy();

                // Call setTimeout with a spy callback in a way that means that the
                // test implementation of setTimeout will not call the callback itself
                testWindow.setTimeout(callbackSpy, false);

                // Force the execute of the argument
                stub.executeArgAt(0, ['test']);

                // Assert the expected argument was passed to the argument that was
                // forced to execute
                expect(callbackSpy.calledWith()).toEqual(['test']);
            });
        });
    });
});
