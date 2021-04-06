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
/* harmony import */ var _playerstats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerstats */ "./src/playerstats.js");


document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
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
      _playerstats__WEBPACK_IMPORTED_MODULE_1__["topChampsData"]("Faker");
    }, 800);
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
      _playerstats__WEBPACK_IMPORTED_MODULE_1__["topChampsData"]("Bang");
    }, 800);
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
  //         playerstats.topChampsData("Bjergsen");
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
      _playerstats__WEBPACK_IMPORTED_MODULE_1__["topChampsData"]("Jensen");
    }, 800);
  });
});

/***/ }),

/***/ "./src/playerstats.js":
/*!****************************!*\
  !*** ./src/playerstats.js ***!
  \****************************/
/*! exports provided: filterByPlayer, champsPlayed, topChampsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterByPlayer", function() { return filterByPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "champsPlayed", function() { return champsPlayed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "topChampsData", function() { return topChampsData; });
var regeneratorRuntime = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js"); // prints all the matches in the csv
// export const results = d3.csv('../data/2021_Match_Data.csv')
// .then( (result) => console.log(result[0].player))
// returns all the matches for a single player


var filterByPlayer = function filterByPlayer(playerName) {
  return d3.csv('../data/2021_Match_Data.csv').then(function (result) {
    var filteredResult;
    filteredResult = result.filter(function (game) {
      return game.player === playerName;
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
}; // creates chart for players champs

function topChampsData(playerName) {
  var champCount = {};
  filterByPlayer(playerName).then(function (games) {
    var champs = [];
    games.forEach(function (game) {
      champs.push(game.champion);
    });
    champs.forEach(function (champ) {
      if (!champCount[champ]) {
        champCount[champ] = 0;
      }

      champCount[champ]++;
    });
    createFavoriteChamps(champCount, playerName);
  });
} // actual chart creation

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
  }).attr('width', x.bandwidth()).attr('class', 'favorite-champ-rect').on("mouseover", function (d) {
    return mouseover(d);
  });

  function xAxis(g) {
    g.attr('transform', "translate(0, ".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).tickFormat(function (i) {
      return champArr[i].champName;
    })).attr('font-size', '20px');
  }

  function yAxis(g) {
    g.attr('transform', "translate(".concat(margin.left, "), 0)")).call(d3.axisLeft(y).ticks(null, data.format)).attr('font-size', '20px');
  }

  var div = d3.select("favorite-champ-rect").append("div").attr("class", "tooltip").style("display", "none");

  function mouseover(d) {
    div.style("display", "inline");
    div.text(d.timesPlayed);
  }

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcnN0YXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiZmFrZXJCdXR0b24iLCJxdWVyeVNlbGVjdG9yIiwic3BsYXNoIiwicmVtb3ZlIiwiaDEiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJwYWdlIiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiY2xhc3NMaXN0IiwiYWRkIiwicGljQ29udGFpbmVyIiwicGljIiwic2V0VGltZW91dCIsInBsYXllcnN0YXRzIiwiYmFuZ0J1dHRvbiIsImplbnNlbkJ1dHRvbiIsInJlZ2VuZXJhdG9yUnVudGltZSIsInJlcXVpcmUiLCJmaWx0ZXJCeVBsYXllciIsInBsYXllck5hbWUiLCJkMyIsImNzdiIsInRoZW4iLCJyZXN1bHQiLCJmaWx0ZXJlZFJlc3VsdCIsImZpbHRlciIsImdhbWUiLCJwbGF5ZXIiLCJjaGFtcHNQbGF5ZWQiLCJnYW1lcyIsImNoYW1wcyIsImZvckVhY2giLCJwdXNoIiwiY2hhbXBpb24iLCJ0b3BDaGFtcHNEYXRhIiwiY2hhbXBDb3VudCIsImNoYW1wIiwiY3JlYXRlRmF2b3JpdGVDaGFtcHMiLCJkYXRhIiwiY2hhbXBBcnIiLCJPYmplY3QiLCJrZXlzIiwiY2hhbXBPYmoiLCJjaGFtcE5hbWUiLCJ0aW1lc1BsYXllZCIsInNvcnQiLCJhIiwiYiIsImRlc2NlbmRpbmciLCJzbGljZSIsInN2Z0NvbnRhaW5lciIsInBsYXllZENoYW1wc0hlYWRlciIsImFwcGVuZCIsIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwic3ZnIiwic2VsZWN0IiwiYXR0ciIsIngiLCJzY2FsZUJhbmQiLCJkb21haW4iLCJyYW5nZSIsImxlbmd0aCIsInBhZGRpbmciLCJ5Iiwic2NhbGVMaW5lYXIiLCJzZWxlY3RBbGwiLCJqb2luIiwiZCIsImkiLCJiYW5kd2lkdGgiLCJvbiIsIm1vdXNlb3ZlciIsInhBeGlzIiwiZyIsImNhbGwiLCJheGlzQm90dG9tIiwidGlja0Zvcm1hdCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsImZvcm1hdCIsImRpdiIsInN0eWxlIiwidGV4dCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIm5vZGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDO0FBQzFDOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtB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YUFEbkIsRUFFQ0EsSUFGRCxDQUVNLEdBRk4sRUFFVyxJQUFJUCxNQUFNLENBQUNHLElBRnRCLEVBR0NJLElBSEQsQ0FHTSxHQUhOLEVBR1UsSUFBS1IsTUFBTSxHQUFHLENBSHhCLEVBSUNRLElBSkQsQ0FJTSxJQUpOLEVBSVksUUFKWixFQUtDMEIsS0FMRCxDQUtPLGFBTFAsRUFLc0IsUUFMdEIsRUFNQ0MsSUFORCxDQU1NLDBCQU5OO0FBUUY3QixLQUFHLENBQUNXLFNBQUosQ0FBYyxNQUFkLEVBQ0ttQixVQURMLEdBRUtDLFFBRkwsQ0FFYyxHQUZkLEVBR0s3QixJQUhMLENBR1UsR0FIVixFQUdlLFVBQVNXLENBQVQsRUFBWTtBQUFFLFdBQU9KLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDN0IsV0FBSCxDQUFSO0FBQTBCLEdBSHZELEVBSUtrQixJQUpMLENBSVUsUUFKVixFQUlvQixVQUFTVyxDQUFULEVBQVk7QUFBRSxXQUFPSixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9BLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDN0IsV0FBSCxDQUFmO0FBQWlDLEdBSm5FO0FBTUFnQixLQUFHLENBQUNSLE1BQUosQ0FBVyxHQUFYLEVBQWdCNEIsSUFBaEIsQ0FBcUJGLEtBQXJCO0FBQ0FsQixLQUFHLENBQUNSLE1BQUosQ0FBVyxHQUFYLEVBQWdCNEIsSUFBaEIsQ0FBcUJHLEtBQXJCO0FBQ0F2QixLQUFHLENBQUNnQyxJQUFKO0FBRUgsQ0F6RkQsQzs7Ozs7Ozs7Ozs7O0FDeERBO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xudmFyIHJ1bnRpbWUgPSBmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTsgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG5cbiAgZXhwb3J0cy53cmFwID0gd3JhcDsgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7IC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307IC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cblxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9IC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cblxuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcblxuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07IC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG5cblxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAga2V5cy5yZXZlcnNlKCk7IC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuXG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cblxuXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwOyAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cblxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTsgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59KCAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufSIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIlxuaW1wb3J0ICogYXMgcGxheWVyc3RhdHMgZnJvbSBcIi4vcGxheWVyc3RhdHNcIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJET00gTG9hZGVkXCIpO1xuXG4gICAgY29uc3QgZmFrZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zha2VyQnV0dG9uXCIpXG4gICAgZmFrZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAgICAgc3BsYXNoLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBcIkZha2VyXCI7XG4gICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zha2VyLWltYWdlJyk7XG4gICAgICAgIHBpY0NvbnRhaW5lci5hcHBlbmRDaGlsZChwaWMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHBsYXllcnN0YXRzLnRvcENoYW1wc0RhdGEoXCJGYWtlclwiKTtcbiAgICAgICAgfSwgODAwKTtcbiAgICB9KVxuXG4gICAgY29uc3QgYmFuZ0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmFuZ0J1dHRvblwiKVxuICAgIGJhbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAgICAgc3BsYXNoLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBcIkJhbmdcIjtcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgICAgIGxldCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwaWNDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWMtY29udGFpbmVyJylcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwaWNDb250YWluZXIpO1xuICAgICAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYmFuZy1pbWFnZScpO1xuICAgICAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQocGljKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXJzdGF0cy50b3BDaGFtcHNEYXRhKFwiQmFuZ1wiKTtcbiAgICAgICAgfSwgODAwKTtcbiAgICB9KVxuXG4gICAgLy8gY29uc3QgYmplcmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JqZXJnQnV0dG9uXCIpXG4gICAgLy8gYmplcmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAvLyAgICAgc3BsYXNoLnJlbW92ZSgpO1xuICAgIC8vICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAvLyAgICAgaDEudGV4dENvbnRlbnQgPSBcIkJqZXJnc2VuXCI7XG4gICAgLy8gICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgIC8vICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAvLyAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgLy8gICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgLy8gICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgIC8vICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgLy8gICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAvLyAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JqZXJnLWltYWdlJyk7XG4gICAgLy8gICAgIHBpY0NvbnRhaW5lci5hcHBlbmRDaGlsZChwaWMpO1xuICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgIHBsYXllcnN0YXRzLnRvcENoYW1wc0RhdGEoXCJCamVyZ3NlblwiKTtcbiAgICAvLyAgICAgfSwgNTApO1xuXG4gICAgLy8gfSlcblxuICAgIGNvbnN0IGplbnNlbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamVuc2VuQnV0dG9uXCIpXG4gICAgICAgIGplbnNlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IHNwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BsYXNoXCIpO1xuICAgICAgICBzcGxhc2gucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IFwiSmVuc2VuXCI7XG4gICAgICAgIGgxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGxheWVyLWhlYWRlcicpO1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuICAgICAgICBsZXQgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGljQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGljLWNvbnRhaW5lcicpXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGljQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2plbnNlbi1pbWFnZScpO1xuICAgICAgICBwaWNDb250YWluZXIuYXBwZW5kQ2hpbGQocGljKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXJzdGF0cy50b3BDaGFtcHNEYXRhKFwiSmVuc2VuXCIpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgfSlcblxufSk7ICAgICIsImNvbnN0IHJlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuXG4vLyBwcmludHMgYWxsIHRoZSBtYXRjaGVzIGluIHRoZSBjc3Zcbi8vIGV4cG9ydCBjb25zdCByZXN1bHRzID0gZDMuY3N2KCcuLi9kYXRhLzIwMjFfTWF0Y2hfRGF0YS5jc3YnKVxuLy8gLnRoZW4oIChyZXN1bHQpID0+IGNvbnNvbGUubG9nKHJlc3VsdFswXS5wbGF5ZXIpKVxuXG5cblxuLy8gcmV0dXJucyBhbGwgdGhlIG1hdGNoZXMgZm9yIGEgc2luZ2xlIHBsYXllclxuZXhwb3J0IGNvbnN0IGZpbHRlckJ5UGxheWVyID0gKHBsYXllck5hbWUpID0+IGQzLmNzdignLi4vZGF0YS8yMDIxX01hdGNoX0RhdGEuY3N2Jylcbi50aGVuKCAocmVzdWx0KSA9PiB7ICAgIFxuICAgIGxldCBmaWx0ZXJlZFJlc3VsdFxuICAgIGZpbHRlcmVkUmVzdWx0ID0gcmVzdWx0LmZpbHRlciggZ2FtZSA9PiBnYW1lLnBsYXllciA9PT0gcGxheWVyTmFtZSlcbiAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHRcbn1cblxuKVxuXG4vLyByZXR1cm5zIGFsbCB0aGUgcGxheWVyJ3MgY2hhbXBpb25zIHBsYXllZFxuXG5leHBvcnQgY29uc3QgY2hhbXBzUGxheWVkID0gKHBsYXllck5hbWUpID0+IHsgICBcbiAgICBmaWx0ZXJCeVBsYXllcihwbGF5ZXJOYW1lKVxuICAgIC50aGVuICggKGdhbWVzKSA9PiB7XG4gICAgICAgIGxldCBjaGFtcHMgPSBbXTtcbiAgICAgICAgZ2FtZXMuZm9yRWFjaChnYW1lID0+IHtcbiAgICAgICAgICAgIGNoYW1wcy5wdXNoKGdhbWUuY2hhbXBpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoYW1wcztcbiAgICB9KTtcbn1cblxuXG4vLyBjcmVhdGVzIGNoYXJ0IGZvciBwbGF5ZXJzIGNoYW1wc1xuXG5leHBvcnQgZnVuY3Rpb24gdG9wQ2hhbXBzRGF0YShwbGF5ZXJOYW1lKSB7XG4gICAgbGV0IGNoYW1wQ291bnQgPSB7fTtcbiAgICBmaWx0ZXJCeVBsYXllcihwbGF5ZXJOYW1lKVxuICAgIC50aGVuICggKGdhbWVzKSA9PiB7XG4gICAgICAgIGxldCBjaGFtcHMgPSBbXTtcbiAgICAgICAgZ2FtZXMuZm9yRWFjaChnYW1lID0+IHtcbiAgICAgICAgICAgIGNoYW1wcy5wdXNoKGdhbWUuY2hhbXBpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgY2hhbXBzLmZvckVhY2goY2hhbXAgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGFtcENvdW50W2NoYW1wXSl7XG4gICAgICAgICAgICAgICAgY2hhbXBDb3VudFtjaGFtcF0gPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFtcENvdW50W2NoYW1wXSsrO1xuICAgICAgICB9KVxuICAgICAgICBjcmVhdGVGYXZvcml0ZUNoYW1wcyhjaGFtcENvdW50LCBwbGF5ZXJOYW1lKTtcbiAgICAgICAgXG4gICAgfSk7IFxufVxuXG5cbi8vIGFjdHVhbCBjaGFydCBjcmVhdGlvblxuXG5jb25zdCBjcmVhdGVGYXZvcml0ZUNoYW1wcyA9IChkYXRhLCBwbGF5ZXJOYW1lKSA9PiB7XG4gICAgbGV0IGNoYW1wQXJyID0gW107XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChjaGFtcGlvbiA9PiB7XG4gICAgICAgIGxldCBjaGFtcE9iaiA9IHtjaGFtcE5hbWU6IGNoYW1waW9uLCB0aW1lc1BsYXllZDogZGF0YVtjaGFtcGlvbl19O1xuICAgICAgICBjaGFtcEFyci5wdXNoKCBjaGFtcE9iaiApXG4gICAgfSk7XG4gICAgY2hhbXBBcnIgPSBjaGFtcEFyci5zb3J0KChhLGIpID0+IGQzLmRlc2NlbmRpbmcoYS50aW1lc1BsYXllZCwgYi50aW1lc1BsYXllZCkpLnNsaWNlKDAsNSlcbiAgICBjb25zdCBwaWNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBpYy1jb250YWluZXJcIik7XG4gICAgbGV0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBzdmdDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjaGFtcHMtZ3JhcGgtY29udGFpbmVyJyk7XG4gICAgcGljQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcik7XG4gICAgbGV0IHBsYXllZENoYW1wc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBwbGF5ZWRDaGFtcHNIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJOYW1lfSdzIEZhdm9yaXRlIENoYW1waW9uc2A7XG4gICAgcGxheWVkQ2hhbXBzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZWQtY2hhbXBzLWhlYWRlclwiKVxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmQocGxheWVkQ2hhbXBzSGVhZGVyKTtcblxuXG4gICAgY29uc3Qgd2lkdGggPSAxMDAwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNTAsIGJvdHRvbTogNTAsIGxlZnQ6IDUwLCByaWdodDogNTB9O1xuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcuY2hhbXBzLWdyYXBoLWNvbnRhaW5lcicpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodClcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuXG4gICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4oZDMucmFuZ2UoY2hhbXBBcnIubGVuZ3RoKSlcbiAgICAgICAgLnJhbmdlKFttYXJnaW4ubGVmdCwgd2lkdGggLSBtYXJnaW4ucmlnaHRdKVxuICAgICAgICAucGFkZGluZygwLjEpO1xuXG4gICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgMjBdKVxuICAgICAgICAucmFuZ2UoW2hlaWdodCAtIG1hcmdpbi5ib3R0b20sIG1hcmdpbi50b3BdKTtcblxuICAgIHN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAncm95YWxibHVlJylcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKGNoYW1wQXJyLnNvcnQoKGEsYikgPT4gZDMuZGVzY2VuZGluZyhhLnRpbWVzUGxheWVkLCBiLnRpbWVzUGxheWVkKSkpXG4gICAgICAgIC5qb2luKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgICAgICAuYXR0cigneScsIChkKSA9PiB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geSgwKSAtIHkoMCkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Zhdm9yaXRlLWNoYW1wLXJlY3QnKVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGQgPT4gbW91c2VvdmVyKGQpKVxuXG4gICAgZnVuY3Rpb24geEF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHQgLSBtYXJnaW4uYm90dG9tfSlgKVxuICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpLnRpY2tGb3JtYXQoaSA9PiBjaGFtcEFycltpXS5jaGFtcE5hbWUpKVxuICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzIwcHgnKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24geUF4aXMoZykge1xuICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0pLCAwKWApXG4gICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHkpLnRpY2tzKG51bGwsIGRhdGEuZm9ybWF0KSlcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyMHB4JylcbiAgICB9XG5cbiAgICB2YXIgZGl2ID0gZDMuc2VsZWN0KFwiZmF2b3JpdGUtY2hhbXAtcmVjdFwiKS5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRvb2x0aXBcIilcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG5cbiAgICBmdW5jdGlvbiBtb3VzZW92ZXIoZCkge1xuICAgICAgICBkaXYuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lXCIpO1xuICAgICAgICBkaXYudGV4dChkLnRpbWVzUGxheWVkKVxuICAgIH1cblxuICAgICAgc3ZnLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwieVwiLCAwIC0gbWFyZ2luLmxlZnQpXG4gICAgICAuYXR0cihcInhcIiwwIC0gKGhlaWdodCAvIDIpKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4wMDZlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiVGltZXMgUGxheWVkIDIwMjEgU2Vhc29uXCIpOyBcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoZC50aW1lc1BsYXllZCk7IH0pXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoMCkgLSB5KGQudGltZXNQbGF5ZWQpOyB9KVxuXG4gICAgc3ZnLmFwcGVuZCgnZycpLmNhbGwoeEF4aXMpO1xuICAgIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKHlBeGlzKTtcbiAgICBzdmcubm9kZSgpO1xuXG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9