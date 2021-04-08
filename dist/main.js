/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_reset_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/reset.scss */ "./src/styles/reset.scss");
/* harmony import */ var _playerstats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerstats */ "./src/playerstats.js");



document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
  var searchBar = document.querySelector(".search");
  searchBar.addEventListener("keyup", function (e) {
    if (e.keyCode === 13 && searchBar.value !== "") {
      e.preventDefault();
      var player = searchBar.value;
      var splash = document.querySelector(".splash");
      splash.remove();
      var h1 = document.createElement("h1");
      h1.textContent = "".concat(player.toUpperCase());
      h1.setAttribute('class', 'player-header');
      var page = document.querySelector(".page-container");
      page.appendChild(h1);
      var body = document.querySelector("body");
      body.classList.add("player-page");
      var picContainer = document.createElement("div");
      picContainer.setAttribute('class', 'pic-container');
      page.appendChild(picContainer);
      var pic = document.createElement("div");
      pic.setAttribute('class', 'gamer-image');
      picContainer.appendChild(pic);
      setTimeout(function () {
        _playerstats__WEBPACK_IMPORTED_MODULE_2__["renderData"]("".concat(player));
      }, 800);
      var csSection = document.createElement("div");
      csSection.classList.add("cs-div");
      var CSHeader = document.createElement("h1");
      CSHeader.textContent = "Those Darn Minions";
      CSHeader.classList.add("average-cs-header");
      page.appendChild(csSection);
      csSection.appendChild(CSHeader);
      var damageSection = document.createElement("div");
      damageSection.classList.add("damage-div");
      var damageHeader = document.createElement("h1");
      damageHeader.textContent = "The Damage Has Been Done";
      damageHeader.classList.add("average-cs-header");
      page.appendChild(damageSection);
      damageSection.appendChild(damageHeader);
      var goldSection = document.createElement("div");
      goldSection.classList.add("gold-div");
      var goldHeader = document.createElement("h1");
      goldHeader.textContent = "CHA-CHING!";
      goldHeader.classList.add("average-cs-header");
      page.appendChild(goldSection);
      goldSection.appendChild(goldHeader);
      var kdaSection = document.createElement("div");
      kdaSection.classList.add("kda-div");
      var kdaHeader = document.createElement("h1");
      kdaHeader.textContent = "Killing Me Softly";
      kdaHeader.classList.add("average-cs-header");
      page.appendChild(kdaSection);
      kdaSection.appendChild(kdaHeader);
    }
  });
  var fakerButton = document.querySelector("#fakerButton");
  fakerButton.addEventListener('click', function () {
    var splash = document.querySelector(".splash");
    splash.remove();
    var h1 = document.createElement("h1");
    h1.textContent = "Faker";
    h1.setAttribute('class', 'player-header');
    var page = document.querySelector(".page-container");
    page.appendChild(h1);
    var body = document.querySelector("body");
    body.classList.add("player-page");
    var picContainer = document.createElement("div");
    picContainer.setAttribute('class', 'pic-container');
    page.appendChild(picContainer);
    var pic = document.createElement("div");
    pic.setAttribute('class', 'faker-image');
    picContainer.appendChild(pic);
    setTimeout(function () {
      _playerstats__WEBPACK_IMPORTED_MODULE_2__["renderData"]("Faker");
    }, 800);
    var csSection = document.createElement("div");
    csSection.classList.add("cs-div");
    var CSHeader = document.createElement("h1");
    CSHeader.textContent = "Those Darn Minions";
    CSHeader.classList.add("average-cs-header");
    page.appendChild(csSection);
    csSection.appendChild(CSHeader);
    var damageSection = document.createElement("div");
    damageSection.classList.add("damage-div");
    var damageHeader = document.createElement("h1");
    damageHeader.textContent = "The Damage Has Been Done";
    damageHeader.classList.add("average-cs-header");
    page.appendChild(damageSection);
    damageSection.appendChild(damageHeader);
    var goldSection = document.createElement("div");
    goldSection.classList.add("gold-div");
    var goldHeader = document.createElement("h1");
    goldHeader.textContent = "CHA-CHING!";
    goldHeader.classList.add("average-cs-header");
    page.appendChild(goldSection);
    goldSection.appendChild(goldHeader);
    var kdaSection = document.createElement("div");
    kdaSection.classList.add("kda-div");
    var kdaHeader = document.createElement("h1");
    kdaHeader.textContent = "Killing Me Softly";
    kdaHeader.classList.add("average-cs-header");
    page.appendChild(kdaSection);
    kdaSection.appendChild(kdaHeader);
  });
  var bangButton = document.querySelector("#bangButton");
  bangButton.addEventListener('click', function () {
    var splash = document.querySelector(".splash");
    splash.remove();
    var h1 = document.createElement("h1");
    h1.textContent = "Bang";
    h1.setAttribute('class', 'player-header');
    var page = document.querySelector(".page-container");
    page.appendChild(h1);
    var body = document.querySelector("body");
    body.classList.add("player-page");
    var picContainer = document.createElement("div");
    picContainer.setAttribute('class', 'pic-container');
    page.appendChild(picContainer);
    var pic = document.createElement("div");
    pic.setAttribute('class', 'bang-image');
    picContainer.appendChild(pic);
    setTimeout(function () {
      _playerstats__WEBPACK_IMPORTED_MODULE_2__["renderData"]("Bang");
    }, 800);
    var csSection = document.createElement("div");
    csSection.classList.add("cs-div");
    var CSHeader = document.createElement("h1");
    CSHeader.textContent = "Those Darn Minions";
    CSHeader.classList.add("average-cs-header");
    page.appendChild(csSection);
    csSection.appendChild(CSHeader);
    var damageSection = document.createElement("div");
    damageSection.classList.add("damage-div");
    var damageHeader = document.createElement("h1");
    damageHeader.textContent = "The Damage Has Been Done";
    damageHeader.classList.add("average-cs-header");
    page.appendChild(damageSection);
    damageSection.appendChild(damageHeader);
    var goldSection = document.createElement("div");
    goldSection.classList.add("gold-div");
    var goldHeader = document.createElement("h1");
    goldHeader.textContent = "CHA-CHING!";
    goldHeader.classList.add("average-cs-header");
    page.appendChild(goldSection);
    goldSection.appendChild(goldHeader);
    var kdaSection = document.createElement("div");
    kdaSection.classList.add("kda-div");
    var kdaHeader = document.createElement("h1");
    kdaHeader.textContent = "Killing Me Softly";
    kdaHeader.classList.add("average-cs-header");
    page.appendChild(kdaSection);
    kdaSection.appendChild(kdaHeader);
  }); // const bjergButton = document.querySelector("#bjergButton")
  // bjergButton.addEventListener('click', () => {
  //     let splash = document.querySelector(".splash");
  //     splash.remove();
  //     const h1 = document.createElement("h1");
  //     h1.textContent = "Bjergsen";
  //     h1.setAttribute('class', 'player-header');
  //     const page = document.querySelector(".page-container");
  //     page.appendChild(h1);
  //     let body = document.querySelector("body");
  //     body.classList.add("player-page");
  //     let picContainer = document.createElement("div");
  //     picContainer.setAttribute('class', 'pic-container')
  //     page.appendChild(picContainer);
  //     let pic = document.createElement("div");
  //     pic.setAttribute('class', 'bjerg-image');
  //     picContainer.appendChild(pic);
  //     setTimeout(() => {
  //         playerstats.renderData("Bjergsen");
  //     }, 50);
  // })

  var jensenButton = document.querySelector("#jensenButton");
  jensenButton.addEventListener('click', function () {
    var splash = document.querySelector(".splash");
    splash.remove();
    var h1 = document.createElement("h1");
    h1.textContent = "Jensen";
    h1.setAttribute('class', 'player-header');
    var page = document.querySelector(".page-container");
    page.appendChild(h1);
    var body = document.querySelector("body");
    body.classList.add("player-page");
    var picContainer = document.createElement("div");
    picContainer.setAttribute('class', 'pic-container');
    page.appendChild(picContainer);
    var pic = document.createElement("div");
    pic.setAttribute('class', 'jensen-image');
    picContainer.appendChild(pic);
    setTimeout(function () {
      _playerstats__WEBPACK_IMPORTED_MODULE_2__["renderData"]("Jensen");
    }, 800);
    var csSection = document.createElement("div");
    csSection.classList.add("cs-div");
    var CSHeader = document.createElement("h1");
    CSHeader.textContent = "Those Darn Minions";
    CSHeader.classList.add("average-cs-header");
    page.appendChild(csSection);
    csSection.appendChild(CSHeader);
    var damageSection = document.createElement("div");
    damageSection.classList.add("damage-div");
    var damageHeader = document.createElement("h1");
    damageHeader.textContent = "The Damage Has Been Done";
    damageHeader.classList.add("average-cs-header");
    page.appendChild(damageSection);
    damageSection.appendChild(damageHeader);
    var goldSection = document.createElement("div");
    goldSection.classList.add("gold-div");
    var goldHeader = document.createElement("h1");
    goldHeader.textContent = "CHA-CHING!";
    goldHeader.classList.add("average-cs-header");
    page.appendChild(goldSection);
    goldSection.appendChild(goldHeader);
    var kdaSection = document.createElement("div");
    kdaSection.classList.add("kda-div");
    var kdaHeader = document.createElement("h1");
    kdaHeader.textContent = "Killing Me Softly";
    kdaHeader.classList.add("average-cs-header");
    page.appendChild(kdaSection);
    kdaSection.appendChild(kdaHeader);
  });
});

/***/ }),

/***/ "./src/playerstats.js":
/*!****************************!*\
  !*** ./src/playerstats.js ***!
  \****************************/
/*! exports provided: filterByPlayer, champsPlayed, renderData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterByPlayer", function() { return filterByPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "champsPlayed", function() { return champsPlayed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderData", function() { return renderData; });
var regeneratorRuntime = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js"); // prints all the matches in the csv
// export const results = d3.csv('../data/2021_Match_Data.csv')
// .then( (result) => console.log(result[0].player))
// returns all the matches for a single player


var filterByPlayer = function filterByPlayer(playerName) {
  return d3.csv('../data/2021_Match_Data.csv').then(function (result) {
    var filteredResult;
    filteredResult = result.filter(function (game) {
      return game.player.toLowerCase() === playerName.toLowerCase();
    });
    return filteredResult;
  });
}; // returns all the player's champions played

var champsPlayed = function champsPlayed(playerName) {
  filterByPlayer(playerName).then(function (games) {
    var champs = [];
    games.forEach(function (game) {
      champs.push(game.champion);
    });
    return champs;
  });
}; // creates it all really

function renderData(playerName) {
  var champCount = {};
  filterByPlayer(playerName).then(function (games) {
    var champs = [];
    var bestCSGames = [];
    var damageTaken = [];
    var damageGiven = [];
    var goldGames = [];
    var totalKills = [];
    var totalAssists = [];
    var totalDeaths = [];

    if (!games.length) {
      var picContainer = document.querySelector(".pic-container");
      var noExist = document.createElement("h1");
      noExist.textContent = "Unfortunately, we do not have data on this player. Our dataset is limited to professional players in the 2021 season from January to April.";
      noExist.classList.add("no-exist-header");
      picContainer.appendChild(noExist);
    } else {
      games.forEach(function (game) {
        champs.push(game.champion);
        bestCSGames.push(game.totalcs);
        damageTaken.push(game.damagetakenperminute);
        damageGiven.push(game.dpm);
        goldGames.push(game.earnedgold);
        totalKills.push(game.kills);
        totalAssists.push(game.assists);
        totalDeaths.push(game.deaths);
      });
      champs.forEach(function (champ) {
        if (!champCount[champ]) {
          champCount[champ] = 0;
        }

        champCount[champ]++;
      });
      createFavoriteChamps(champCount, playerName);
      var averageCS = d3.mean(bestCSGames);
      createMinionsObserver(playerName, averageCS); // let csSection = document.querySelector(".cs-div");
      // let csStat = document.createElement("h1");
      // csStat.innerHTML = `${playerName} sure loves to mess up those minions. They usually have an average CS of <span style="color:#cc0000">${averageCS}</span> by the end of the game!`;
      // csStat.classList.add("csStat")
      // csSection.appendChild(csStat);
      // let minionDiv = document.createElement("div")
      // minionDiv.classList.add("minion-div");
      // csSection.appendChild(minionDiv);

      var averageGiven = d3.mean(damageGiven);
      var averageTaken = d3.mean(damageTaken);
      var dmgGiven = {
        name: "Average DMG Given per minute",
        amount: averageGiven
      };
      var dmgTaken = {
        name: "Average DMG Taken per minute",
        amount: averageTaken
      };
      var dmgData = [dmgGiven, dmgTaken];
      createDmgObserver(dmgData, playerName); // createDmg(dmgData, playerName);

      var averageGold = d3.mean(goldGames);
      createGoldObserver(averageGold, playerName);
      var totalKillCount = d3.sum(totalKills);
      var totalAssistCount = d3.sum(totalAssists);
      var totalDeathCount = d3.sum(totalDeaths);
      var totalKillData = {
        name: "Kills",
        amount: totalKillCount
      };
      var totalAssistData = {
        name: "Assists",
        amount: totalAssistCount
      };
      var totalDeathData = {
        name: "Deaths",
        amount: totalDeathCount
      };
      var totalKDAData = [totalKillData, totalAssistData, totalDeathData];
      createKDAObserver(totalKDAData, playerName);
    }
  });
}

var createMinions = function createMinions(playerName, averageCS) {
  var csSection = document.querySelector(".cs-div");
  var csStat = document.createElement("h1");
  csStat.innerHTML = "".concat(playerName, " sure loves to mess up those minions. They usually have an average CS of <span style=\"color:#cc0000\">").concat(averageCS, "</span> by the end of the game!");
  csStat.classList.add("csStat");
  csSection.appendChild(csStat);
  var minionDiv = document.createElement("div");
  minionDiv.classList.add("minion-div");
  csSection.appendChild(minionDiv);
};

var createMinionsObserver = function createMinionsObserver(playerName, averageCS) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  };
  var renderCounter = 0;

  var handleIntersect = function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      if (entry.isIntersecting && renderCounter === 0) {
        createMinions(playerName, averageCS);
        renderCounter++;
      }
    });
  };

  var observer = new IntersectionObserver(handleIntersect, options);
  var csSection = document.querySelector(".cs-div");
  observer.observe(csSection);
};

var createGold = function createGold(playerName, averageGold) {
  var goldSection = document.querySelector(".gold-div");
  var goldStat = document.createElement("h1");
  goldStat.innerHTML = "".concat(playerName, " is quite certainly getting that bread. They end up earning an average of <span style=\"color:#ffd736\">").concat(averageGold, "</span> gold each game!");
  goldStat.classList.add("goldStat");
  goldSection.appendChild(goldStat);
  var goldPicDiv = document.createElement("div");
  goldPicDiv.classList.add("gold-pic-div");
  goldSection.appendChild(goldPicDiv);
  var goldPic1 = document.createElement("div");
  goldPic1.classList.add("gold-pic1");
  goldPicDiv.appendChild(goldPic1);
  var goldPic2 = document.createElement("div");
  goldPic2.classList.add("gold-pic2");
  goldPicDiv.appendChild(goldPic2);
};

var createGoldObserver = function createGoldObserver(averageGold, playerName) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  var renderCounter = 0;

  var handleIntersect = function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      if (entry.isIntersecting && renderCounter === 0) {
        goldAnimate();
        setTimeout(function () {
          createGold(playerName, averageGold);
        }, 1500);
        renderCounter++;
      }
    });
  };

  var observer = new IntersectionObserver(handleIntersect, options);
  var goldTarget = document.querySelector('.gold-div');
  observer.observe(goldTarget);
};

var goldAnimate = function goldAnimate() {
  var goldDiv = document.querySelector(".gold-div");

  for (var index = 0; index < 75; index++) {
    setTimeout(function () {
      var coin = document.createElement("span");
      coin.classList.add("coin");
      coin.style.top = "0";
      coin.style.marginLeft = "".concat(Math.floor(Math.random() * 100) + 1 + '%', " ");
      coin.style.marginRight = "".concat(Math.floor(Math.random() * 100) + 1 + '%');
      coin.style.marginTop = "".concat(Math.floor(Math.random() * 50) + 1 + '%');
      goldDiv.appendChild(coin);
    }, Math.floor(Math.random() * 50) + 1);
  }

  setTimeout(function () {
    var coins = document.querySelectorAll(".coin");
    coins.forEach(function (coin) {
      return coin.remove();
    });
  }, 2000);
};

var createDmgObserver = function createDmgObserver(dmgData, playerName) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  };
  var renderCounter = 0;

  var handleIntersect = function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      if (entry.isIntersecting && renderCounter === 0) {
        createDmg(dmgData, playerName);
        renderCounter++;
      }
    });
  };

  var observer = new IntersectionObserver(handleIntersect, options);
  var damageTarget = document.querySelector('.damage-div');
  observer.observe(damageTarget);
};

var createKDAObserver = function createKDAObserver(kdaData, playerName) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  };
  var renderCounter = 0;

  var handleIntersect = function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      if (entry.isIntersecting && renderCounter === 0) {
        createKDA(kdaData, playerName);
        renderCounter++;
      }
    });
  };

  var observer = new IntersectionObserver(handleIntersect, options);
  var kdaTarget = document.querySelector('.kda-div');
  observer.observe(kdaTarget);
}; // actual chart creation


var createFavoriteChamps = function createFavoriteChamps(data, playerName) {
  var champArr = [];
  Object.keys(data).forEach(function (champion) {
    var champObj = {
      champName: champion,
      timesPlayed: data[champion]
    };
    champArr.push(champObj);
  });
  champArr = champArr.sort(function (a, b) {
    return d3.descending(a.timesPlayed, b.timesPlayed);
  }).slice(0, 5);
  var picContainer = document.querySelector(".pic-container");
  var svgContainer = document.createElement("div");
  svgContainer.setAttribute('class', 'champs-graph-container');
  picContainer.appendChild(svgContainer);
  var playedChampsHeader = document.createElement("h1");
  playedChampsHeader.textContent = "".concat(playerName, "'s Favorite Champions");
  playedChampsHeader.classList.add("played-champs-header");
  svgContainer.append(playedChampsHeader);
  var width = 1000;
  var height = 500;
  var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  };
  var svg = d3.select('.champs-graph-container').append('svg').attr('height', height - margin.top - margin.bottom).attr('width', width - margin.left - margin.right).attr('viewBox', [0, 0, width, height]);
  var x = d3.scaleBand().domain(d3.range(champArr.length)).range([margin.left, width - margin.right]).padding(0.1);
  var y = d3.scaleLinear().domain([0, 20]).range([height - margin.bottom, margin.top]);
  svg.append('g').attr('fill', 'royalblue').selectAll('rect').data(champArr.sort(function (a, b) {
    return d3.descending(a.timesPlayed, b.timesPlayed);
  })).join('rect').attr('x', function (d, i) {
    return x(i);
  }).attr('y', function (d) {
    return y(0);
  }).attr('height', function (d) {
    return y(0) - y(0);
  }).attr('width', x.bandwidth()).attr('class', 'favorite-champ-rect');

  function xAxis(g) {
    g.attr('transform', "translate(0, ".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).tickFormat(function (i) {
      return champArr[i].champName;
    })).attr('font-size', '20px');
  }

  function yAxis(g) {
    g.attr('transform', "translate(".concat(margin.left, "), 0)")).call(d3.axisLeft(y).ticks(null, data.format)).attr('font-size', '20px');
  }

  var div = d3.select("favorite-champ-rect").append("div").attr("class", "tooltip").style("display", "none");
  svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", ".006em").style("text-anchor", "middle").text("Times Played 2021 Season");
  svg.selectAll("rect").transition().duration(800).attr("y", function (d) {
    return y(d.timesPlayed);
  }).attr("height", function (d) {
    return y(0) - y(d.timesPlayed);
  });
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
  svg.node();
};

var createDmg = function createDmg(data, playerName) {
  var damageDiv = document.querySelector(".damage-div");
  var svgContainer = document.createElement("div");
  svgContainer.setAttribute('class', 'damage-graph-container');
  damageDiv.appendChild(svgContainer);
  var damageGraphHeader = document.createElement("h1");
  damageGraphHeader.textContent = "".concat(playerName, " taketh damage as they giveth");
  damageGraphHeader.classList.add("damage-graph-header");
  svgContainer.append(damageGraphHeader);
  var width = 1000;
  var height = 500;
  var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  };
  var svg = d3.select('.damage-div').append('svg').attr('height', height - margin.top - margin.bottom).attr('width', width - margin.left - margin.right).attr('viewBox', [0, 0, width, height]);
  var x = d3.scaleBand().domain(d3.range(2)).range([margin.left, width - margin.right]).padding(0.1);
  var y = d3.scaleLinear().domain([0, 1000]).range([height - margin.bottom, margin.top]);
  svg.append('g').selectAll('rect').data(data).join('rect').attr('x', function (d, i) {
    return x(i);
  }).attr('y', function (d) {
    return y(0);
  }).attr('height', function (d) {
    return y(0) - y(0);
  }).attr('width', x.bandwidth()).attr('class', function (d, i) {
    return "damage-rect-".concat(d.name);
  });

  function xAxis(g) {
    g.attr('transform', "translate(0, ".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).tickFormat(function (i) {
      return data[i].name;
    })).attr('font-size', '20px');
  }

  function yAxis(g) {
    g.attr('transform', "translate(".concat(margin.left, "), 0)")).call(d3.axisLeft(y).ticks(null, data.format)).attr('font-size', '20px');
  }

  svg.selectAll("rect").transition().duration(2000).attr("y", function (d) {
    return y(d.amount);
  }).attr("height", function (d) {
    return y(0) - y(d.amount);
  });
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
  svg.node();
};

var createKDA = function createKDA(data, playerName) {
  var kdaDiv = document.querySelector(".kda-div");
  var svgContainer = document.createElement("div");
  svgContainer.setAttribute('class', 'kda-graph-container');
  kdaDiv.appendChild(svgContainer);
  var kdaGraphHeader = document.createElement("h1");
  kdaGraphHeader.textContent = "".concat(playerName, "'s total kills, deaths, and assists this season");
  kdaGraphHeader.classList.add("kda-graph-header");
  svgContainer.append(kdaGraphHeader);
  var width = 1000;
  var height = 500;
  var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  };
  var svg = d3.select('.kda-div').append('svg').attr('height', height - margin.top - margin.bottom).attr('width', width - margin.left - margin.right).attr('viewBox', [0, 0, width, height]);
  var x = d3.scaleBand().domain(d3.range(3)).range([margin.left, width - margin.right]).padding(0.1);
  var y = d3.scaleLinear().domain([0, 250]).range([height - margin.bottom, margin.top]);
  svg.append('g') // .attr('fill', 'darkred')
  .selectAll('rect').data(data).join('rect').attr('x', function (d, i) {
    return x(i);
  }).attr('y', function (d) {
    return y(0);
  }).attr('height', function (d) {
    return y(0) - y(0);
  }).attr('width', x.bandwidth()).attr('class', function (d, i) {
    return "kda-rect-".concat(d.name);
  }).attr('fill', 'blue');

  function xAxis(g) {
    g.attr('transform', "translate(0, ".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).tickFormat(function (i) {
      return data[i].name;
    })).attr('font-size', '20px');
  }

  function yAxis(g) {
    g.attr('transform', "translate(".concat(margin.left, "), 0)")).call(d3.axisLeft(y).ticks(null, data.format)).attr('font-size', '20px');
  }

  svg.selectAll("rect").transition().duration(2000).attr("y", function (d) {
    return y(d.amount);
  }).attr("height", function (d) {
    return y(0) - y(d.amount);
  });
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
  svg.node();
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/reset.scss":
/*!*******************************!*\
  !*** ./src/styles/reset.scss ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcnN0YXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LnNjc3MiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInNlYXJjaEJhciIsInF1ZXJ5U2VsZWN0b3IiLCJlIiwia2V5Q29kZSIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJwbGF5ZXIiLCJzcGxhc2giLCJyZW1vdmUiLCJoMSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRvVXBwZXJDYXNlIiwic2V0QXR0cmlidXRlIiwicGFnZSIsImFwcGVuZENoaWxkIiwiYm9keSIsImNsYXNzTGlzdCIsImFkZCIsInBpY0NvbnRhaW5lciIsInBpYyIsInNldFRpbWVvdXQiLCJwbGF5ZXJzdGF0cyIsImNzU2VjdGlvbiIsIkNTSGVhZGVyIiwiZGFtYWdlU2VjdGlvbiIsImRhbWFnZUhlYWRlciIsImdvbGRTZWN0aW9uIiwiZ29sZEhlYWRlciIsImtkYVNlY3Rpb24iLCJrZGFIZWFkZXIiLCJmYWtlckJ1dHRvbiIsImJhbmdCdXR0b24iLCJqZW5zZW5CdXR0b24iLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJyZXF1aXJlIiwiZmlsdGVyQnlQbGF5ZXIiLCJwbGF5ZXJOYW1lIiwiZDMiLCJjc3YiLCJ0aGVuIiwicmVzdWx0IiwiZmlsdGVyZWRSZXN1bHQiLCJmaWx0ZXIiLCJnYW1lIiwidG9Mb3dlckNhc2UiLCJjaGFtcHNQbGF5ZWQiLCJnYW1lcyIsImNoYW1wcyIsImZvckVhY2giLCJwdXNoIiwiY2hhbXBpb24iLCJyZW5kZXJEYXRhIiwiY2hhbXBDb3VudCIsImJlc3RDU0dhbWVzIiwiZGFtYWdlVGFrZW4iLCJkYW1hZ2VHaXZlbiIsImdvbGRHYW1lcyIsInRvdGFsS2lsbHMiLCJ0b3RhbEFzc2lzdHMiLCJ0b3RhbERlYXRocyIsImxlbmd0aCIsIm5vRXhpc3QiLCJ0b3RhbGNzIiwiZGFtYWdldGFrZW5wZXJtaW51dGUiLCJkcG0iLCJlYXJuZWRnb2xkIiwia2lsbHMiLCJhc3Npc3RzIiwiZGVhdGhzIiwiY2hhbXAiLCJjcmVhdGVGYXZvcml0ZUNoYW1wcyIsImF2ZXJhZ2VDUyIsIm1lYW4iLCJjcmVhdGVNaW5pb25zT2JzZXJ2ZXIiLCJhdmVyYWdlR2l2ZW4iLCJhdmVyYWdlVGFrZW4iLCJkbWdHaXZlbiIsIm5hbWUiLCJhbW91bnQiLCJkbWdUYWtlbiIsImRtZ0RhdGEiLCJjcmVhdGVEbWdPYnNlcnZlciIsImF2ZXJhZ2VHb2xkIiwiY3JlYXRlR29sZE9ic2VydmVyIiwidG90YWxLaWxsQ291bnQiLCJzdW0iLCJ0b3RhbEFzc2lzdENvdW50IiwidG90YWxEZWF0aENvdW50IiwidG90YWxLaWxsRGF0YSIsInRvdGFsQXNzaXN0RGF0YSIsInRvdGFsRGVhdGhEYXRhIiwidG90YWxLREFEYXRhIiwiY3JlYXRlS0RBT2JzZXJ2ZXIiLCJjcmVhdGVNaW5pb25zIiwiY3NTdGF0IiwiaW5uZXJIVE1MIiwibWluaW9uRGl2Iiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwicmVuZGVyQ291bnRlciIsImhhbmRsZUludGVyc2VjdCIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjcmVhdGVHb2xkIiwiZ29sZFN0YXQiLCJnb2xkUGljRGl2IiwiZ29sZFBpYzEiLCJnb2xkUGljMiIsImdvbGRBbmltYXRlIiwiZ29sZFRhcmdldCIsImdvbGREaXYiLCJpbmRleCIsImNvaW4iLCJzdHlsZSIsInRvcCIsIm1hcmdpbkxlZnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXJnaW5SaWdodCIsIm1hcmdpblRvcCIsImNvaW5zIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZURtZyIsImRhbWFnZVRhcmdldCIsImtkYURhdGEiLCJjcmVhdGVLREEiLCJrZGFUYXJnZXQiLCJkYXRhIiwiY2hhbXBBcnIiLCJPYmplY3QiLCJrZXlzIiwiY2hhbXBPYmoiLCJjaGFtcE5hbWUiLCJ0aW1lc1BsYXllZCIsInNvcnQiLCJhIiwiYiIsImRlc2NlbmRpbmciLCJzbGljZSIsInN2Z0NvbnRhaW5lciIsInBsYXllZENoYW1wc0hlYWRlciIsImFwcGVuZCIsIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwic3ZnIiwic2VsZWN0IiwiYXR0ciIsIngiLCJzY2FsZUJhbmQiLCJkb21haW4iLCJyYW5nZSIsInBhZGRpbmciLCJ5Iiwic2NhbGVMaW5lYXIiLCJzZWxlY3RBbGwiLCJqb2luIiwiZCIsImkiLCJiYW5kd2lkdGgiLCJ4QXhpcyIsImciLCJjYWxsIiwiYXhpc0JvdHRvbSIsInRpY2tGb3JtYXQiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJmb3JtYXQiLCJkaXYiLCJ0ZXh0IiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwibm9kZSIsImRhbWFnZURpdiIsImRhbWFnZUdyYXBoSGVhZGVyIiwia2RhRGl2Iiwia2RhR3JhcGhIZWFkZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0Es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QyxNQUFoQyxDQUROLEVBRUNyQixJQUZELENBRU0sV0FGTixFQUVtQixNQUZuQjtBQUdIOztBQUlERixLQUFHLENBQUNVLFNBQUosQ0FBYyxNQUFkLEVBQ0tnQixVQURMLEdBRUtDLFFBRkwsQ0FFYyxJQUZkLEVBR0t6QixJQUhMLENBR1UsR0FIVixFQUdlLFVBQVNVLENBQVQsRUFBWTtBQUFFLFdBQU9KLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDekYsTUFBSCxDQUFSO0FBQXFCLEdBSGxELEVBSUsrRSxJQUpMLENBSVUsUUFKVixFQUlvQixVQUFTVSxDQUFULEVBQVk7QUFBRSxXQUFPSixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9BLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDekYsTUFBSCxDQUFmO0FBQTRCLEdBSjlEO0FBTUE2RSxLQUFHLENBQUNQLE1BQUosQ0FBVyxHQUFYLEVBQWdCd0IsSUFBaEIsQ0FBcUJGLEtBQXJCO0FBQ0FmLEtBQUcsQ0FBQ1AsTUFBSixDQUFXLEdBQVgsRUFBZ0J3QixJQUFoQixDQUFxQkcsS0FBckI7QUFDQXBCLEtBQUcsQ0FBQzRCLElBQUo7QUFFSCxDQXJFRCxDOzs7Ozs7Ozs7Ozs7QUN2ZUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xudmFyIHJ1bnRpbWUgPSBmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTsgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG5cbiAgZXhwb3J0cy53cmFwID0gd3JhcDsgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7IC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307IC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cblxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9IC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cblxuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcblxuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07IC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG5cblxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAga2V5cy5yZXZlcnNlKCk7IC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuXG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cblxuXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwOyAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cblxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTsgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59KCAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufSIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIlxuaW1wb3J0IFwiLi9zdHlsZXMvcmVzZXQuc2Nzc1wiXG5pbXBvcnQgKiBhcyBwbGF5ZXJzdGF0cyBmcm9tIFwiLi9wbGF5ZXJzdGF0c1wiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkRPTSBMb2FkZWRcIik7XG5cbiAgICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzICYmIHNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlYXJjaEJhci52YWx1ZTtcbiAgICAgICAgICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAgICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgaDEudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoaDEpO1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICAgICAgbGV0IHBpY0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBwaWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2FtZXItaW1hZ2UnKTtcbiAgICAgICAgICAgIHBpY0NvbnRhaW5lci5hcHBlbmRDaGlsZChwaWMpO1xuXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBsYXllcnN0YXRzLnJlbmRlckRhdGEoYCR7cGxheWVyfWApO1xuICAgICAgICAgICAgfSwgODAwKTtcblxuXG5cbiAgICAgICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY3NTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjcy1kaXZcIik7XG4gICAgICAgICAgICBsZXQgQ1NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCI7XG4gICAgICAgICAgICBDU0hlYWRlci5jbGFzc0xpc3QuYWRkKFwiYXZlcmFnZS1jcy1oZWFkZXJcIik7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGNzU2VjdGlvbik7XG4gICAgICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoQ1NIZWFkZXIpO1xuXG5cblxuICAgICAgICAgICAgbGV0IGRhbWFnZVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgICAgIGxldCBkYW1hZ2VIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgICAgICBkYW1hZ2VIZWFkZXIudGV4dENvbnRlbnQgPSBcIlRoZSBEYW1hZ2UgSGFzIEJlZW4gRG9uZVwiXG4gICAgICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChkYW1hZ2VTZWN0aW9uKTtcbiAgICAgICAgICAgIGRhbWFnZVNlY3Rpb24uYXBwZW5kQ2hpbGQoZGFtYWdlSGVhZGVyKTtcblxuXG5cbiAgICAgICAgICAgIGxldCBnb2xkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBnb2xkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZ29sZC1kaXZcIik7XG4gICAgICAgICAgICBsZXQgZ29sZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgIGdvbGRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkNIQS1DSElORyFcIlxuICAgICAgICAgICAgZ29sZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYXZlcmFnZS1jcy1oZWFkZXJcIik7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGdvbGRTZWN0aW9uKTtcbiAgICAgICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRIZWFkZXIpO1xuXG5cbiAgICAgICAgICAgIGxldCBrZGFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGtkYVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImtkYS1kaXZcIik7XG4gICAgICAgICAgICBsZXQga2RhSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAga2RhSGVhZGVyLnRleHRDb250ZW50ID0gXCJLaWxsaW5nIE1lIFNvZnRseVwiXG4gICAgICAgICAgICBrZGFIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChrZGFTZWN0aW9uKTtcbiAgICAgICAgICAgIGtkYVNlY3Rpb24uYXBwZW5kQ2hpbGQoa2RhSGVhZGVyKTtcblxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBmYWtlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmFrZXJCdXR0b25cIilcbiAgICBmYWtlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IHNwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BsYXNoXCIpO1xuICAgICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IFwiRmFrZXJcIjtcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwaWNDb250YWluZXIpO1xuICAgICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFrZXItaW1hZ2UnKTtcbiAgICAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpYyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyc3RhdHMucmVuZGVyRGF0YShcIkZha2VyXCIpO1xuICAgICAgICB9LCA4MDApO1xuXG5cblxuXG4gICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNzLWRpdlwiKTtcbiAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCI7XG4gICAgICAgIENTSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChjc1NlY3Rpb24pO1xuICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoQ1NIZWFkZXIpO1xuXG5cblxuXG4gICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgbGV0IGRhbWFnZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGRhbWFnZVNlY3Rpb24pO1xuICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuXG4gICAgICAgIGxldCBnb2xkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJnb2xkLWRpdlwiKTtcbiAgICAgICAgbGV0IGdvbGRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGdvbGRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkNIQS1DSElORyFcIlxuICAgICAgICBnb2xkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChnb2xkU2VjdGlvbik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRIZWFkZXIpO1xuXG5cbiAgICAgICAgbGV0IGtkYVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBrZGFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJrZGEtZGl2XCIpO1xuICAgICAgICBsZXQga2RhSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBrZGFIZWFkZXIudGV4dENvbnRlbnQgPSBcIktpbGxpbmcgTWUgU29mdGx5XCJcbiAgICAgICAga2RhSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChrZGFTZWN0aW9uKTtcbiAgICAgICAga2RhU2VjdGlvbi5hcHBlbmRDaGlsZChrZGFIZWFkZXIpO1xuXG4gICAgfSlcblxuICAgIGNvbnN0IGJhbmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JhbmdCdXR0b25cIilcbiAgICBiYW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gXCJCYW5nXCI7XG4gICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JhbmctaW1hZ2UnKTtcbiAgICAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpYyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyc3RhdHMucmVuZGVyRGF0YShcIkJhbmdcIik7XG4gICAgICAgIH0sIDgwMCk7XG5cblxuXG4gICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNzLWRpdlwiKTtcbiAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCJcbiAgICAgICAgQ1NIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGNzU2VjdGlvbik7XG4gICAgICAgIGNzU2VjdGlvbi5hcHBlbmRDaGlsZChDU0hlYWRlcik7XG5cblxuXG4gICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgbGV0IGRhbWFnZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGRhbWFnZVNlY3Rpb24pO1xuICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuICAgICAgICBsZXQgZ29sZFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnb2xkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZ29sZC1kaXZcIik7XG4gICAgICAgIGxldCBnb2xkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBnb2xkSGVhZGVyLnRleHRDb250ZW50ID0gXCJDSEEtQ0hJTkchXCJcbiAgICAgICAgZ29sZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYXZlcmFnZS1jcy1oZWFkZXJcIik7XG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ29sZFNlY3Rpb24pO1xuICAgICAgICBnb2xkU2VjdGlvbi5hcHBlbmRDaGlsZChnb2xkSGVhZGVyKTtcblxuXG5cbiAgICAgICAgbGV0IGtkYVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBrZGFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJrZGEtZGl2XCIpO1xuICAgICAgICBsZXQga2RhSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBrZGFIZWFkZXIudGV4dENvbnRlbnQgPSBcIktpbGxpbmcgTWUgU29mdGx5XCJcbiAgICAgICAga2RhSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChrZGFTZWN0aW9uKTtcbiAgICAgICAga2RhU2VjdGlvbi5hcHBlbmRDaGlsZChrZGFIZWFkZXIpO1xuICAgIH0pXG5cbiAgICAvLyBjb25zdCBiamVyZ0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmplcmdCdXR0b25cIilcbiAgICAvLyBiamVyZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAvLyAgICAgbGV0IHNwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BsYXNoXCIpO1xuICAgIC8vICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgLy8gICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIC8vICAgICBoMS50ZXh0Q29udGVudCA9IFwiQmplcmdzZW5cIjtcbiAgICAvLyAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgLy8gICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgIC8vICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAvLyAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAvLyAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgLy8gICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAvLyAgICAgcGFnZS5hcHBlbmRDaGlsZChwaWNDb250YWluZXIpO1xuICAgIC8vICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYmplcmctaW1hZ2UnKTtcbiAgICAvLyAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpYyk7XG4gICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgICAgcGxheWVyc3RhdHMucmVuZGVyRGF0YShcIkJqZXJnc2VuXCIpO1xuICAgIC8vICAgICB9LCA1MCk7XG5cbiAgICAvLyB9KVxuXG4gICAgY29uc3QgamVuc2VuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqZW5zZW5CdXR0b25cIilcbiAgICAgICAgamVuc2VuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gXCJKZW5zZW5cIjtcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwaWNDb250YWluZXIpO1xuICAgICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnamVuc2VuLWltYWdlJyk7XG4gICAgICAgIHBpY0NvbnRhaW5lci5hcHBlbmRDaGlsZChwaWMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHBsYXllcnN0YXRzLnJlbmRlckRhdGEoXCJKZW5zZW5cIik7XG4gICAgICAgIH0sIDgwMCk7XG4gICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNzLWRpdlwiKTtcbiAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCJcbiAgICAgICAgQ1NIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGNzU2VjdGlvbik7XG4gICAgICAgIGNzU2VjdGlvbi5hcHBlbmRDaGlsZChDU0hlYWRlcik7XG4gICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgbGV0IGRhbWFnZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGRhbWFnZVNlY3Rpb24pO1xuICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuXG5cbiAgICAgICAgbGV0IGdvbGRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ29sZFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImdvbGQtZGl2XCIpO1xuICAgICAgICBsZXQgZ29sZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZ29sZEhlYWRlci50ZXh0Q29udGVudCA9IFwiQ0hBLUNISU5HIVwiXG4gICAgICAgIGdvbGRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGdvbGRTZWN0aW9uKTtcbiAgICAgICAgZ29sZFNlY3Rpb24uYXBwZW5kQ2hpbGQoZ29sZEhlYWRlcik7XG5cblxuXG5cbiAgICAgICAgbGV0IGtkYVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBrZGFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJrZGEtZGl2XCIpO1xuICAgICAgICBsZXQga2RhSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBrZGFIZWFkZXIudGV4dENvbnRlbnQgPSBcIktpbGxpbmcgTWUgU29mdGx5XCJcbiAgICAgICAga2RhSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChrZGFTZWN0aW9uKTtcbiAgICAgICAga2RhU2VjdGlvbi5hcHBlbmRDaGlsZChrZGFIZWFkZXIpO1xuICAgIH0pXG5cbn0pOyAgICAiLCJjb25zdCByZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcblxuLy8gcHJpbnRzIGFsbCB0aGUgbWF0Y2hlcyBpbiB0aGUgY3N2XG4vLyBleHBvcnQgY29uc3QgcmVzdWx0cyA9IGQzLmNzdignLi4vZGF0YS8yMDIxX01hdGNoX0RhdGEuY3N2Jylcbi8vIC50aGVuKCAocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHRbMF0ucGxheWVyKSlcblxuXG5cbi8vIHJldHVybnMgYWxsIHRoZSBtYXRjaGVzIGZvciBhIHNpbmdsZSBwbGF5ZXJcbmV4cG9ydCBjb25zdCBmaWx0ZXJCeVBsYXllciA9IChwbGF5ZXJOYW1lKSA9PiBkMy5jc3YoJy4uL2RhdGEvMjAyMV9NYXRjaF9EYXRhLmNzdicpXG4udGhlbiggKHJlc3VsdCkgPT4geyAgICBcbiAgICBsZXQgZmlsdGVyZWRSZXN1bHRcbiAgICBmaWx0ZXJlZFJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoIGdhbWUgPT4gZ2FtZS5wbGF5ZXIudG9Mb3dlckNhc2UoKSA9PT0gcGxheWVyTmFtZS50b0xvd2VyQ2FzZSgpKVxuICAgIHJldHVybiBmaWx0ZXJlZFJlc3VsdFxufVxuXG4pXG5cbi8vIHJldHVybnMgYWxsIHRoZSBwbGF5ZXIncyBjaGFtcGlvbnMgcGxheWVkXG5cbmV4cG9ydCBjb25zdCBjaGFtcHNQbGF5ZWQgPSAocGxheWVyTmFtZSkgPT4geyAgIFxuICAgIGZpbHRlckJ5UGxheWVyKHBsYXllck5hbWUpXG4gICAgLnRoZW4gKCAoZ2FtZXMpID0+IHtcbiAgICAgICAgbGV0IGNoYW1wcyA9IFtdO1xuICAgICAgICBnYW1lcy5mb3JFYWNoKGdhbWUgPT4ge1xuICAgICAgICAgICAgY2hhbXBzLnB1c2goZ2FtZS5jaGFtcGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hhbXBzO1xuICAgIH0pO1xufVxuXG5cbi8vIGNyZWF0ZXMgaXQgYWxsIHJlYWxseVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRGF0YShwbGF5ZXJOYW1lKSB7XG4gICAgbGV0IGNoYW1wQ291bnQgPSB7fTtcblxuICAgIGZpbHRlckJ5UGxheWVyKHBsYXllck5hbWUpXG4gICAgLnRoZW4gKCAoZ2FtZXMpID0+IHtcbiAgICAgICAgbGV0IGNoYW1wcyA9IFtdO1xuICAgICAgICBsZXQgYmVzdENTR2FtZXMgPSBbXTtcbiAgICAgICAgbGV0IGRhbWFnZVRha2VuID0gW107XG4gICAgICAgIGxldCBkYW1hZ2VHaXZlbiA9IFtdO1xuICAgICAgICBsZXQgZ29sZEdhbWVzID0gW107XG4gICAgICAgIGxldCB0b3RhbEtpbGxzID0gW107XG4gICAgICAgIGxldCB0b3RhbEFzc2lzdHMgPSBbXTtcbiAgICAgICAgbGV0IHRvdGFsRGVhdGhzID0gW107XG4gICAgICAgIFxuICAgICAgICBpZiAoIWdhbWVzLmxlbmd0aCl7XG4gICAgICAgICAgICBjb25zdCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBpYy1jb250YWluZXJcIik7XG4gICAgICAgICAgICBjb25zdCBub0V4aXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgbm9FeGlzdC50ZXh0Q29udGVudCA9IFwiVW5mb3J0dW5hdGVseSwgd2UgZG8gbm90IGhhdmUgZGF0YSBvbiB0aGlzIHBsYXllci4gT3VyIGRhdGFzZXQgaXMgbGltaXRlZCB0byBwcm9mZXNzaW9uYWwgcGxheWVycyBpbiB0aGUgMjAyMSBzZWFzb24gZnJvbSBKYW51YXJ5IHRvIEFwcmlsLlwiO1xuICAgICAgICAgICAgbm9FeGlzdC5jbGFzc0xpc3QuYWRkKFwibm8tZXhpc3QtaGVhZGVyXCIpO1xuICAgICAgICAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKG5vRXhpc3QpO1xuICAgICAgICB9IGVsc2V7XG5cblxuICAgICAgICBcbiAgICAgICAgZ2FtZXMuZm9yRWFjaChnYW1lID0+IHtcbiAgICAgICAgICAgIGNoYW1wcy5wdXNoKGdhbWUuY2hhbXBpb24pO1xuICAgICAgICAgICAgYmVzdENTR2FtZXMucHVzaChnYW1lLnRvdGFsY3MpO1xuICAgICAgICAgICAgZGFtYWdlVGFrZW4ucHVzaChnYW1lLmRhbWFnZXRha2VucGVybWludXRlKTtcbiAgICAgICAgICAgIGRhbWFnZUdpdmVuLnB1c2goZ2FtZS5kcG0pO1xuICAgICAgICAgICAgZ29sZEdhbWVzLnB1c2goZ2FtZS5lYXJuZWRnb2xkKTtcbiAgICAgICAgICAgIHRvdGFsS2lsbHMucHVzaChnYW1lLmtpbGxzKTtcbiAgICAgICAgICAgIHRvdGFsQXNzaXN0cy5wdXNoKGdhbWUuYXNzaXN0cyk7XG4gICAgICAgICAgICB0b3RhbERlYXRocy5wdXNoKGdhbWUuZGVhdGhzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNoYW1wcy5mb3JFYWNoKGNoYW1wID0+IHtcbiAgICAgICAgICAgIGlmICghY2hhbXBDb3VudFtjaGFtcF0pe1xuICAgICAgICAgICAgICAgIGNoYW1wQ291bnRbY2hhbXBdID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhbXBDb3VudFtjaGFtcF0rKztcbiAgICAgICAgfSlcbiAgICAgICAgY3JlYXRlRmF2b3JpdGVDaGFtcHMoY2hhbXBDb3VudCwgcGxheWVyTmFtZSk7XG5cblxuICAgICAgICBsZXQgYXZlcmFnZUNTID0gZDMubWVhbihiZXN0Q1NHYW1lcyk7XG4gICAgICAgIGNyZWF0ZU1pbmlvbnNPYnNlcnZlcihwbGF5ZXJOYW1lLCBhdmVyYWdlQ1MpXG4gICAgICAgIC8vIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNzLWRpdlwiKTtcbiAgICAgICAgLy8gbGV0IGNzU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgLy8gY3NTdGF0LmlubmVySFRNTCA9IGAke3BsYXllck5hbWV9IHN1cmUgbG92ZXMgdG8gbWVzcyB1cCB0aG9zZSBtaW5pb25zLiBUaGV5IHVzdWFsbHkgaGF2ZSBhbiBhdmVyYWdlIENTIG9mIDxzcGFuIHN0eWxlPVwiY29sb3I6I2NjMDAwMFwiPiR7YXZlcmFnZUNTfTwvc3Bhbj4gYnkgdGhlIGVuZCBvZiB0aGUgZ2FtZSFgO1xuICAgICAgICAvLyBjc1N0YXQuY2xhc3NMaXN0LmFkZChcImNzU3RhdFwiKVxuICAgICAgICAvLyBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoY3NTdGF0KTtcbiAgICAgICAgLy8gbGV0IG1pbmlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy8gbWluaW9uRGl2LmNsYXNzTGlzdC5hZGQoXCJtaW5pb24tZGl2XCIpO1xuICAgICAgICAvLyBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQobWluaW9uRGl2KTtcblxuICAgICAgICBsZXQgYXZlcmFnZUdpdmVuID0gZDMubWVhbihkYW1hZ2VHaXZlbik7XG4gICAgICAgIGxldCBhdmVyYWdlVGFrZW4gPSBkMy5tZWFuKGRhbWFnZVRha2VuKTtcbiAgICAgICAgbGV0IGRtZ0dpdmVuID0ge25hbWU6IFwiQXZlcmFnZSBETUcgR2l2ZW4gcGVyIG1pbnV0ZVwiLCBhbW91bnQ6IGF2ZXJhZ2VHaXZlbn1cbiAgICAgICAgbGV0IGRtZ1Rha2VuID0ge25hbWU6IFwiQXZlcmFnZSBETUcgVGFrZW4gcGVyIG1pbnV0ZVwiLCBhbW91bnQ6IGF2ZXJhZ2VUYWtlbn1cbiAgICAgICAgbGV0IGRtZ0RhdGEgPSBbZG1nR2l2ZW4sIGRtZ1Rha2VuXVxuXG4gICAgICAgIGNyZWF0ZURtZ09ic2VydmVyKGRtZ0RhdGEsIHBsYXllck5hbWUpO1xuICAgICAgICAvLyBjcmVhdGVEbWcoZG1nRGF0YSwgcGxheWVyTmFtZSk7XG5cbiAgICAgICAgbGV0IGF2ZXJhZ2VHb2xkID0gZDMubWVhbihnb2xkR2FtZXMpO1xuICAgICAgICBjcmVhdGVHb2xkT2JzZXJ2ZXIoYXZlcmFnZUdvbGQsIHBsYXllck5hbWUpXG5cbiAgICAgICAgbGV0IHRvdGFsS2lsbENvdW50ID0gZDMuc3VtKHRvdGFsS2lsbHMpO1xuICAgICAgICBsZXQgdG90YWxBc3Npc3RDb3VudCA9IGQzLnN1bSh0b3RhbEFzc2lzdHMpO1xuICAgICAgICBsZXQgdG90YWxEZWF0aENvdW50ID0gZDMuc3VtKHRvdGFsRGVhdGhzKTtcbiAgICAgICAgbGV0IHRvdGFsS2lsbERhdGEgPSB7bmFtZTogXCJLaWxsc1wiLCBhbW91bnQ6IHRvdGFsS2lsbENvdW50fTtcbiAgICAgICAgbGV0IHRvdGFsQXNzaXN0RGF0YSA9IHtuYW1lOiBcIkFzc2lzdHNcIiwgYW1vdW50OiB0b3RhbEFzc2lzdENvdW50fTtcbiAgICAgICAgbGV0IHRvdGFsRGVhdGhEYXRhID0ge25hbWU6IFwiRGVhdGhzXCIsIGFtb3VudDogdG90YWxEZWF0aENvdW50fTtcbiAgICAgICAgbGV0IHRvdGFsS0RBRGF0YSA9IFt0b3RhbEtpbGxEYXRhLCB0b3RhbEFzc2lzdERhdGEsIHRvdGFsRGVhdGhEYXRhXTtcblxuICAgICAgICBjcmVhdGVLREFPYnNlcnZlcih0b3RhbEtEQURhdGEsIHBsYXllck5hbWUpO1xuXG5cbiAgICB9fSk7XG59XG5cblxuY29uc3QgY3JlYXRlTWluaW9ucyA9IChwbGF5ZXJOYW1lLCBhdmVyYWdlQ1MpID0+IHtcbiAgICBsZXQgY3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcy1kaXZcIik7XG4gICAgbGV0IGNzU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgY3NTdGF0LmlubmVySFRNTCA9IGAke3BsYXllck5hbWV9IHN1cmUgbG92ZXMgdG8gbWVzcyB1cCB0aG9zZSBtaW5pb25zLiBUaGV5IHVzdWFsbHkgaGF2ZSBhbiBhdmVyYWdlIENTIG9mIDxzcGFuIHN0eWxlPVwiY29sb3I6I2NjMDAwMFwiPiR7YXZlcmFnZUNTfTwvc3Bhbj4gYnkgdGhlIGVuZCBvZiB0aGUgZ2FtZSFgO1xuICAgICAgICBjc1N0YXQuY2xhc3NMaXN0LmFkZChcImNzU3RhdFwiKVxuICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoY3NTdGF0KTtcbiAgICAgICAgbGV0IG1pbmlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgbWluaW9uRGl2LmNsYXNzTGlzdC5hZGQoXCJtaW5pb24tZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQobWluaW9uRGl2KTtcbn1cblxuY29uc3QgY3JlYXRlTWluaW9uc09ic2VydmVyID0gKHBsYXllck5hbWUsIGF2ZXJhZ2VDUykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgdGhyZXNob2xkOiAwLjlcbiAgICB9XG5cbiAgICBsZXQgcmVuZGVyQ291bnRlciA9IDA7XG5cbiAgICBsZXQgaGFuZGxlSW50ZXJzZWN0ID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAvLyBFYWNoIGVudHJ5IGRlc2NyaWJlcyBhbiBpbnRlcnNlY3Rpb24gY2hhbmdlIGZvciBvbmUgb2JzZXJ2ZWRcbiAgICAgICAgICAgIC8vIHRhcmdldCBlbGVtZW50OlxuICAgICAgICAgICAgLy8gICBlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgICAgIC8vICAgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW9cbiAgICAgICAgICAgIC8vICAgZW50cnkuaW50ZXJzZWN0aW9uUmVjdFxuICAgICAgICAgICAgLy8gICBlbnRyeS5pc0ludGVyc2VjdGluZ1xuICAgICAgICAgICAgLy8gICBlbnRyeS5yb290Qm91bmRzXG4gICAgICAgICAgICAvLyAgIGVudHJ5LnRhcmdldFxuICAgICAgICAgICAgLy8gICBlbnRyeS50aW1lXG4gICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgcmVuZGVyQ291bnRlciA9PT0gMCl7XG4gICAgICAgICAgICAgICAgY3JlYXRlTWluaW9ucyhwbGF5ZXJOYW1lLCBhdmVyYWdlQ1MpO1xuICAgICAgICAgICAgICAgIHJlbmRlckNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVJbnRlcnNlY3QsIG9wdGlvbnMpO1xuICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNzLWRpdlwiKTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUoY3NTZWN0aW9uKTtcblxufVxuXG5cbmNvbnN0IGNyZWF0ZUdvbGQgPSAocGxheWVyTmFtZSwgYXZlcmFnZUdvbGQpID0+IHtcbiAgICBsZXQgZ29sZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvbGQtZGl2XCIpO1xuICAgIGxldCBnb2xkU3RhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZ29sZFN0YXQuaW5uZXJIVE1MID0gYCR7cGxheWVyTmFtZX0gaXMgcXVpdGUgY2VydGFpbmx5IGdldHRpbmcgdGhhdCBicmVhZC4gVGhleSBlbmQgdXAgZWFybmluZyBhbiBhdmVyYWdlIG9mIDxzcGFuIHN0eWxlPVwiY29sb3I6I2ZmZDczNlwiPiR7YXZlcmFnZUdvbGR9PC9zcGFuPiBnb2xkIGVhY2ggZ2FtZSFgO1xuICAgICAgICBnb2xkU3RhdC5jbGFzc0xpc3QuYWRkKFwiZ29sZFN0YXRcIilcbiAgICAgICAgZ29sZFNlY3Rpb24uYXBwZW5kQ2hpbGQoZ29sZFN0YXQpO1xuICAgICAgICBsZXQgZ29sZFBpY0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZ29sZFBpY0Rpdi5jbGFzc0xpc3QuYWRkKFwiZ29sZC1waWMtZGl2XCIpXG4gICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRQaWNEaXYpO1xuICAgICAgICBsZXQgZ29sZFBpYzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGdvbGRQaWMxLmNsYXNzTGlzdC5hZGQoXCJnb2xkLXBpYzFcIik7XG4gICAgICAgIGdvbGRQaWNEaXYuYXBwZW5kQ2hpbGQoZ29sZFBpYzEpO1xuICAgICAgICBsZXQgZ29sZFBpYzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGdvbGRQaWMyLmNsYXNzTGlzdC5hZGQoXCJnb2xkLXBpYzJcIik7XG4gICAgICAgIGdvbGRQaWNEaXYuYXBwZW5kQ2hpbGQoZ29sZFBpYzIpO1xufVxuXG5jb25zdCBjcmVhdGVHb2xkT2JzZXJ2ZXIgPSAoYXZlcmFnZUdvbGQsIHBsYXllck5hbWUpID0+IHtcblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgdGhyZXNob2xkOiAwLjVcbiAgICB9XG5cbiAgICBsZXQgcmVuZGVyQ291bnRlciA9IDA7XG5cblxuXG4gICAgbGV0IGhhbmRsZUludGVyc2VjdCA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgLy8gRWFjaCBlbnRyeSBkZXNjcmliZXMgYW4gaW50ZXJzZWN0aW9uIGNoYW5nZSBmb3Igb25lIG9ic2VydmVkXG4gICAgICAgICAgICAvLyB0YXJnZXQgZWxlbWVudDpcbiAgICAgICAgICAgIC8vICAgZW50cnkuYm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvXG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJlY3RcbiAgICAgICAgICAgIC8vICAgZW50cnkuaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgICAgIC8vICAgZW50cnkucm9vdEJvdW5kc1xuICAgICAgICAgICAgLy8gICBlbnRyeS50YXJnZXRcbiAgICAgICAgICAgIC8vICAgZW50cnkudGltZVxuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIHJlbmRlckNvdW50ZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBnb2xkQW5pbWF0ZSgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlR29sZChwbGF5ZXJOYW1lLCBhdmVyYWdlR29sZCk7XG5cbiAgICAgICAgICAgICAgICB9LCAxNTAwKVxuICAgICAgICAgICAgICAgIHJlbmRlckNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVJbnRlcnNlY3QsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGdvbGRUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29sZC1kaXYnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGdvbGRUYXJnZXQpO1xuXG59XG5cbmNvbnN0IGdvbGRBbmltYXRlID0gKCkgPT4ge1xuICAgIGxldCBnb2xkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2xkLWRpdlwiKVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDc1OyBpbmRleCsrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBjb2luLmNsYXNzTGlzdC5hZGQoXCJjb2luXCIpO1xuICAgICAgICAgICAgY29pbi5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgICAgIGNvaW4uc3R5bGUubWFyZ2luTGVmdCA9IGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxICsgJyUnfSBgXG4gICAgICAgICAgICBjb2luLnN0eWxlLm1hcmdpblJpZ2h0ID0gYCR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEgKyAnJSd9YFxuICAgICAgICAgICAgY29pbi5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCkgKyAxICsgJyUnfWBcbiAgICAgICAgICAgIGdvbGREaXYuYXBwZW5kQ2hpbGQoY29pbik7XG4gICAgICAgIH0sIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCkgKyAxKSlcbiAgICB9XG4gICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICBsZXQgY29pbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvaW5cIik7XG4gICAgICAgIGNvaW5zLmZvckVhY2goIGNvaW4gPT4gY29pbi5yZW1vdmUoKSk7XG5cbiAgICB9LCAyMDAwKVxufVxuXG5cblxuXG5jb25zdCBjcmVhdGVEbWdPYnNlcnZlciA9IChkbWdEYXRhLCBwbGF5ZXJOYW1lKSA9PiB7XG5cblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgdGhyZXNob2xkOiAwLjlcbiAgICB9XG5cbiAgICBsZXQgcmVuZGVyQ291bnRlciA9IDA7XG5cblxuXG4gICAgbGV0IGhhbmRsZUludGVyc2VjdCA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgLy8gRWFjaCBlbnRyeSBkZXNjcmliZXMgYW4gaW50ZXJzZWN0aW9uIGNoYW5nZSBmb3Igb25lIG9ic2VydmVkXG4gICAgICAgICAgICAvLyB0YXJnZXQgZWxlbWVudDpcbiAgICAgICAgICAgIC8vICAgZW50cnkuYm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvXG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJlY3RcbiAgICAgICAgICAgIC8vICAgZW50cnkuaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgICAgIC8vICAgZW50cnkucm9vdEJvdW5kc1xuICAgICAgICAgICAgLy8gICBlbnRyeS50YXJnZXRcbiAgICAgICAgICAgIC8vICAgZW50cnkudGltZVxuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIHJlbmRlckNvdW50ZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVEbWcoZG1nRGF0YSwgcGxheWVyTmFtZSk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ291bnRlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUludGVyc2VjdCwgb3B0aW9ucyk7XG5cbiAgICBsZXQgZGFtYWdlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhbWFnZS1kaXYnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRhbWFnZVRhcmdldCk7XG5cblxufVxuXG5cblxuY29uc3QgY3JlYXRlS0RBT2JzZXJ2ZXIgPSAoa2RhRGF0YSwgcGxheWVyTmFtZSkgPT4ge1xuXG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICByb290OiBudWxsLFxuICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgIHRocmVzaG9sZDogMC45XG4gICAgfVxuXG4gICAgbGV0IHJlbmRlckNvdW50ZXIgPSAwO1xuXG5cblxuICAgIGxldCBoYW5kbGVJbnRlcnNlY3QgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIC8vIEVhY2ggZW50cnkgZGVzY3JpYmVzIGFuIGludGVyc2VjdGlvbiBjaGFuZ2UgZm9yIG9uZSBvYnNlcnZlZFxuICAgICAgICAgICAgLy8gdGFyZ2V0IGVsZW1lbnQ6XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdFxuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpb1xuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmlzSW50ZXJzZWN0aW5nXG4gICAgICAgICAgICAvLyAgIGVudHJ5LnJvb3RCb3VuZHNcbiAgICAgICAgICAgIC8vICAgZW50cnkudGFyZ2V0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LnRpbWVcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiByZW5kZXJDb3VudGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlS0RBKGtkYURhdGEsIHBsYXllck5hbWUpO1xuICAgICAgICAgICAgICAgIHJlbmRlckNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVJbnRlcnNlY3QsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGtkYVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZGEtZGl2Jyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShrZGFUYXJnZXQpO1xuXG5cbn1cblxuXG5cblxuLy8gYWN0dWFsIGNoYXJ0IGNyZWF0aW9uXG5cbmNvbnN0IGNyZWF0ZUZhdm9yaXRlQ2hhbXBzID0gKGRhdGEsIHBsYXllck5hbWUpID0+IHtcbiAgICBsZXQgY2hhbXBBcnIgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGNoYW1waW9uID0+IHtcbiAgICAgICAgbGV0IGNoYW1wT2JqID0ge2NoYW1wTmFtZTogY2hhbXBpb24sIHRpbWVzUGxheWVkOiBkYXRhW2NoYW1waW9uXX07XG4gICAgICAgIGNoYW1wQXJyLnB1c2goIGNoYW1wT2JqIClcbiAgICB9KTtcbiAgICBjaGFtcEFyciA9IGNoYW1wQXJyLnNvcnQoKGEsYikgPT4gZDMuZGVzY2VuZGluZyhhLnRpbWVzUGxheWVkLCBiLnRpbWVzUGxheWVkKSkuc2xpY2UoMCw1KVxuICAgIGNvbnN0IHBpY0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGljLWNvbnRhaW5lclwiKTtcbiAgICBsZXQgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIHN2Z0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NoYW1wcy1ncmFwaC1jb250YWluZXInKTtcbiAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKTtcbiAgICBsZXQgcGxheWVkQ2hhbXBzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIHBsYXllZENoYW1wc0hlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllck5hbWV9J3MgRmF2b3JpdGUgQ2hhbXBpb25zYDtcbiAgICBwbGF5ZWRDaGFtcHNIZWFkZXIuY2xhc3NMaXN0LmFkZChcInBsYXllZC1jaGFtcHMtaGVhZGVyXCIpXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZChwbGF5ZWRDaGFtcHNIZWFkZXIpO1xuXG5cbiAgICBjb25zdCB3aWR0aCA9IDEwMDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNTAwO1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiA1MCwgYm90dG9tOiA1MCwgbGVmdDogNTAsIHJpZ2h0OiA1MH07XG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoJy5jaGFtcHMtZ3JhcGgtY29udGFpbmVyJylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0KVxuICAgICAgICAuYXR0cigndmlld0JveCcsIFswLCAwLCB3aWR0aCwgaGVpZ2h0XSk7XG5cbiAgICBjb25zdCB4ID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgLmRvbWFpbihkMy5yYW5nZShjaGFtcEFyci5sZW5ndGgpKVxuICAgICAgICAucmFuZ2UoW21hcmdpbi5sZWZ0LCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pXG4gICAgICAgIC5wYWRkaW5nKDAuMSk7XG5cbiAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAyMF0pXG4gICAgICAgIC5yYW5nZShbaGVpZ2h0IC0gbWFyZ2luLmJvdHRvbSwgbWFyZ2luLnRvcF0pO1xuXG4gICAgc3ZnXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignZmlsbCcsICdyb3lhbGJsdWUnKVxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgICAgLmRhdGEoY2hhbXBBcnIuc29ydCgoYSxiKSA9PiBkMy5kZXNjZW5kaW5nKGEudGltZXNQbGF5ZWQsIGIudGltZXNQbGF5ZWQpKSlcbiAgICAgICAgLmpvaW4oJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4geChpKSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgKGQpID0+IHkoMCkpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZCA9PiB5KDApIC0geSgwKSlcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHguYmFuZHdpZHRoKCkpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZmF2b3JpdGUtY2hhbXAtcmVjdCcpXG5cbiAgICBmdW5jdGlvbiB4QXhpcyhnKSB7XG4gICAgICAgIGcuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke2hlaWdodCAtIG1hcmdpbi5ib3R0b219KWApXG4gICAgICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeCkudGlja0Zvcm1hdChpID0+IGNoYW1wQXJyW2ldLmNoYW1wTmFtZSkpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMjBweCcpXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB5QXhpcyhnKSB7XG4gICAgICAgIGcuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSksIDApYClcbiAgICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeSkudGlja3MobnVsbCwgZGF0YS5mb3JtYXQpKVxuICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzIwcHgnKVxuICAgIH1cblxuICAgIHZhciBkaXYgPSBkMy5zZWxlY3QoXCJmYXZvcml0ZS1jaGFtcC1yZWN0XCIpLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidG9vbHRpcFwiKVxuICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblxuXG4gICAgICBzdmcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDAgLSBtYXJnaW4ubGVmdClcbiAgICAgIC5hdHRyKFwieFwiLDAgLSAoaGVpZ2h0IC8gMikpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjAwNmVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXCJUaW1lcyBQbGF5ZWQgMjAyMSBTZWFzb25cIik7IFxuXG4gICAgc3ZnLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geShkLnRpbWVzUGxheWVkKTsgfSlcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geSgwKSAtIHkoZC50aW1lc1BsYXllZCk7IH0pXG5cbiAgICBzdmcuYXBwZW5kKCdnJykuY2FsbCh4QXhpcyk7XG4gICAgc3ZnLmFwcGVuZCgnZycpLmNhbGwoeUF4aXMpO1xuICAgIHN2Zy5ub2RlKCk7XG5cbn1cblxuXG5cbmNvbnN0IGNyZWF0ZURtZyA9IChkYXRhLCBwbGF5ZXJOYW1lKSA9PiB7XG5cbiAgICBjb25zdCBkYW1hZ2VEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhbWFnZS1kaXZcIik7XG4gICAgbGV0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBzdmdDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkYW1hZ2UtZ3JhcGgtY29udGFpbmVyJyk7XG4gICAgZGFtYWdlRGl2LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcik7XG4gICAgbGV0IGRhbWFnZUdyYXBoSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGRhbWFnZUdyYXBoSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyTmFtZX0gdGFrZXRoIGRhbWFnZSBhcyB0aGV5IGdpdmV0aGA7XG4gICAgZGFtYWdlR3JhcGhIZWFkZXIuY2xhc3NMaXN0LmFkZChcImRhbWFnZS1ncmFwaC1oZWFkZXJcIilcbiAgICBzdmdDb250YWluZXIuYXBwZW5kKGRhbWFnZUdyYXBoSGVhZGVyKTtcblxuXG4gICAgY29uc3Qgd2lkdGggPSAxMDAwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNTAsIGJvdHRvbTogNTAsIGxlZnQ6IDUwLCByaWdodDogNTB9O1xuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcuZGFtYWdlLWRpdicpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodClcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuXG4gICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4oZDMucmFuZ2UoMikpXG4gICAgICAgIC5yYW5nZShbbWFyZ2luLmxlZnQsIHdpZHRoIC0gbWFyZ2luLnJpZ2h0XSlcbiAgICAgICAgLnBhZGRpbmcoMC4xKTtcblxuICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIDEwMDBdKVxuICAgICAgICAucmFuZ2UoW2hlaWdodCAtIG1hcmdpbi5ib3R0b20sIG1hcmdpbi50b3BdKTtcblxuICAgIHN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgIC5qb2luKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgICAgICAuYXR0cigneScsIChkKSA9PiB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geSgwKSAtIHkoMCkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgKGQsIGkpICA9PiBgZGFtYWdlLXJlY3QtJHtkLm5hbWV9YClcblxuICAgIGZ1bmN0aW9uIHhBeGlzKGcpIHtcbiAgICAgICAgZy5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7aGVpZ2h0IC0gbWFyZ2luLmJvdHRvbX0pYClcbiAgICAgICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KS50aWNrRm9ybWF0KGkgPT4gZGF0YVtpXS5uYW1lKSlcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyMHB4JylcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHlBeGlzKGcpIHtcbiAgICAgICAgZy5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9KSwgMClgKVxuICAgICAgICAuY2FsbChkMy5heGlzTGVmdCh5KS50aWNrcyhudWxsLCBkYXRhLmZvcm1hdCkpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMjBweCcpXG4gICAgfVxuXG4gICAgXG5cbiAgICBzdmcuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geShkLmFtb3VudCk7IH0pXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoMCkgLSB5KGQuYW1vdW50KTsgfSlcblxuICAgIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKHhBeGlzKTtcbiAgICBzdmcuYXBwZW5kKCdnJykuY2FsbCh5QXhpcyk7XG4gICAgc3ZnLm5vZGUoKTtcblxufVxuXG5cbmNvbnN0IGNyZWF0ZUtEQSA9IChkYXRhLCBwbGF5ZXJOYW1lKSA9PiB7XG5cbiAgICBjb25zdCBrZGFEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmtkYS1kaXZcIik7XG4gICAgbGV0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBzdmdDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrZGEtZ3JhcGgtY29udGFpbmVyJyk7XG4gICAga2RhRGl2LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcik7XG4gICAgbGV0IGtkYUdyYXBoSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGtkYUdyYXBoSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyTmFtZX0ncyB0b3RhbCBraWxscywgZGVhdGhzLCBhbmQgYXNzaXN0cyB0aGlzIHNlYXNvbmA7XG4gICAga2RhR3JhcGhIZWFkZXIuY2xhc3NMaXN0LmFkZChcImtkYS1ncmFwaC1oZWFkZXJcIilcbiAgICBzdmdDb250YWluZXIuYXBwZW5kKGtkYUdyYXBoSGVhZGVyKTtcblxuXG4gICAgY29uc3Qgd2lkdGggPSAxMDAwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNTAsIGJvdHRvbTogNTAsIGxlZnQ6IDUwLCByaWdodDogNTB9O1xuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcua2RhLWRpdicpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodClcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuXG4gICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4oZDMucmFuZ2UoMykpXG4gICAgICAgIC5yYW5nZShbbWFyZ2luLmxlZnQsIHdpZHRoIC0gbWFyZ2luLnJpZ2h0XSlcbiAgICAgICAgLnBhZGRpbmcoMC4xKTtcblxuICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIDI1MF0pXG4gICAgICAgIC5yYW5nZShbaGVpZ2h0IC0gbWFyZ2luLmJvdHRvbSwgbWFyZ2luLnRvcF0pO1xuXG4gICAgc3ZnXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAvLyAuYXR0cignZmlsbCcsICdkYXJrcmVkJylcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgIC5qb2luKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgICAgICAuYXR0cigneScsIChkKSA9PiB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geSgwKSAtIHkoMCkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgKGQsIGkpICA9PiBga2RhLXJlY3QtJHtkLm5hbWV9YClcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2JsdWUnKVxuXG4gICAgZnVuY3Rpb24geEF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHQgLSBtYXJnaW4uYm90dG9tfSlgKVxuICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpLnRpY2tGb3JtYXQoaSA9PiBkYXRhW2ldLm5hbWUpKVxuICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzIwcHgnKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24geUF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0pLCAwKWApXG4gICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHkpLnRpY2tzKG51bGwsIGRhdGEuZm9ybWF0KSlcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyMHB4JylcbiAgICB9XG5cbiAgICBcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiB5KGQuYW1vdW50KTsgfSlcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geSgwKSAtIHkoZC5hbW91bnQpOyB9KVxuXG4gICAgc3ZnLmFwcGVuZCgnZycpLmNhbGwoeEF4aXMpO1xuICAgIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKHlBeGlzKTtcbiAgICBzdmcubm9kZSgpO1xuXG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9