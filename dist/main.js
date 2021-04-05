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

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

if (global.fetch) {
  exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

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
/* harmony import */ var _playerstats__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_playerstats__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _secret__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./secret */ "./src/secret.js");




var fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
  console.log(d3.csv('../data/2021_Match_Data.csv'));
  var stats = document.getElementById('stats');
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
  });
  var bjergButton = document.querySelector("#bjergButton");
  bjergButton.addEventListener('click', function () {
    var splash = document.querySelector(".splash");
    splash.remove();
    var h1 = document.createElement("h1");
    h1.textContent = "Bjergsen";
    h1.setAttribute('class', 'player-header');
    var page = document.querySelector(".page-container");
    page.appendChild(h1);
    var statsDiv = document.createElement("div");
    statsDiv.setAttribute('class', 'stats-div');
    page.appendChild(statsDiv);
    var body = document.querySelector("body");
    body.classList.add("player-page");
    var graphContainer = d3.select('.stats-div').style('border', '1px solid red');
    graphContainer.selectAll('.bar').data(FAKER_DATA).enter().append('div').classed('bar', true).style('height', function (data) {
      return data.value * 15 + 'px';
    });
  });
});
var FAKER_DATA = [{
  id: 'd1',
  value: 10,
  region: 'KR'
}, {
  id: 'd2',
  value: 15,
  region: 'USA'
}, {
  id: 'd3',
  value: 30,
  region: 'USA'
}]; // async function fetchSumByName(summonerName){
//     while (summonerName.includes(" ")){
//         let spaceSpot = summonerName.indexOf(" ");    
//         summonerName = summonerName.substring(0, spaceSpot) + "%20" + summonerName.substring(spaceSpot+1);
//     }
//     const link = `https://na.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${riotKey}`;
//     const testLink = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/meleetoplul?api_key=RGAPI-53586f80-debf-4349-907e-8053bf191232'
//     const response = await fetch(testLink);
//     const data = await response.json();
//     console.log(data);
//     return data
// }

/***/ }),

/***/ "./src/playerstats.js":
/*!****************************!*\
  !*** ./src/playerstats.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// const riotKey = 'api_key=RGAPI-53586f80-debf-4349-907e-8053bf191232'
// const fetch = require("node-fetch");
// async function fetchSumByName(summonerName){
//     while (summonerName.includes(" ")){
//         let spaceSpot = summonerName.indexOf(" ");
//         summonerName = summonerName.substring(0, spaceSpot) + "%20" + summonerName.substring(spaceSpot+1);
//     }
//     const link = `/lol/summoner/v4/summoners/by-name/${summonerName}?${riotKey}`;
//     const response = await fetch(link);
//     let data = await response.json();
//     return data;
// }

/***/ }),

/***/ "./src/secret.js":
/*!***********************!*\
  !*** ./src/secret.js ***!
  \***********************/
/*! exports provided: riotKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "riotKey", function() { return riotKey; });
var riotKey = 'api_key=RGAPI-53586f80-debf-4349-907e-8053bf191232';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcnN0YXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbImZldGNoIiwicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJkMyIsImNzdiIsInN0YXRzIiwiZ2V0RWxlbWVudEJ5SWQiLCJmYWtlckJ1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJzcGxhc2giLCJyZW1vdmUiLCJoMSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInNldEF0dHJpYnV0ZSIsInBhZ2UiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJiYW5nQnV0dG9uIiwiYmplcmdCdXR0b24iLCJzdGF0c0RpdiIsImdyYXBoQ29udGFpbmVyIiwic2VsZWN0Iiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiRkFLRVJfREFUQSIsImVudGVyIiwiYXBwZW5kIiwiY2xhc3NlZCIsInZhbHVlIiwiaWQiLCJyZWdpb24iLCJyaW90S2V5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFj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RDtBQTZEQSxJQUFNSixVQUFVLEdBQUcsQ0FDZjtBQUFFSyxJQUFFLEVBQUUsSUFBTjtBQUFZRCxPQUFLLEVBQUUsRUFBbkI7QUFBdUJFLFFBQU0sRUFBRTtBQUEvQixDQURlLEVBRWY7QUFBRUQsSUFBRSxFQUFFLElBQU47QUFBWUQsT0FBSyxFQUFFLEVBQW5CO0FBQXVCRSxRQUFNLEVBQUU7QUFBL0IsQ0FGZSxFQUdmO0FBQUVELElBQUUsRUFBRSxJQUFOO0FBQVlELE9BQUssRUFBRSxFQUFuQjtBQUF1QkUsUUFBTSxFQUFFO0FBQS9CLENBSGUsQ0FBbkIsQyxDQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJOzs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUEsSTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFBTyxJQUFNQyxPQUFPLEdBQUcsb0RBQWhCLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7IC8vIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZ2xvYmFsXG5cbnZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHRoZSBvbmx5IHJlbGlhYmxlIG1lYW5zIHRvIGdldCB0aGUgZ2xvYmFsIG9iamVjdCBpc1xuICAvLyBgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKWBcbiAgLy8gSG93ZXZlciwgdGhpcyBjYXVzZXMgQ1NQIHZpb2xhdGlvbnMgaW4gQ2hyb21lIGFwcHMuXG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZ2xvYmFsO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9jYXRlIGdsb2JhbCBvYmplY3QnKTtcbn07XG5cbnZhciBnbG9iYWwgPSBnZXRHbG9iYWwoKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGdsb2JhbC5mZXRjaDsgLy8gTmVlZGVkIGZvciBUeXBlU2NyaXB0IGFuZCBXZWJwYWNrLlxuXG5pZiAoZ2xvYmFsLmZldGNoKSB7XG4gIGV4cG9ydHMuZGVmYXVsdCA9IGdsb2JhbC5mZXRjaC5iaW5kKGdsb2JhbCk7XG59XG5cbmV4cG9ydHMuSGVhZGVycyA9IGdsb2JhbC5IZWFkZXJzO1xuZXhwb3J0cy5SZXF1ZXN0ID0gZ2xvYmFsLlJlcXVlc3Q7XG5leHBvcnRzLlJlc3BvbnNlID0gZ2xvYmFsLlJlc3BvbnNlOyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIlxuaW1wb3J0IFwiLi9wbGF5ZXJzdGF0c1wiXG5pbXBvcnQge3Jpb3RLZXl9IGZyb20gXCIuL3NlY3JldFwiXG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJET00gTG9hZGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGQzLmNzdignLi4vZGF0YS8yMDIxX01hdGNoX0RhdGEuY3N2JykpXG4gICAgY29uc3Qgc3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHMnKTtcblxuICAgIGNvbnN0IGZha2VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmYWtlckJ1dHRvblwiKVxuICAgIGZha2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gXCJGYWtlclwiO1xuICAgICAgICBoMS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3BsYXllci1oZWFkZXInKTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoaDEpO1xuICAgICAgICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItcGFnZVwiKTtcbiAgICB9KVxuXG4gICAgY29uc3QgYmFuZ0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmFuZ0J1dHRvblwiKVxuICAgIGJhbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBzcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwbGFzaFwiKTtcbiAgICAgICAgc3BsYXNoLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBcIkJhbmdcIjtcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwbGF5ZXItaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGgxKTtcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXBhZ2VcIik7XG4gICAgfSlcblxuICAgIGNvbnN0IGJqZXJnQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiamVyZ0J1dHRvblwiKVxuICAgIGJqZXJnQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGxhc2hcIik7XG4gICAgICAgIHNwbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gXCJCamVyZ3NlblwiO1xuICAgICAgICBoMS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3BsYXllci1oZWFkZXInKTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoaDEpO1xuICAgICAgICBjb25zdCBzdGF0c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHN0YXRzRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc3RhdHMtZGl2JylcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChzdGF0c0Rpdik7XG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcInBsYXllci1wYWdlXCIpO1xuXG4gICAgICAgIGNvbnN0IGdyYXBoQ29udGFpbmVyID0gZDMuc2VsZWN0KCcuc3RhdHMtZGl2JylcbiAgICAgICAgICAgIC5zdHlsZSgnYm9yZGVyJywgJzFweCBzb2xpZCByZWQnKTtcblxuICAgICAgICBncmFwaENvbnRhaW5lclxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAgICAgICAuZGF0YShGQUtFUl9EQVRBKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuY2xhc3NlZCgnYmFyJywgdHJ1ZSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZGF0YSA9PiAoZGF0YS52YWx1ZSAqIDE1KSArICdweCcpO1xuXG4gICAgfSlcblxufSk7ICAgIFxuXG5jb25zdCBGQUtFUl9EQVRBID0gW1xuICAgIHsgaWQ6ICdkMScsIHZhbHVlOiAxMCwgcmVnaW9uOiAnS1InfSxcbiAgICB7IGlkOiAnZDInLCB2YWx1ZTogMTUsIHJlZ2lvbjogJ1VTQSd9LFxuICAgIHsgaWQ6ICdkMycsIHZhbHVlOiAzMCwgcmVnaW9uOiAnVVNBJ30sXG5dO1xuXG5cblxuXG5cblxuXG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGZldGNoU3VtQnlOYW1lKHN1bW1vbmVyTmFtZSl7XG4vLyAgICAgd2hpbGUgKHN1bW1vbmVyTmFtZS5pbmNsdWRlcyhcIiBcIikpe1xuLy8gICAgICAgICBsZXQgc3BhY2VTcG90ID0gc3VtbW9uZXJOYW1lLmluZGV4T2YoXCIgXCIpOyAgICBcbi8vICAgICAgICAgc3VtbW9uZXJOYW1lID0gc3VtbW9uZXJOYW1lLnN1YnN0cmluZygwLCBzcGFjZVNwb3QpICsgXCIlMjBcIiArIHN1bW1vbmVyTmFtZS5zdWJzdHJpbmcoc3BhY2VTcG90KzEpO1xuLy8gICAgIH1cblxuLy8gICAgIGNvbnN0IGxpbmsgPSBgaHR0cHM6Ly9uYS5hcGkucmlvdGdhbWVzLmNvbS9sb2wvc3VtbW9uZXIvdjQvc3VtbW9uZXJzL2J5LW5hbWUvJHtzdW1tb25lck5hbWV9PyR7cmlvdEtleX1gO1xuLy8gICAgIGNvbnN0IHRlc3RMaW5rID0gJ2h0dHBzOi8vbmExLmFwaS5yaW90Z2FtZXMuY29tL2xvbC9zdW1tb25lci92NC9zdW1tb25lcnMvYnktbmFtZS9tZWxlZXRvcGx1bD9hcGlfa2V5PVJHQVBJLTUzNTg2ZjgwLWRlYmYtNDM0OS05MDdlLTgwNTNiZjE5MTIzMidcblxuLy8gICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGVzdExpbmspO1xuLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4vLyAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgcmV0dXJuIGRhdGFcbi8vIH1cbiIsIi8vIGNvbnN0IHJpb3RLZXkgPSAnYXBpX2tleT1SR0FQSS01MzU4NmY4MC1kZWJmLTQzNDktOTA3ZS04MDUzYmYxOTEyMzInXG4vLyBjb25zdCBmZXRjaCA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpO1xuXG5cblxuLy8gYXN5bmMgZnVuY3Rpb24gZmV0Y2hTdW1CeU5hbWUoc3VtbW9uZXJOYW1lKXtcbi8vICAgICB3aGlsZSAoc3VtbW9uZXJOYW1lLmluY2x1ZGVzKFwiIFwiKSl7XG4vLyAgICAgICAgIGxldCBzcGFjZVNwb3QgPSBzdW1tb25lck5hbWUuaW5kZXhPZihcIiBcIik7XG4vLyAgICAgICAgIHN1bW1vbmVyTmFtZSA9IHN1bW1vbmVyTmFtZS5zdWJzdHJpbmcoMCwgc3BhY2VTcG90KSArIFwiJTIwXCIgKyBzdW1tb25lck5hbWUuc3Vic3RyaW5nKHNwYWNlU3BvdCsxKTtcbi8vICAgICB9XG5cbi8vICAgICBjb25zdCBsaW5rID0gYC9sb2wvc3VtbW9uZXIvdjQvc3VtbW9uZXJzL2J5LW5hbWUvJHtzdW1tb25lck5hbWV9PyR7cmlvdEtleX1gO1xuXG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChsaW5rKTtcbi8vICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuLy8gICAgIHJldHVybiBkYXRhO1xuXG4vLyB9XG5cblxuIiwiZXhwb3J0IGNvbnN0IHJpb3RLZXkgPSAnYXBpX2tleT1SR0FQSS01MzU4NmY4MC1kZWJmLTQzNDktOTA3ZS04MDUzYmYxOTEyMzInXG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=