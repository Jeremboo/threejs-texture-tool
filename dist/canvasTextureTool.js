(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasTexture = require('./CanvasTexture');

var _CanvasTexture2 = _interopRequireDefault(_CanvasTexture);

var _ImageTexture = require('./ImageTexture');

var _ImageTexture2 = _interopRequireDefault(_ImageTexture);

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

},{"./CanvasTexture":1,"./ImageTexture":2}]},{},[3]);
