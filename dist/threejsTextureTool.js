(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("threejsTextureTool", [], factory);
	else if(typeof exports === 'object')
		exports["threejsTextureTool"] = factory();
	else
		root["threejsTextureTool"] = factory();
})(this, function() {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasTexture = __webpack_require__(1);
	
	var _CanvasTexture2 = _interopRequireDefault(_CanvasTexture);
	
	var _ImageTexture = __webpack_require__(2);
	
	var _ImageTexture2 = _interopRequireDefault(_ImageTexture);
	
	__webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TextureTool = function () {
	  function TextureTool(THREE) {
	    _classCallCheck(this, TextureTool);
	
	    if (!THREE) {
	      // TODO create true error
	      console.log('Err: Three.js must be passed in parameter');
	      return;
	    }
	
	    this.THREE = THREE;
	
	    this.textureNameArr = [];
	    this.textureToolWrapper = document.createElement('ul');
	
	    // Init canvas wrapper into the dom
	    this.textureToolWrapper.id = 'texture-tool-wrapper';
	    this.textureToolWrapper.className = 'ThreejsTextureTool-wrapper';
	    document.body.appendChild(this.textureToolWrapper);
	
	    // Listener on keycode to toggle textureToolWrapper
	    document.body.addEventListener('keydown', function (e) {
	      console.log(e);
	      // TODO toggle textureToolWrapper if Cmd+h pressed
	    });
	  }
	
	  _createClass(TextureTool, [{
	    key: 'addInDom',
	    value: function addInDom(name, texture) {
	      // HTML
	      var HTML = '\n      <li class="TextureTool">\n        <button id="' + name + '-open" class="TextureTool-button">' + name + '</button>\n        <div id="' + name + '-window" class="TextureTool-window TextureTool-hidden">\n          <button id="' + name + '-close" class="TextureTool-close"></button>\n        </div>\n      </li>\n    ';
	      this.textureToolWrapper.insertAdjacentHTML('beforeend', HTML);
	
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
	
	      // SAVE
	      this.textureNameArr.push(name);
	    }
	  }, {
	    key: 'createImageTexture',
	    value: function createImageTexture(url) {
	      var _this = this;
	
	      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image-' + this.textureNameArr.length;
	
	      if (this.textureNameArr.indexOf(name) !== -1) {
	        // TODO create true error
	        console.log('Err: Cannot have the same name', name);
	        return;
	      }
	
	      var imgTexture = new _ImageTexture2.default(this.THREE, url, function (image) {
	        _this.addInDom(name, image);
	      });
	      return imgTexture;
	    }
	  }, {
	    key: 'createCanvasTexture',
	    value: function createCanvasTexture() {
	      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas-' + this.textureNameArr.length;
	      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
	      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
	
	      if (this.textureNameArr.indexOf(name) !== -1) {
	        console.log('Err: Cannot have the same name', name);
	        return;
	      }
	
	      var canvasTexture = new _CanvasTexture2.default(this.THREE, width, height);
	      this.addInDom(name, canvasTexture.canvas);
	      return canvasTexture;
	    }
	  }]);
	
	  return TextureTool;
	}();
	
	exports.default = TextureTool;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasTexture = function () {
	  function CanvasTexture(THREE) {
	    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
	    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
	
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
	
	    this.texture = new THREE.Texture(this.canvas);
	    this.texture.needsUpdate = true;
	
	    this.material = new THREE.MeshBasicMaterial({
	      map: this.texture,
	      overdraw: true
	    });
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageTexture = function ImageTexture(THREE, url, callback) {
	  var _this = this;
	
	  _classCallCheck(this, ImageTexture);
	
	  this.texture = null;
	  this.image = null;
	  this.material = new THREE.MeshBasicMaterial({
	    overdraw: true
	  });
	
	  this.textureLoader = new THREE.TextureLoader().load(url, function (texture) {
	    _this.texture = texture;
	    _this.image = texture.image;
	    _this.material.needsUpdate = true;
	    _this.material.map = _this.texture;
	    callback(_this.image);
	  }, function (xhr) {
	    console.log(xhr.loaded / xhr.total * 100 + '% loaded');
	  }, function (xhr) {
	    console.log('An error happened', xhr);
	  });
	};
	
	exports.default = ImageTexture;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./style.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".ThreejsTextureTool{list-style:none;margin:0;padding:0;font-family:Century Gothic,CenturyGothic,AppleGothic,sans-serif}.ThreejsTextureTool-wrapper{position:fixed;top:5vw;right:0;max-height:90vh;overflow-x:visible;overflow-y:auto;padding:8px}.TextureTool{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-top:8px}.TextureTool-hidden{display:none}.TextureTool-canvas{position:absolute}.TextureTool-window{position:relative;pointer-events:auto}.TextureTool-button,.TextureTool-close{white-space:nowrap;text-overflow:ellipsis;border:none;font:inherit;line-height:normal;outline:none}.TextureTool-button{max-width:150px;padding:6px 16px;border-radius:2px;background-color:#084c61;color:#fff;overflow:hidden;font-size:.8em;-webkit-transition:.2s;transition:.2s;cursor:pointer;-webkit-transform:translateX(0);transform:translateX(0)}.TextureTool-button:hover{max-width:999px;background-color:#000;-webkit-transform:translateX(-8px);transform:translateX(-8px);padding:6px 32px}.TextureTool-close{position:absolute;width:20px;height:20px;top:5px;right:5px;background-color:#084c61;color:#fff;border-radius:2px;-webkit-transition:.4s;transition:.4s}.TextureTool-close:after{content:'x';position:absolute;top:46%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.TextureTool-close:hover{width:22px;height:22px;top:4px;right:4px;cursor:pointer;padding:4px 8px;background-color:#000}", ""]);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;