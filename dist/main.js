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
    var coin = document.createElement("span");
    coin.classList.add("coin");
    coin.style.top = "0";
    coin.style.marginLeft = "".concat(Math.floor(Math.random() * 100) + 1 + '%', " ");
    coin.style.marginRight = "".concat(Math.floor(Math.random() * 100) + 1 + '%');
    coin.style.marginTop = "".concat(Math.floor(Math.random() * 50) + 1 + '%');
    goldDiv.appendChild(coin);
  } // let coin1 = document.createElement("span");
  // let coin2 = document.createElement("h1");
  // let coin3 = document.createElement("h1");
  // let coin4 = document.createElement("h1");
  // let coin5 = document.createElement("h1");
  // let coin6 = document.createElement("h1");
  // let coin7 = document.createElement("h1");
  // let coins = [coin1, coin2, coin3, coin4, coin5, coin6, coin7]
  // coins.forEach( coin => {
  //     coin.classList.add("coin");
  //     coin.style.top = "0";
  //     coin.style.marginLeft = `${Math.floor(Math.random() * 100) + 1 + '%'} `
  //     coin.style.marginRight = `${Math.floor(Math.random() * 100) + 1 + '%'}`
  //     goldDiv.appendChild(coin);
  // })


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
  svg.append('g').attr('fill', 'darkred').selectAll('rect').data(data.sort(function (a, b) {
    return d3.descending(a.amount, b.amount);
  })).join('rect').attr('x', function (d, i) {
    return x(i);
  }).attr('y', function (d) {
    return y(0);
  }).attr('height', function (d) {
    return y(0) - y(0);
  }).attr('width', x.bandwidth()).attr('class', 'damage-rect');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcnN0YXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LnNjc3MiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInNlYXJjaEJhciIsInF1ZXJ5U2VsZWN0b3IiLCJlIiwia2V5Q29kZSIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJwbGF5ZXIiLCJzcGxhc2giLCJyZW1vdmUiLCJoMSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRvVXBwZXJDYXNlIiwic2V0QXR0cmlidXRlIiwicGFnZSIsImFwcGVuZENoaWxkIiwiYm9keSIsImNsYXNzTGlzdCIsImFkZCIsInBpY0NvbnRhaW5lciIsInBpYyIsInNldFRpbWVvdXQiLCJwbGF5ZXJzdGF0cyIsImNzU2VjdGlvbiIsIkNTSGVhZGVyIiwiZGFtYWdlU2VjdGlvbiIsImRhbWFnZUhlYWRlciIsImdvbGRTZWN0aW9uIiwiZ29sZEhlYWRlciIsImZha2VyQnV0dG9uIiwiYmFuZ0J1dHRvbiIsImplbnNlbkJ1dHRvbiIsInJlZ2VuZXJhdG9yUnVudGltZSIsInJlcXVpcmUiLCJmaWx0ZXJCeVBsYXllciIsInBsYXllck5hbWUiLCJkMyIsImNzdiIsInRoZW4iLCJyZXN1bHQiLCJmaWx0ZXJlZFJlc3VsdCIsImZpbHRlciIsImdhbWUiLCJ0b0xvd2VyQ2FzZSIsImNoYW1wc1BsYXllZCIsImdhbWVzIiwiY2hhbXBzIiwiZm9yRWFjaCIsInB1c2giLCJjaGFtcGlvbiIsInJlbmRlckRhdGEiLCJjaGFtcENvdW50IiwiYmVzdENTR2FtZXMiLCJkYW1hZ2VUYWtlbiIsImRhbWFnZUdpdmVuIiwiZ29sZEdhbWVzIiwibGVuZ3RoIiwibm9FeGlzdCIsInRvdGFsY3MiLCJkYW1hZ2V0YWtlbnBlcm1pbnV0ZSIsImRwbSIsImVhcm5lZGdvbGQiLCJjaGFtcCIsImNyZWF0ZUZhdm9yaXRlQ2hhbXBzIiwiYXZlcmFnZUNTIiwibWVhbiIsImNyZWF0ZU1pbmlvbnNPYnNlcnZlciIsImF2ZXJhZ2VHaXZlbiIsImF2ZXJhZ2VUYWtlbiIsImRtZ0dpdmVuIiwibmFtZSIsImFtb3VudCIsImRtZ1Rha2VuIiwiZG1nRGF0YSIsImNyZWF0ZURtZ09ic2VydmVyIiwiYXZlcmFnZUdvbGQiLCJjcmVhdGVHb2xkT2JzZXJ2ZXIiLCJjcmVhdGVNaW5pb25zIiwiY3NTdGF0IiwiaW5uZXJIVE1MIiwibWluaW9uRGl2Iiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwicmVuZGVyQ291bnRlciIsImhhbmRsZUludGVyc2VjdCIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjcmVhdGVHb2xkIiwiZ29sZFN0YXQiLCJnb2xkUGljRGl2IiwiZ29sZFBpYzEiLCJnb2xkUGljMiIsImdvbGRBbmltYXRlIiwiZ29sZFRhcmdldCIsImdvbGREaXYiLCJpbmRleCIsImNvaW4iLCJzdHlsZSIsInRvcCIsIm1hcmdpbkxlZnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXJnaW5SaWdodCIsIm1hcmdpblRvcCIsImNvaW5zIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZURtZyIsImRhbWFnZVRhcmdldCIsImRhdGEiLCJjaGFtcEFyciIsIk9iamVjdCIsImtleXMiLCJjaGFtcE9iaiIsImNoYW1wTmFtZSIsInRpbWVzUGxheWVkIiwic29ydCIsImEiLCJiIiwiZGVzY2VuZGluZyIsInNsaWNlIiwic3ZnQ29udGFpbmVyIiwicGxheWVkQ2hhbXBzSGVhZGVyIiwiYXBwZW5kIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJzdmciLCJzZWxlY3QiLCJhdHRyIiwieCIsInNjYWxlQmFuZCIsImRvbWFpbiIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsInNlbGVjdEFsbCIsImpvaW4iLCJkIiwiaSIsImJhbmR3aWR0aCIsInhBeGlzIiwiZyIsImNhbGwiLCJheGlzQm90dG9tIiwidGlja0Zvcm1hdCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsImZvcm1hdCIsImRpdiIsInRleHQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJub2RlIiwiZGFtYWdlRGl2IiwiZGFtYWdlR3JhcGhIZWFkZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDO0FBQzFDOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLEdBQUcsZ0NBQWdDLGtCQUFrQjtBQUNyRDs7O0FBR0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QSxDQUFDLENBQUNJLENBQUMsQ0FBQzdFLE1BQUgsQ0FBZjtBQUE0QixHQUo5RDtBQU1BaUUsS0FBRyxDQUFDUCxNQUFKLENBQVcsR0FBWCxFQUFnQndCLElBQWhCLENBQXFCRixLQUFyQjtBQUNBZixLQUFHLENBQUNQLE1BQUosQ0FBVyxHQUFYLEVBQWdCd0IsSUFBaEIsQ0FBcUJHLEtBQXJCO0FBQ0FwQixLQUFHLENBQUM0QixJQUFKO0FBRUgsQ0FwRUQsQzs7Ozs7Ozs7Ozs7O0FDeFhBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cblxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7IC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuXG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7IC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cblxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiOyAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cblxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9OyAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fSAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG5cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG5cbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpOyAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9OyAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuXG5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH0gLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cblxuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjsgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfSAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG5cblxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkOyAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cblxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0gLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuXG5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG5cbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlOyAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7IC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9IC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cblxuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH0gLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuXG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7IC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGtleXMucmV2ZXJzZSgpOyAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcblxuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG5cblxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG5cbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9IC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDsgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcblxuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiAodHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07IC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuXG4gIHJldHVybiBleHBvcnRzO1xufSggLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbi8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4vLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4vLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxudHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge30pO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCJcbmltcG9ydCBcIi4vc3R5bGVzL3Jlc2V0LnNjc3NcIlxuaW1wb3J0ICogYXMgcGxheWVyc3RhdHMgZnJvbSBcIi4vcGxheWVyc3RhdHNcIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJET00gTG9hZGVkXCIpO1xuXG4gICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBzZWFyY2hCYXIudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBzZWFyY2hCYXIudmFsdWU7XG4gICAgICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgIGgxLnRleHRDb250ZW50ID0gYCR7cGxheWVyLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItcGFnZVwiKTtcbiAgICAgICAgICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKHBpY0NvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dhbWVyLWltYWdlJyk7XG4gICAgICAgICAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQocGljKTtcblxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJzdGF0cy5yZW5kZXJEYXRhKGAke3BsYXllcn1gKTtcbiAgICAgICAgICAgIH0sIDgwMCk7XG5cblxuXG4gICAgICAgICAgICBsZXQgY3NTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY3MtZGl2XCIpO1xuICAgICAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgQ1NIZWFkZXIudGV4dENvbnRlbnQgPSBcIlRob3NlIERhcm4gTWluaW9uc1wiO1xuICAgICAgICAgICAgQ1NIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChjc1NlY3Rpb24pO1xuICAgICAgICAgICAgY3NTZWN0aW9uLmFwcGVuZENoaWxkKENTSGVhZGVyKTtcblxuXG5cbiAgICAgICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGRhbWFnZVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImRhbWFnZS1kaXZcIik7XG4gICAgICAgICAgICBsZXQgZGFtYWdlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICAgICAgZGFtYWdlSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZGFtYWdlU2VjdGlvbik7XG4gICAgICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuXG4gICAgICAgICAgICBsZXQgZ29sZFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZ29sZFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImdvbGQtZGl2XCIpO1xuICAgICAgICAgICAgbGV0IGdvbGRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgICAgICBnb2xkSGVhZGVyLnRleHRDb250ZW50ID0gXCJDSEEtQ0hJTkchXCJcbiAgICAgICAgICAgIGdvbGRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChnb2xkU2VjdGlvbik7XG4gICAgICAgICAgICBnb2xkU2VjdGlvbi5hcHBlbmRDaGlsZChnb2xkSGVhZGVyKTtcblxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBmYWtlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmFrZXJCdXR0b25cIilcbiAgICBmYWtlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IHNwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BsYXNoXCIpO1xuICAgICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IFwiRmFrZXJcIjtcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwaWNDb250YWluZXIpO1xuICAgICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFrZXItaW1hZ2UnKTtcbiAgICAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpYyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyc3RhdHMucmVuZGVyRGF0YShcIkZha2VyXCIpO1xuICAgICAgICB9LCA4MDApO1xuXG5cblxuXG4gICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNzLWRpdlwiKTtcbiAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCI7XG4gICAgICAgIENTSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChjc1NlY3Rpb24pO1xuICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoQ1NIZWFkZXIpO1xuXG5cblxuXG4gICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgbGV0IGRhbWFnZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGRhbWFnZVNlY3Rpb24pO1xuICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuXG4gICAgICAgIGxldCBnb2xkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJnb2xkLWRpdlwiKTtcbiAgICAgICAgbGV0IGdvbGRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGdvbGRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkNIQS1DSElORyFcIlxuICAgICAgICBnb2xkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChnb2xkU2VjdGlvbik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRIZWFkZXIpO1xuXG4gICAgfSlcblxuICAgIGNvbnN0IGJhbmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JhbmdCdXR0b25cIilcbiAgICBiYW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gXCJCYW5nXCI7XG4gICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JhbmctaW1hZ2UnKTtcbiAgICAgICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpYyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyc3RhdHMucmVuZGVyRGF0YShcIkJhbmdcIik7XG4gICAgICAgIH0sIDgwMCk7XG5cblxuXG4gICAgICAgIGxldCBjc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNzLWRpdlwiKTtcbiAgICAgICAgbGV0IENTSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBDU0hlYWRlci50ZXh0Q29udGVudCA9IFwiVGhvc2UgRGFybiBNaW5pb25zXCJcbiAgICAgICAgQ1NIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGNzU2VjdGlvbik7XG4gICAgICAgIGNzU2VjdGlvbi5hcHBlbmRDaGlsZChDU0hlYWRlcik7XG5cblxuXG4gICAgICAgIGxldCBkYW1hZ2VTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGFtYWdlLWRpdlwiKTtcbiAgICAgICAgbGV0IGRhbWFnZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgZGFtYWdlSGVhZGVyLnRleHRDb250ZW50ID0gXCJUaGUgRGFtYWdlIEhhcyBCZWVuIERvbmVcIlxuICAgICAgICBkYW1hZ2VIZWFkZXIuY2xhc3NMaXN0LmFkZChcImF2ZXJhZ2UtY3MtaGVhZGVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGRhbWFnZVNlY3Rpb24pO1xuICAgICAgICBkYW1hZ2VTZWN0aW9uLmFwcGVuZENoaWxkKGRhbWFnZUhlYWRlcik7XG5cblxuICAgICAgICBsZXQgZ29sZFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnb2xkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZ29sZC1kaXZcIik7XG4gICAgICAgIGxldCBnb2xkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBnb2xkSGVhZGVyLnRleHRDb250ZW50ID0gXCJDSEEtQ0hJTkchXCJcbiAgICAgICAgZ29sZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYXZlcmFnZS1jcy1oZWFkZXJcIik7XG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ29sZFNlY3Rpb24pO1xuICAgICAgICBnb2xkU2VjdGlvbi5hcHBlbmRDaGlsZChnb2xkSGVhZGVyKTtcbiAgICB9KVxuXG4gICAgLy8gY29uc3QgYmplcmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JqZXJnQnV0dG9uXCIpXG4gICAgLy8gYmplcmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAvLyAgICAgc3BsYXNoLnJlbW92ZSgpO1xuICAgIC8vICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAvLyAgICAgaDEudGV4dENvbnRlbnQgPSBcIkJqZXJnc2VuXCI7XG4gICAgLy8gICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgIC8vICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAvLyAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgLy8gICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgLy8gICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgIC8vICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgLy8gICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAvLyAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JqZXJnLWltYWdlJyk7XG4gICAgLy8gICAgIHBpY0NvbnRhaW5lci5hcHBlbmRDaGlsZChwaWMpO1xuICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgIHBsYXllcnN0YXRzLnJlbmRlckRhdGEoXCJCamVyZ3NlblwiKTtcbiAgICAvLyAgICAgfSwgNTApO1xuXG4gICAgLy8gfSlcblxuICAgIGNvbnN0IGplbnNlbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamVuc2VuQnV0dG9uXCIpXG4gICAgICAgIGplbnNlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IHNwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BsYXNoXCIpO1xuICAgICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IFwiSmVuc2VuXCI7XG4gICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2plbnNlbi1pbWFnZScpO1xuICAgICAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQocGljKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXJzdGF0cy5yZW5kZXJEYXRhKFwiSmVuc2VuXCIpO1xuICAgICAgICB9LCA4MDApO1xuICAgICAgICBsZXQgY3NTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY3NTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjcy1kaXZcIik7XG4gICAgICAgIGxldCBDU0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgQ1NIZWFkZXIudGV4dENvbnRlbnQgPSBcIlRob3NlIERhcm4gTWluaW9uc1wiXG4gICAgICAgIENTSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChjc1NlY3Rpb24pO1xuICAgICAgICBjc1NlY3Rpb24uYXBwZW5kQ2hpbGQoQ1NIZWFkZXIpO1xuICAgICAgICBsZXQgZGFtYWdlU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRhbWFnZVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImRhbWFnZS1kaXZcIik7XG4gICAgICAgIGxldCBkYW1hZ2VIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGRhbWFnZUhlYWRlci50ZXh0Q29udGVudCA9IFwiVGhlIERhbWFnZSBIYXMgQmVlbiBEb25lXCJcbiAgICAgICAgZGFtYWdlSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChkYW1hZ2VTZWN0aW9uKTtcbiAgICAgICAgZGFtYWdlU2VjdGlvbi5hcHBlbmRDaGlsZChkYW1hZ2VIZWFkZXIpO1xuXG5cblxuXG4gICAgICAgIGxldCBnb2xkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJnb2xkLWRpdlwiKTtcbiAgICAgICAgbGV0IGdvbGRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGdvbGRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkNIQS1DSElORyFcIlxuICAgICAgICBnb2xkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJhdmVyYWdlLWNzLWhlYWRlclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChnb2xkU2VjdGlvbik7XG4gICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRIZWFkZXIpO1xuXG4gICAgfSlcblxufSk7ICAgICIsImNvbnN0IHJlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuXG4vLyBwcmludHMgYWxsIHRoZSBtYXRjaGVzIGluIHRoZSBjc3Zcbi8vIGV4cG9ydCBjb25zdCByZXN1bHRzID0gZDMuY3N2KCcuLi9kYXRhLzIwMjFfTWF0Y2hfRGF0YS5jc3YnKVxuLy8gLnRoZW4oIChyZXN1bHQpID0+IGNvbnNvbGUubG9nKHJlc3VsdFswXS5wbGF5ZXIpKVxuXG5cblxuLy8gcmV0dXJucyBhbGwgdGhlIG1hdGNoZXMgZm9yIGEgc2luZ2xlIHBsYXllclxuZXhwb3J0IGNvbnN0IGZpbHRlckJ5UGxheWVyID0gKHBsYXllck5hbWUpID0+IGQzLmNzdignLi4vZGF0YS8yMDIxX01hdGNoX0RhdGEuY3N2Jylcbi50aGVuKCAocmVzdWx0KSA9PiB7ICAgIFxuICAgIGxldCBmaWx0ZXJlZFJlc3VsdFxuICAgIGZpbHRlcmVkUmVzdWx0ID0gcmVzdWx0LmZpbHRlciggZ2FtZSA9PiBnYW1lLnBsYXllci50b0xvd2VyQ2FzZSgpID09PSBwbGF5ZXJOYW1lLnRvTG93ZXJDYXNlKCkpXG4gICAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0XG59XG5cbilcblxuLy8gcmV0dXJucyBhbGwgdGhlIHBsYXllcidzIGNoYW1waW9ucyBwbGF5ZWRcblxuZXhwb3J0IGNvbnN0IGNoYW1wc1BsYXllZCA9IChwbGF5ZXJOYW1lKSA9PiB7ICAgXG4gICAgZmlsdGVyQnlQbGF5ZXIocGxheWVyTmFtZSlcbiAgICAudGhlbiAoIChnYW1lcykgPT4ge1xuICAgICAgICBsZXQgY2hhbXBzID0gW107XG4gICAgICAgIGdhbWVzLmZvckVhY2goZ2FtZSA9PiB7XG4gICAgICAgICAgICBjaGFtcHMucHVzaChnYW1lLmNoYW1waW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaGFtcHM7XG4gICAgfSk7XG59XG5cblxuLy8gY3JlYXRlcyBpdCBhbGwgcmVhbGx5XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEYXRhKHBsYXllck5hbWUpIHtcbiAgICBsZXQgY2hhbXBDb3VudCA9IHt9O1xuXG4gICAgZmlsdGVyQnlQbGF5ZXIocGxheWVyTmFtZSlcbiAgICAudGhlbiAoIChnYW1lcykgPT4ge1xuICAgICAgICBsZXQgY2hhbXBzID0gW107XG4gICAgICAgIGxldCBiZXN0Q1NHYW1lcyA9IFtdO1xuICAgICAgICBsZXQgZGFtYWdlVGFrZW4gPSBbXTtcbiAgICAgICAgbGV0IGRhbWFnZUdpdmVuID0gW107XG4gICAgICAgIGxldCBnb2xkR2FtZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZ2FtZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNvbnN0IHBpY0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGljLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGNvbnN0IG5vRXhpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgICAgICBub0V4aXN0LnRleHRDb250ZW50ID0gXCJVbmZvcnR1bmF0ZWx5LCB3ZSBkbyBub3QgaGF2ZSBkYXRhIG9uIHRoaXMgcGxheWVyLiBPdXIgZGF0YXNldCBpcyBsaW1pdGVkIHRvIHByb2Zlc3Npb25hbCBwbGF5ZXJzIGluIHRoZSAyMDIxIHNlYXNvbiBmcm9tIEphbnVhcnkgdG8gQXByaWwuXCI7XG4gICAgICAgICAgICBub0V4aXN0LmNsYXNzTGlzdC5hZGQoXCJuby1leGlzdC1oZWFkZXJcIik7XG4gICAgICAgICAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQobm9FeGlzdCk7XG4gICAgICAgIH0gZWxzZXtcblxuXG4gICAgICAgIFxuICAgICAgICBnYW1lcy5mb3JFYWNoKGdhbWUgPT4ge1xuICAgICAgICAgICAgY2hhbXBzLnB1c2goZ2FtZS5jaGFtcGlvbik7XG4gICAgICAgICAgICBiZXN0Q1NHYW1lcy5wdXNoKGdhbWUudG90YWxjcyk7XG4gICAgICAgICAgICBkYW1hZ2VUYWtlbi5wdXNoKGdhbWUuZGFtYWdldGFrZW5wZXJtaW51dGUpO1xuICAgICAgICAgICAgZGFtYWdlR2l2ZW4ucHVzaChnYW1lLmRwbSk7XG4gICAgICAgICAgICBnb2xkR2FtZXMucHVzaChnYW1lLmVhcm5lZGdvbGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2hhbXBzLmZvckVhY2goY2hhbXAgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGFtcENvdW50W2NoYW1wXSl7XG4gICAgICAgICAgICAgICAgY2hhbXBDb3VudFtjaGFtcF0gPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFtcENvdW50W2NoYW1wXSsrO1xuICAgICAgICB9KVxuICAgICAgICBjcmVhdGVGYXZvcml0ZUNoYW1wcyhjaGFtcENvdW50LCBwbGF5ZXJOYW1lKTtcblxuXG4gICAgICAgIGxldCBhdmVyYWdlQ1MgPSBkMy5tZWFuKGJlc3RDU0dhbWVzKTtcbiAgICAgICAgY3JlYXRlTWluaW9uc09ic2VydmVyKHBsYXllck5hbWUsIGF2ZXJhZ2VDUylcbiAgICAgICAgLy8gbGV0IGNzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3MtZGl2XCIpO1xuICAgICAgICAvLyBsZXQgY3NTdGF0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAvLyBjc1N0YXQuaW5uZXJIVE1MID0gYCR7cGxheWVyTmFtZX0gc3VyZSBsb3ZlcyB0byBtZXNzIHVwIHRob3NlIG1pbmlvbnMuIFRoZXkgdXN1YWxseSBoYXZlIGFuIGF2ZXJhZ2UgQ1Mgb2YgPHNwYW4gc3R5bGU9XCJjb2xvcjojY2MwMDAwXCI+JHthdmVyYWdlQ1N9PC9zcGFuPiBieSB0aGUgZW5kIG9mIHRoZSBnYW1lIWA7XG4gICAgICAgIC8vIGNzU3RhdC5jbGFzc0xpc3QuYWRkKFwiY3NTdGF0XCIpXG4gICAgICAgIC8vIGNzU2VjdGlvbi5hcHBlbmRDaGlsZChjc1N0YXQpO1xuICAgICAgICAvLyBsZXQgbWluaW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAvLyBtaW5pb25EaXYuY2xhc3NMaXN0LmFkZChcIm1pbmlvbi1kaXZcIik7XG4gICAgICAgIC8vIGNzU2VjdGlvbi5hcHBlbmRDaGlsZChtaW5pb25EaXYpO1xuXG4gICAgICAgIGxldCBhdmVyYWdlR2l2ZW4gPSBkMy5tZWFuKGRhbWFnZUdpdmVuKTtcbiAgICAgICAgbGV0IGF2ZXJhZ2VUYWtlbiA9IGQzLm1lYW4oZGFtYWdlVGFrZW4pO1xuICAgICAgICBsZXQgZG1nR2l2ZW4gPSB7bmFtZTogXCJBdmVyYWdlIERNRyBHaXZlbiBwZXIgbWludXRlXCIsIGFtb3VudDogYXZlcmFnZUdpdmVufVxuICAgICAgICBsZXQgZG1nVGFrZW4gPSB7bmFtZTogXCJBdmVyYWdlIERNRyBUYWtlbiBwZXIgbWludXRlXCIsIGFtb3VudDogYXZlcmFnZVRha2VufVxuICAgICAgICBsZXQgZG1nRGF0YSA9IFtkbWdHaXZlbiwgZG1nVGFrZW5dXG5cbiAgICAgICAgY3JlYXRlRG1nT2JzZXJ2ZXIoZG1nRGF0YSwgcGxheWVyTmFtZSk7XG4gICAgICAgIC8vIGNyZWF0ZURtZyhkbWdEYXRhLCBwbGF5ZXJOYW1lKTtcblxuICAgICAgICBsZXQgYXZlcmFnZUdvbGQgPSBkMy5tZWFuKGdvbGRHYW1lcyk7XG4gICAgICAgIGNyZWF0ZUdvbGRPYnNlcnZlcihhdmVyYWdlR29sZCwgcGxheWVyTmFtZSlcblxuXG4gICAgfX0pO1xufVxuXG5cbmNvbnN0IGNyZWF0ZU1pbmlvbnMgPSAocGxheWVyTmFtZSwgYXZlcmFnZUNTKSA9PiB7XG4gICAgbGV0IGNzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3MtZGl2XCIpO1xuICAgIGxldCBjc1N0YXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGNzU3RhdC5pbm5lckhUTUwgPSBgJHtwbGF5ZXJOYW1lfSBzdXJlIGxvdmVzIHRvIG1lc3MgdXAgdGhvc2UgbWluaW9ucy4gVGhleSB1c3VhbGx5IGhhdmUgYW4gYXZlcmFnZSBDUyBvZiA8c3BhbiBzdHlsZT1cImNvbG9yOiNjYzAwMDBcIj4ke2F2ZXJhZ2VDU308L3NwYW4+IGJ5IHRoZSBlbmQgb2YgdGhlIGdhbWUhYDtcbiAgICAgICAgY3NTdGF0LmNsYXNzTGlzdC5hZGQoXCJjc1N0YXRcIilcbiAgICAgICAgY3NTZWN0aW9uLmFwcGVuZENoaWxkKGNzU3RhdCk7XG4gICAgICAgIGxldCBtaW5pb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIG1pbmlvbkRpdi5jbGFzc0xpc3QuYWRkKFwibWluaW9uLWRpdlwiKTtcbiAgICAgICAgY3NTZWN0aW9uLmFwcGVuZENoaWxkKG1pbmlvbkRpdik7XG59XG5cbmNvbnN0IGNyZWF0ZU1pbmlvbnNPYnNlcnZlciA9IChwbGF5ZXJOYW1lLCBhdmVyYWdlQ1MpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICByb290OiBudWxsLFxuICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgIHRocmVzaG9sZDogMC45XG4gICAgfVxuXG4gICAgbGV0IHJlbmRlckNvdW50ZXIgPSAwO1xuXG4gICAgbGV0IGhhbmRsZUludGVyc2VjdCA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgLy8gRWFjaCBlbnRyeSBkZXNjcmliZXMgYW4gaW50ZXJzZWN0aW9uIGNoYW5nZSBmb3Igb25lIG9ic2VydmVkXG4gICAgICAgICAgICAvLyB0YXJnZXQgZWxlbWVudDpcbiAgICAgICAgICAgIC8vICAgZW50cnkuYm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvXG4gICAgICAgICAgICAvLyAgIGVudHJ5LmludGVyc2VjdGlvblJlY3RcbiAgICAgICAgICAgIC8vICAgZW50cnkuaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgICAgIC8vICAgZW50cnkucm9vdEJvdW5kc1xuICAgICAgICAgICAgLy8gICBlbnRyeS50YXJnZXRcbiAgICAgICAgICAgIC8vICAgZW50cnkudGltZVxuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIHJlbmRlckNvdW50ZXIgPT09IDApe1xuICAgICAgICAgICAgICAgIGNyZWF0ZU1pbmlvbnMocGxheWVyTmFtZSwgYXZlcmFnZUNTKTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb3VudGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlSW50ZXJzZWN0LCBvcHRpb25zKTtcbiAgICBsZXQgY3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcy1kaXZcIik7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGNzU2VjdGlvbik7XG5cbn1cblxuXG5jb25zdCBjcmVhdGVHb2xkID0gKHBsYXllck5hbWUsIGF2ZXJhZ2VHb2xkKSA9PiB7XG4gICAgbGV0IGdvbGRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2xkLWRpdlwiKTtcbiAgICBsZXQgZ29sZFN0YXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGdvbGRTdGF0LmlubmVySFRNTCA9IGAke3BsYXllck5hbWV9IGlzIHF1aXRlIGNlcnRhaW5seSBnZXR0aW5nIHRoYXQgYnJlYWQuIFRoZXkgZW5kIHVwIGVhcm5pbmcgYW4gYXZlcmFnZSBvZiA8c3BhbiBzdHlsZT1cImNvbG9yOiNmZmQ3MzZcIj4ke2F2ZXJhZ2VHb2xkfTwvc3Bhbj4gZ29sZCBlYWNoIGdhbWUhYDtcbiAgICAgICAgZ29sZFN0YXQuY2xhc3NMaXN0LmFkZChcImdvbGRTdGF0XCIpXG4gICAgICAgIGdvbGRTZWN0aW9uLmFwcGVuZENoaWxkKGdvbGRTdGF0KTtcbiAgICAgICAgbGV0IGdvbGRQaWNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGdvbGRQaWNEaXYuY2xhc3NMaXN0LmFkZChcImdvbGQtcGljLWRpdlwiKVxuICAgICAgICBnb2xkU2VjdGlvbi5hcHBlbmRDaGlsZChnb2xkUGljRGl2KTtcbiAgICAgICAgbGV0IGdvbGRQaWMxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBnb2xkUGljMS5jbGFzc0xpc3QuYWRkKFwiZ29sZC1waWMxXCIpO1xuICAgICAgICBnb2xkUGljRGl2LmFwcGVuZENoaWxkKGdvbGRQaWMxKTtcbiAgICAgICAgbGV0IGdvbGRQaWMyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBnb2xkUGljMi5jbGFzc0xpc3QuYWRkKFwiZ29sZC1waWMyXCIpO1xuICAgICAgICBnb2xkUGljRGl2LmFwcGVuZENoaWxkKGdvbGRQaWMyKTtcbn1cblxuY29uc3QgY3JlYXRlR29sZE9ic2VydmVyID0gKGF2ZXJhZ2VHb2xkLCBwbGF5ZXJOYW1lKSA9PiB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICByb290OiBudWxsLFxuICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgIHRocmVzaG9sZDogMC45XG4gICAgfVxuXG4gICAgbGV0IHJlbmRlckNvdW50ZXIgPSAwO1xuXG5cblxuICAgIGxldCBoYW5kbGVJbnRlcnNlY3QgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIC8vIEVhY2ggZW50cnkgZGVzY3JpYmVzIGFuIGludGVyc2VjdGlvbiBjaGFuZ2UgZm9yIG9uZSBvYnNlcnZlZFxuICAgICAgICAgICAgLy8gdGFyZ2V0IGVsZW1lbnQ6XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdFxuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpb1xuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmlzSW50ZXJzZWN0aW5nXG4gICAgICAgICAgICAvLyAgIGVudHJ5LnJvb3RCb3VuZHNcbiAgICAgICAgICAgIC8vICAgZW50cnkudGFyZ2V0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LnRpbWVcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiByZW5kZXJDb3VudGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZ29sZEFuaW1hdGUoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUdvbGQocGxheWVyTmFtZSwgYXZlcmFnZUdvbGQpO1xuXG4gICAgICAgICAgICAgICAgfSwgMTUwMClcbiAgICAgICAgICAgICAgICByZW5kZXJDb3VudGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlSW50ZXJzZWN0LCBvcHRpb25zKTtcblxuICAgIGxldCBnb2xkVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdvbGQtZGl2Jyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShnb2xkVGFyZ2V0KTtcblxufVxuXG5jb25zdCBnb2xkQW5pbWF0ZSA9ICgpID0+IHtcbiAgICBsZXQgZ29sZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29sZC1kaXZcIilcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA3NTsgaW5kZXgrKykge1xuICAgICAgICBsZXQgY29pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjb2luLmNsYXNzTGlzdC5hZGQoXCJjb2luXCIpO1xuICAgICAgICBjb2luLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICBjb2luLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSArICclJ30gYFxuICAgICAgICBjb2luLnN0eWxlLm1hcmdpblJpZ2h0ID0gYCR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEgKyAnJSd9YFxuICAgICAgICBjb2luLnN0eWxlLm1hcmdpblRvcCA9IGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwKSArIDEgKyAnJSd9YFxuICAgICAgICBnb2xkRGl2LmFwcGVuZENoaWxkKGNvaW4pO1xuICAgIH1cbiAgICAvLyBsZXQgY29pbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAvLyBsZXQgY29pbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgLy8gbGV0IGNvaW4zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIC8vIGxldCBjb2luNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAvLyBsZXQgY29pbjUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgLy8gbGV0IGNvaW42ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIC8vIGxldCBjb2luNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgIC8vIGxldCBjb2lucyA9IFtjb2luMSwgY29pbjIsIGNvaW4zLCBjb2luNCwgY29pbjUsIGNvaW42LCBjb2luN11cblxuICAgIC8vIGNvaW5zLmZvckVhY2goIGNvaW4gPT4ge1xuICAgIC8vICAgICBjb2luLmNsYXNzTGlzdC5hZGQoXCJjb2luXCIpO1xuICAgIC8vICAgICBjb2luLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgIC8vICAgICBjb2luLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSArICclJ30gYFxuICAgIC8vICAgICBjb2luLnN0eWxlLm1hcmdpblJpZ2h0ID0gYCR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEgKyAnJSd9YFxuICAgIC8vICAgICBnb2xkRGl2LmFwcGVuZENoaWxkKGNvaW4pO1xuICAgIC8vIH0pXG5cbiAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICAgIGxldCBjb2lucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29pblwiKTtcbiAgICAgICAgY29pbnMuZm9yRWFjaCggY29pbiA9PiBjb2luLnJlbW92ZSgpKTtcblxuICAgIH0sIDIwMDApXG5cbn1cblxuXG5cblxuY29uc3QgY3JlYXRlRG1nT2JzZXJ2ZXIgPSAoZG1nRGF0YSwgcGxheWVyTmFtZSkgPT4ge1xuXG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICByb290OiBudWxsLFxuICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgIHRocmVzaG9sZDogMC45XG4gICAgfVxuXG4gICAgbGV0IHJlbmRlckNvdW50ZXIgPSAwO1xuXG5cblxuICAgIGxldCBoYW5kbGVJbnRlcnNlY3QgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIC8vIEVhY2ggZW50cnkgZGVzY3JpYmVzIGFuIGludGVyc2VjdGlvbiBjaGFuZ2UgZm9yIG9uZSBvYnNlcnZlZFxuICAgICAgICAgICAgLy8gdGFyZ2V0IGVsZW1lbnQ6XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdFxuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpb1xuICAgICAgICAgICAgLy8gICBlbnRyeS5pbnRlcnNlY3Rpb25SZWN0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LmlzSW50ZXJzZWN0aW5nXG4gICAgICAgICAgICAvLyAgIGVudHJ5LnJvb3RCb3VuZHNcbiAgICAgICAgICAgIC8vICAgZW50cnkudGFyZ2V0XG4gICAgICAgICAgICAvLyAgIGVudHJ5LnRpbWVcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiByZW5kZXJDb3VudGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRG1nKGRtZ0RhdGEsIHBsYXllck5hbWUpO1xuICAgICAgICAgICAgICAgIHJlbmRlckNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVJbnRlcnNlY3QsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGRhbWFnZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYW1hZ2UtZGl2Jyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkYW1hZ2VUYXJnZXQpO1xuXG5cbn1cblxuXG5cbi8vIGFjdHVhbCBjaGFydCBjcmVhdGlvblxuXG5jb25zdCBjcmVhdGVGYXZvcml0ZUNoYW1wcyA9IChkYXRhLCBwbGF5ZXJOYW1lKSA9PiB7XG4gICAgbGV0IGNoYW1wQXJyID0gW107XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChjaGFtcGlvbiA9PiB7XG4gICAgICAgIGxldCBjaGFtcE9iaiA9IHtjaGFtcE5hbWU6IGNoYW1waW9uLCB0aW1lc1BsYXllZDogZGF0YVtjaGFtcGlvbl19O1xuICAgICAgICBjaGFtcEFyci5wdXNoKCBjaGFtcE9iaiApXG4gICAgfSk7XG4gICAgY2hhbXBBcnIgPSBjaGFtcEFyci5zb3J0KChhLGIpID0+IGQzLmRlc2NlbmRpbmcoYS50aW1lc1BsYXllZCwgYi50aW1lc1BsYXllZCkpLnNsaWNlKDAsNSlcbiAgICBjb25zdCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBpYy1jb250YWluZXJcIik7XG4gICAgbGV0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBzdmdDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjaGFtcHMtZ3JhcGgtY29udGFpbmVyJyk7XG4gICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcik7XG4gICAgbGV0IHBsYXllZENoYW1wc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBwbGF5ZWRDaGFtcHNIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJOYW1lfSdzIEZhdm9yaXRlIENoYW1waW9uc2A7XG4gICAgcGxheWVkQ2hhbXBzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZWQtY2hhbXBzLWhlYWRlclwiKVxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmQocGxheWVkQ2hhbXBzSGVhZGVyKTtcblxuXG4gICAgY29uc3Qgd2lkdGggPSAxMDAwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNTAsIGJvdHRvbTogNTAsIGxlZnQ6IDUwLCByaWdodDogNTB9O1xuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcuY2hhbXBzLWdyYXBoLWNvbnRhaW5lcicpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodClcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuXG4gICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4oZDMucmFuZ2UoY2hhbXBBcnIubGVuZ3RoKSlcbiAgICAgICAgLnJhbmdlKFttYXJnaW4ubGVmdCwgd2lkdGggLSBtYXJnaW4ucmlnaHRdKVxuICAgICAgICAucGFkZGluZygwLjEpO1xuXG4gICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgMjBdKVxuICAgICAgICAucmFuZ2UoW2hlaWdodCAtIG1hcmdpbi5ib3R0b20sIG1hcmdpbi50b3BdKTtcblxuICAgIHN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAncm95YWxibHVlJylcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKGNoYW1wQXJyLnNvcnQoKGEsYikgPT4gZDMuZGVzY2VuZGluZyhhLnRpbWVzUGxheWVkLCBiLnRpbWVzUGxheWVkKSkpXG4gICAgICAgIC5qb2luKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgICAgICAuYXR0cigneScsIChkKSA9PiB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geSgwKSAtIHkoMCkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Zhdm9yaXRlLWNoYW1wLXJlY3QnKVxuXG4gICAgZnVuY3Rpb24geEF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHQgLSBtYXJnaW4uYm90dG9tfSlgKVxuICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpLnRpY2tGb3JtYXQoaSA9PiBjaGFtcEFycltpXS5jaGFtcE5hbWUpKVxuICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzIwcHgnKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24geUF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0pLCAwKWApXG4gICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHkpLnRpY2tzKG51bGwsIGRhdGEuZm9ybWF0KSlcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyMHB4JylcbiAgICB9XG5cbiAgICB2YXIgZGl2ID0gZDMuc2VsZWN0KFwiZmF2b3JpdGUtY2hhbXAtcmVjdFwiKS5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRvb2x0aXBcIilcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG5cblxuICAgICAgc3ZnLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwieVwiLCAwIC0gbWFyZ2luLmxlZnQpXG4gICAgICAuYXR0cihcInhcIiwwIC0gKGhlaWdodCAvIDIpKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4wMDZlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiVGltZXMgUGxheWVkIDIwMjEgU2Vhc29uXCIpOyBcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoZC50aW1lc1BsYXllZCk7IH0pXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoMCkgLSB5KGQudGltZXNQbGF5ZWQpOyB9KVxuXG4gICAgc3ZnLmFwcGVuZCgnZycpLmNhbGwoeEF4aXMpO1xuICAgIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKHlBeGlzKTtcbiAgICBzdmcubm9kZSgpO1xuXG59XG5cblxuXG5jb25zdCBjcmVhdGVEbWcgPSAoZGF0YSwgcGxheWVyTmFtZSkgPT4ge1xuXG4gICAgY29uc3QgZGFtYWdlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYW1hZ2UtZGl2XCIpO1xuICAgIGxldCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgc3ZnQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGFtYWdlLWdyYXBoLWNvbnRhaW5lcicpO1xuICAgIGRhbWFnZURpdi5hcHBlbmRDaGlsZChzdmdDb250YWluZXIpO1xuICAgIGxldCBkYW1hZ2VHcmFwaEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBkYW1hZ2VHcmFwaEhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllck5hbWV9IHRha2V0aCBkYW1hZ2UgYXMgdGhleSBnaXZldGhgO1xuICAgIGRhbWFnZUdyYXBoSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJkYW1hZ2UtZ3JhcGgtaGVhZGVyXCIpXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZChkYW1hZ2VHcmFwaEhlYWRlcik7XG5cblxuICAgIGNvbnN0IHdpZHRoID0gMTAwMDtcbiAgICBjb25zdCBoZWlnaHQgPSA1MDA7XG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDUwLCBib3R0b206IDUwLCBsZWZ0OiA1MCwgcmlnaHQ6IDUwfTtcblxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnLmRhbWFnZS1kaXYnKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpXG4gICAgICAgIC5hdHRyKCd2aWV3Qm94JywgWzAsIDAsIHdpZHRoLCBoZWlnaHRdKTtcblxuICAgIGNvbnN0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAuZG9tYWluKGQzLnJhbmdlKDIpKVxuICAgICAgICAucmFuZ2UoW21hcmdpbi5sZWZ0LCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pXG4gICAgICAgIC5wYWRkaW5nKDAuMSk7XG5cbiAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAxMDAwXSlcbiAgICAgICAgLnJhbmdlKFtoZWlnaHQgLSBtYXJnaW4uYm90dG9tLCBtYXJnaW4udG9wXSk7XG5cbiAgICBzdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJ2RhcmtyZWQnKVxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgICAgLmRhdGEoZGF0YS5zb3J0KChhLGIpID0+IGQzLmRlc2NlbmRpbmcoYS5hbW91bnQsIGIuYW1vdW50KSkpXG4gICAgICAgIC5qb2luKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgICAgICAuYXR0cigneScsIChkKSA9PiB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geSgwKSAtIHkoMCkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RhbWFnZS1yZWN0JylcblxuICAgIGZ1bmN0aW9uIHhBeGlzKGcpIHtcbiAgICAgICAgZy5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7aGVpZ2h0IC0gbWFyZ2luLmJvdHRvbX0pYClcbiAgICAgICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KS50aWNrRm9ybWF0KGkgPT4gZGF0YVtpXS5uYW1lKSlcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyMHB4JylcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHlBeGlzKGcpIHtcbiAgICAgICAgZy5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9KSwgMClgKVxuICAgICAgICAuY2FsbChkMy5heGlzTGVmdCh5KS50aWNrcyhudWxsLCBkYXRhLmZvcm1hdCkpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMjBweCcpXG4gICAgfVxuXG4gICAgXG5cbiAgICBzdmcuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geShkLmFtb3VudCk7IH0pXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoMCkgLSB5KGQuYW1vdW50KTsgfSlcblxuICAgIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKHhBeGlzKTtcbiAgICBzdmcuYXBwZW5kKCdnJykuY2FsbCh5QXhpcyk7XG4gICAgc3ZnLm5vZGUoKTtcblxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sInNvdXJjZVJvb3QiOiIifQ==