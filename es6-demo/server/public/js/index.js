/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _test = __webpack_require__(2);

	var _test2 = _interopRequireDefault(_test);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	{
	  var a = void 0,
	      b = void 0,
	      c = void 0;
	  a = 1;
	  b = 2;

	  console.log(a, b);
	}

	{
	  var _a = void 0,
	      _b = void 0,
	      rest = void 0;
	  _a = 1;
	  _b = 2;
	  rest = [3, 4, 5];

	  console.log(_a, _b, rest);
	}

	{
	  var _a2 = void 0,
	      _b2 = void 0;
	  var _a$b = {
	    a: 1,
	    b: 2
	  };
	  _a2 = _a$b.a;
	  _b2 = _a$b.b;

	  console.log(_a2, _b2);
	}

	{
	  var fun = function fun() {
	    return [1, 2, 3, 4, 5];
	  };

	  var _a3 = void 0,
	      _b3 = void 0,
	      _c = void 0;

	  var _fun = fun();

	  var _fun2 = _toArray(_fun);

	  _a3 = _fun2[0];
	  _b3 = _fun2.slice(2);

	  console.log(_a3, _b3, _c);
	}

	{
	  var obj = {
	    title: 'aaa',
	    test: [{
	      a: 1,
	      b: 2
	    }]
	  };

	  var tt1 = obj.title,
	      _obj$test = _slicedToArray(obj.test, 1),
	      tt2 = _obj$test[0].a;

	  console.log(tt1, tt2);
	}

/***/ })
/******/ ]);