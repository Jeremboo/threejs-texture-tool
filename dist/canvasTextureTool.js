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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasTexture = require('./CanvasTexture');

var _CanvasTexture2 = _interopRequireDefault(_CanvasTexture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasTextureTool = function () {
  function CanvasTextureTool(THREE) {
    _classCallCheck(this, CanvasTextureTool);

    if (!THREE) {
      // TODO create true error
      console.log('Err: Three.js must be passed in parameter');
      return;
    }

    this.THREE = THREE;

    this.canvasNameArr = [];
    this.canvasWrapper = document.createElement('ul');

    // Init canvas wrapper into the dom
    this.canvasWrapper.id = 'canvas-texture-wrapper';
    this.canvasWrapper.className = 'CanvasTextureTool-wrapper';
    document.body.appendChild(this.canvasWrapper);

    // Listener on keycode to toggle canvasWrapper
    document.body.addEventListener('keydown', function (e) {
      console.log(e);
      // TODO toggle canvasWrapper if Cmd+h pressed
    });
  }

  _createClass(CanvasTextureTool, [{
    key: 'createCanvasTexture',
    value: function createCanvasTexture() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas-' + this.canvasNameArr.length;
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;

      if (this.canvasNameArr.indexOf(name) !== -1) {
        // TODO create true error
        console.log('Err: Cannot have the same name', name);
        return;
      }

      // HTML
      var HTML = '\n      <li class="CanvasTexture">\n        <button id="' + name + '-open" class="CanvasTexture-button">' + name + '</button>\n        <div id="' + name + '-window" class="CanvasTexture-window CanvasTexture-hidden">\n          <button id="' + name + '-close" class="CanvasTexture-close"></button>\n        </div>\n      </li>\n    ';
      this.canvasWrapper.insertAdjacentHTML('beforeend', HTML);
      // ACTIONS
      var openBtn = document.getElementById(name + '-open');
      openBtn.addEventListener('click', function () {
        openBtn.classList.add('CanvasTexture-hidden');
        canvasWindow.classList.remove('CanvasTexture-hidden');
      });
      var closeBtn = document.getElementById(name + '-close');
      closeBtn.addEventListener('click', function () {
        openBtn.classList.remove('CanvasTexture-hidden');
        canvasWindow.classList.add('CanvasTexture-hidden');
      });
      // CANVAS
      var canvasTexure = new _CanvasTexture2.default(this.THREE, width, height);
      var canvasWindow = document.getElementById(name + '-window');
      canvasWindow.appendChild(canvasTexure.canvas);

      // SAVE
      this.canvasNameArr.push(name);
      return canvasTexure;
    }
  }]);

  return CanvasTextureTool;
}();

exports.default = CanvasTextureTool;

},{"./CanvasTexture":1}]},{},[2]);
