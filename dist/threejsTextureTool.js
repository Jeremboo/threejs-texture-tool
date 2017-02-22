(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define("threejsTextureTool", ["three"], factory);
	else if(typeof exports === 'object')
		exports["threejsTextureTool"] = factory(require("three"));
	else
		root["threejsTextureTool"] = factory(root["three"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCanvasTexture = exports.createImageTexture = undefined;
	
	var _CanvasTexture = __webpack_require__(1);
	
	var _CanvasTexture2 = _interopRequireDefault(_CanvasTexture);
	
	var _ImageTexture = __webpack_require__(3);
	
	var _ImageTexture2 = _interopRequireDefault(_ImageTexture);
	
	var _style = __webpack_require__(4);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * #########################
	 * INIT
	 * #########################
	 */
	
	var textureNameArr = [];
	
	// Init canvas wrapper into the dom
	var textureToolWrapper = document.createElement('ul');
	textureToolWrapper.id = 'texture-tool-wrapper';
	textureToolWrapper.className = 'ThreejsTextureTool-wrapper';
	document.body.appendChild(textureToolWrapper);
	
	// Add css without style-loader
	var style = document.createElement('style');
	style.innerHTML = _style2.default.toString();
	textureToolWrapper.appendChild(style);
	
	// Listener on keycode to toggle textureToolWrapper when h pressed
	document.body.addEventListener('keydown', function (e) {
	  if (e.keyCode === 72) {
	    textureToolWrapper.classList.toggle('ThreejsTextureTool_hidden');
	  }
	});
	
	/**
	 * #########################
	 * FUNCTION
	 * #########################
	 */
	
	/**
	 * Add a texture viewer in DOM
	 * @params {String} name
	 * @params {Object} texture
	 */
	function addInDom(name, texture) {
	  // HTML
	  var HTML = '\n    <li class="TextureTool">\n      <button id="' + name + '-open" class="TextureTool-button">' + name + '</button>\n      <div id="' + name + '-window" class="TextureTool-window TextureTool-hidden">\n        <button id="' + name + '-close" class="TextureTool-close"></button>\n      </div>\n    </li>\n  ';
	  textureToolWrapper.insertAdjacentHTML('beforeend', HTML);
	
	  // ACTIONS
	  var textureWindow = document.getElementById(name + '-window');
	  var openBtn = document.getElementById(name + '-open');
	  openBtn.addEventListener('click', function () {
	    openBtn.classList.add('TextureTool-hidden');
	    textureWindow.classList.remove('TextureTool-hidden');
	  });
	  var closeBtn = document.getElementById(name + '-close');
	  closeBtn.addEventListener('click', function () {
	    openBtn.classList.remove('TextureTool-hidden');
	    textureWindow.classList.add('TextureTool-hidden');
	  });
	  textureWindow.appendChild(texture);
	}
	
	/**
	 * Add a texture into the array
	 * @params {String} name
	 */
	function saveTexture(name) {
	  if (textureNameArr.indexOf(name) !== -1) {
	    // TODO create true error
	    console.log('Err: Cannot have the same name', name);
	    return false;
	  }
	  textureNameArr.push(name);
	  return true;
	}
	
	/**
	 * #########################
	 * EXPORT
	 * #########################
	 */
	
	/**
	 * Create an texture based on an image
	 * @params {String}      url      of the image
	 * @params {Object}      props    with :
	 *  - @params {String}   name     id attribued at the texture
	 *  - @params {Function} onLoad   a callback to handle the children
	 */
	var createImageTexture = exports.createImageTexture = function createImageTexture(url) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$name = _ref.name,
	      name = _ref$name === undefined ? 'image-' + textureNameArr.length : _ref$name,
	      _ref$onLoad = _ref.onLoad,
	      onLoad = _ref$onLoad === undefined ? function (f) {
	    return f;
	  } : _ref$onLoad;
	
	  if (saveTexture(name)) {
	    var imgTexture = new _ImageTexture2.default(url, function (it) {
	      addInDom(name, it.image);
	      if (onLoad) onLoad(it);
	    });
	    return imgTexture;
	  }
	  return null;
	};
	
	/**
	 * Create an texture based on a canvas
	 * @params {Object}      props    with :
	 *  - @params {String}   name
	 *  - @params {Number}   width
	 *  - @params {Number} height
	 */
	var createCanvasTexture = exports.createCanvasTexture = function createCanvasTexture() {
	  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref2$name = _ref2.name,
	      name = _ref2$name === undefined ? 'canvas-' + textureNameArr.length : _ref2$name,
	      _ref2$width = _ref2.width,
	      width = _ref2$width === undefined ? 256 : _ref2$width,
	      _ref2$height = _ref2.height,
	      height = _ref2$height === undefined ? 256 : _ref2$height;
	
	  if (saveTexture(name)) {
	    var canvasTexture = new _CanvasTexture2.default(width, height);
	    addInDom(name, canvasTexture.canvas);
	    return canvasTexture;
	  }
	  return null;
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _three = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasTexture = function () {
	  function CanvasTexture() {
	    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;
	    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
	
	    _classCallCheck(this, CanvasTexture);
	
	    this.state = { width: width, height: height };
	    this.canvas = null;
	    this.context = null;
	    this.texture = null;
	    this.material = null;
	    this.update = function (f) {
	      return f;
	    };
	
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = width;
	    this.canvas.height = height;
	
	    this.context = this.canvas.getContext('2d');
	
	    this.texture = new _three.Texture(this.canvas);
	    this.texture.needsUpdate = true;
	
	    this.material = new _three.MeshBasicMaterial({
	      map: this.texture,
	      overdraw: true
	    });
	
	    this.uniform = { type: 't', value: this.texture };
	  }
	
	  _createClass(CanvasTexture, [{
	    key: 'drawCustomCanvas',
	    value: function drawCustomCanvas(props, onUpdate) {
	      var _this = this;
	
	      this.update = function () {
	        onUpdate(_this.context, Object.assign({}, _this.state, props));
	        _this.texture.needsUpdate = true;
	      };
	    }
	  }]);
	
	  return CanvasTexture;
	}();
	
	exports.default = CanvasTexture;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _three = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageTexture = function ImageTexture(url, callback) {
	  var _this = this;
	
	  _classCallCheck(this, ImageTexture);
	
	  this.image = null;
	  this.material = new _three.MeshBasicMaterial({
	    overdraw: true
	  });
	
	  this.texture = new _three.TextureLoader().load(url, function (texture) {
	    _this.image = texture.image;
	    _this.material.needsUpdate = true;
	    _this.material.map = _this.texture;
	    callback(_this);
	  }, function (xhr) {
	    console.log(xhr.loaded / xhr.total * 100 + '% loaded');
	  }, function (xhr) {
	    console.log('An error happened', xhr);
	  });
	
	  this.uniform = { type: 't', value: this.texture };
	};
	
	exports.default = ImageTexture;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".ThreejsTextureTool{list-style:none;margin:0;padding:0;font-family:Century Gothic,CenturyGothic,AppleGothic,sans-serif}.ThreejsTextureTool-wrapper{position:fixed;top:5vh;bottom:5vh;left:0;max-height:90vh;overflow-x:visible;overflow-y:auto;padding:8px}.ThreejsTextureTool_hidden{display:none}.TextureTool{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-top:8px}.TextureTool-hidden{display:none}.TextureTool-canvas{position:absolute}.TextureTool-window{position:relative;pointer-events:auto;max-width:200px;background-color:rgba(0,0,0,.5);-webkit-transition:.2s;transition:.2s}.TextureTool-window:hover{background-color:#000}.TextureTool-window img{width:100%}.TextureTool-button,.TextureTool-close{white-space:nowrap;text-overflow:ellipsis;border:none;font:inherit;line-height:normal;outline:none}.TextureTool-button{max-width:150px;padding:6px 16px;border-radius:2px;background-color:#084c61;color:#fff;overflow:hidden;font-size:.8em;-webkit-transition:.2s;transition:.2s;cursor:pointer;-webkit-transform:translateX(0);transform:translateX(0)}.TextureTool-button:hover{max-width:999px;background-color:#000;-webkit-transform:translateX(8px);transform:translateX(8px);padding:6px 32px}.TextureTool-close{position:absolute;width:20px;height:20px;top:5px;left:5px;background-color:#084c61;color:#fff;border-radius:2px;-webkit-transition:.4s;transition:.4s}.TextureTool-close:after{content:\"x\";position:absolute;top:46%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.TextureTool-close:hover{width:22px;height:22px;top:4px;right:4px;cursor:pointer;padding:4px 8px;background-color:#000}", ""]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ])
});
;