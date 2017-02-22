(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define("threejsTextureTool", ["three"], factory);
	else if(typeof exports === 'object')
		exports["threejsTextureTool"] = factory(require("three"));
	else
		root["threejsTextureTool"] = factory(root["three"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCanvasTexture = exports.createImageTexture = undefined;

	var _dragDrop = __webpack_require__(6);

	var _dragDrop2 = _interopRequireDefault(_dragDrop);

	var _CanvasTexture = __webpack_require__(2);

	var _CanvasTexture2 = _interopRequireDefault(_CanvasTexture);

	var _ImageTexture = __webpack_require__(3);

	var _ImageTexture2 = _interopRequireDefault(_ImageTexture);

	var _style = __webpack_require__(11);

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
	  return textureWindow;
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
	    var imgTexture = new _ImageTexture2.default(url, function () {
	      var elm = addInDom(name, imgTexture.image);

	      // Drag Drop Event
	      (0, _dragDrop2.default)('#' + elm.id, function (files) {
	        // Read image from file data
	        var reader = new FileReader();
	        reader.addEventListener('load', function (e) {
	          var bytes = new Uint8Array(e.target.result);
	          var blob = new Blob([bytes.buffer]);
	          var URL = window.URL || window.webkitURL;
	          // remove the old img and update the image
	          elm.removeChild(imgTexture.image);
	          // Update the image with a new path
	          imgTexture.updateImg(URL.createObjectURL(blob), function () {
	            elm.appendChild(imgTexture.image);
	            onLoad(imgTexture);
	          });
	        });
	        reader.addEventListener('error', function (err) {
	          // TODO create true error
	          console.error('FileReader error' + err);
	        });

	        console.log(files[0].type);

	        if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(files[0].type) === -1) {
	          console.log('FileUpdate error: The file is not at the good format');
	          return;
	        }
	        reader.readAsArrayBuffer(files[0]);
	      });

	      onLoad(imgTexture);
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _three = __webpack_require__(1);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _three = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageTexture = function () {
	  function ImageTexture(url, callback) {
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
	  }

	  _createClass(ImageTexture, [{
	    key: 'updateImg',
	    value: function updateImg(newPath, callback) {
	      var _this2 = this;

	      this.texture = new _three.TextureLoader().load(newPath, function (texture) {
	        _this2.image = texture.image;
	        _this2.material.needsUpdate = true;
	        _this2.material.map = _this2.texture;
	        callback(_this2);
	      }, function (xhr) {
	        console.log(xhr.loaded / xhr.total * 100 + '% loaded');
	      }, function (xhr) {
	        console.log('An error happened', xhr);
	      });
	    }
	  }]);

	  return ImageTexture;
	}();

	exports.default = ImageTexture;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".ThreejsTextureTool-wrapper{position:fixed;top:5vh;bottom:5vh;left:0;max-height:90vh;margin:0;padding:8px;overflow-x:none;overflow-y:auto;list-style:none;font-family:Century Gothic,CenturyGothic,AppleGothic,sans-serif}.ThreejsTextureTool_hidden{display:none}.TextureTool{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-top:8px}.TextureTool-hidden{display:none}.TextureTool-canvas{position:absolute}.TextureTool-window{position:relative;pointer-events:auto;background-color:rgba(0,0,0,.5);-webkit-transition:.2s;transition:.2s}.TextureTool-window:hover{background-color:#000}.TextureTool-window img{max-width:200px;width:100%}.TextureTool-window.drag:after{content:\"+\";display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;width:100%;height:100%;top:0;left:0;z-index:1;background-color:rgba(0,0,0,.5);color:#fff;font-size:3em}.TextureTool-button,.TextureTool-close{white-space:nowrap;text-overflow:ellipsis;border:none;font:inherit;line-height:normal;outline:none}.TextureTool-button{max-width:150px;padding:6px 16px;border-radius:2px;background-color:#084c61;color:#fff;overflow:hidden;font-size:.8em;-webkit-transition:.2s;transition:.2s;cursor:pointer;-webkit-transform:translateX(0);transform:translateX(0)}.TextureTool-button:hover{max-width:999px;background-color:#000;padding:6px 32px}.TextureTool-close{position:absolute;width:20px;height:20px;top:5px;left:5px;background-color:#084c61;color:#fff;border-radius:2px;-webkit-transition:.4s;transition:.4s}.TextureTool-close:after{content:\"x\";position:absolute;top:46%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.TextureTool-close:hover{width:22px;height:22px;top:4px;right:4px;cursor:pointer;padding:4px 8px;background-color:#000}", ""]);

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

	module.exports = dragDrop

	var flatten = __webpack_require__(7)
	var parallel = __webpack_require__(9)

	function dragDrop (elem, listeners) {
	  if (typeof elem === 'string') {
	    var selector = elem
	    elem = window.document.querySelector(elem)
	    if (!elem) {
	      throw new Error('"' + selector + '" does not match any HTML elements')
	    }
	  }

	  if (!elem) {
	    throw new Error('"' + elem + '" is not a valid HTML element')
	  }

	  if (typeof listeners === 'function') {
	    listeners = { onDrop: listeners }
	  }

	  var timeout

	  elem.addEventListener('dragenter', onDragEnter, false)
	  elem.addEventListener('dragover', onDragOver, false)
	  elem.addEventListener('dragleave', onDragLeave, false)
	  elem.addEventListener('drop', onDrop, false)

	  // Function to remove drag-drop listeners
	  return function remove () {
	    removeDragClass()
	    elem.removeEventListener('dragenter', onDragEnter, false)
	    elem.removeEventListener('dragover', onDragOver, false)
	    elem.removeEventListener('dragleave', onDragLeave, false)
	    elem.removeEventListener('drop', onDrop, false)
	  }

	  function onDragEnter (e) {
	    if (listeners.onDragEnter) {
	      listeners.onDragEnter(e)
	    }

	    // Prevent event
	    e.stopPropagation()
	    e.preventDefault()
	    return false
	  }

	  function onDragOver (e) {
	    e.stopPropagation()
	    e.preventDefault()
	    if (e.dataTransfer.items) {
	      // Only add "drag" class when `items` contains items that are able to be
	      // handled by the registered listeners (files vs. text)
	      var items = toArray(e.dataTransfer.items)
	      var fileItems = items.filter(function (item) { return item.kind === 'file' })
	      var textItems = items.filter(function (item) { return item.kind === 'string' })

	      if (fileItems.length === 0 && !listeners.onDropText) return
	      if (textItems.length === 0 && !listeners.onDrop) return
	      if (fileItems.length === 0 && textItems.length === 0) return
	    }

	    elem.classList.add('drag')
	    clearTimeout(timeout)

	    if (listeners.onDragOver) {
	      listeners.onDragOver(e)
	    }

	    e.dataTransfer.dropEffect = 'copy'
	    return false
	  }

	  function onDragLeave (e) {
	    e.stopPropagation()
	    e.preventDefault()

	    if (listeners.onDragLeave) {
	      listeners.onDragLeave(e)
	    }

	    clearTimeout(timeout)
	    timeout = setTimeout(removeDragClass, 50)

	    return false
	  }

	  function onDrop (e) {
	    e.stopPropagation()
	    e.preventDefault()

	    if (listeners.onDragLeave) {
	      listeners.onDragLeave(e)
	    }

	    clearTimeout(timeout)
	    removeDragClass()

	    var pos = {
	      x: e.clientX,
	      y: e.clientY
	    }

	    // text drop support
	    var text = e.dataTransfer.getData('text')
	    if (text && listeners.onDropText) {
	      listeners.onDropText(text, pos)
	    }

	    // file drop support
	    if (e.dataTransfer.items) {
	      // Handle directories in Chrome using the proprietary FileSystem API
	      var items = toArray(e.dataTransfer.items).filter(function (item) {
	        return item.kind === 'file'
	      })

	      if (items.length === 0) return

	      parallel(items.map(function (item) {
	        return function (cb) {
	          processEntry(item.webkitGetAsEntry(), cb)
	        }
	      }), function (err, results) {
	        // This catches permission errors with file:// in Chrome. This should never
	        // throw in production code, so the user does not need to use try-catch.
	        if (err) throw err
	        if (listeners.onDrop) {
	          listeners.onDrop(flatten(results), pos)
	        }
	      })
	    } else {
	      var files = toArray(e.dataTransfer.files)

	      if (files.length === 0) return

	      files.forEach(function (file) {
	        file.fullPath = '/' + file.name
	      })

	      if (listeners.onDrop) {
	        listeners.onDrop(files, pos)
	      }
	    }

	    return false
	  }

	  function removeDragClass () {
	    elem.classList.remove('drag')
	  }
	}

	function processEntry (entry, cb) {
	  var entries = []

	  if (entry.isFile) {
	    entry.file(function (file) {
	      file.fullPath = entry.fullPath  // preserve pathing for consumer
	      cb(null, file)
	    }, function (err) {
	      cb(err)
	    })
	  } else if (entry.isDirectory) {
	    var reader = entry.createReader()
	    readEntries()
	  }

	  function readEntries () {
	    reader.readEntries(function (entries_) {
	      if (entries_.length > 0) {
	        entries = entries.concat(toArray(entries_))
	        readEntries() // continue reading entries until `readEntries` returns no more
	      } else {
	        doneEntries()
	      }
	    })
	  }

	  function doneEntries () {
	    parallel(entries.map(function (entry) {
	      return function (cb) {
	        processEntry(entry, cb)
	      }
	    }), cb)
	  }
	}

	function toArray (list) {
	  return Array.prototype.slice.call(list || [], 0)
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function flatten(list, depth) {
	  depth = (typeof depth == 'number') ? depth : Infinity;

	  if (!depth) {
	    if (Array.isArray(list)) {
	      return list.map(function(i) { return i; });
	    }
	    return list;
	  }

	  return _flatten(list, 1);

	  function _flatten(list, d) {
	    return list.reduce(function (acc, item) {
	      if (Array.isArray(item) && d < depth) {
	        return acc.concat(_flatten(item, d + 1));
	      }
	      else {
	        return acc.concat(item);
	      }
	    }, []);
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = function (tasks, cb) {
	  var results, pending, keys
	  var isSync = true

	  if (Array.isArray(tasks)) {
	    results = []
	    pending = tasks.length
	  } else {
	    keys = Object.keys(tasks)
	    results = {}
	    pending = keys.length
	  }

	  function done (err) {
	    function end () {
	      if (cb) cb(err, results)
	      cb = null
	    }
	    if (isSync) process.nextTick(end)
	    else end()
	  }

	  function each (i, err, result) {
	    results[i] = result
	    if (--pending === 0 || err) {
	      done(err)
	    }
	  }

	  if (!pending) {
	    // empty
	    done(null)
	  } else if (keys) {
	    // object
	    keys.forEach(function (key) {
	      tasks[key](function (err, result) { each(key, err, result) })
	    })
	  } else {
	    // array
	    tasks.forEach(function (task, i) {
	      task(function (err, result) { each(i, err, result) })
	    })
	  }

	  isSync = false
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 10 */
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./style.styl", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }
/******/ ])
});
;