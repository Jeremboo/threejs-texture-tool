# CanvasTextureTool 0.0.1

A tool who build, show and update canvas textures who can be used in a [three.js](https://threejs.org/) project.


![Canvas Texture Tool demo](https://github.com/Jeremboo/canvas-texture-tool/blob/master/demo/demo.gif?raw=true)

[demo](http://codepen.io/Jeremboo/full/qqabKY/)


## Getting Started (es6)

```javascript
import threejs from 'three-js';
import CanvasTextureTool from '../src';

const THREE = threejs();

/**
 * constructor() create a texture tool
 *
 * @params {Object} THREE
 */
const textureTool = new CanvasTextureTool(THREE);

/**
 * createCanvasTexture() returns a CanvasTexture object
 *
 * @params {String} name = `canvas-${i}`
 * @params {Number} width = 256
 * @params {Number} height = 256
 */
const canvasTexture = textureTool.createCanvasTexture();

/**
 * drawCustomCanvas() code to draw into canvas
 *
 * @params {Object} props = {}
 * @params {Function} construction method
 */
canvasTexture.drawCustomCanvas({ color: '#FCCE06'}, (context, params) => {
  const { width, height, color } = params;
  context.rect(0, 0, width, height);
  context.fillStyle = color;
  context.fill();
});

/**
 * update() code to update the canvas in calling
 * le method created with drawCustomCanvas
 *
 * @params {Object} props = {}
 */
canvasTexture.update();

...

// ###############
// POSSIBILITIES
// ###############

// Create a mesh using canvas on material
const mesh = THREE.Mesh(
  new THREE.MeshBasicMaterial(),
  canvasTexture.material,
);

// Use canvas into shader material
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    canvasMap: { type: 't', value: canvasTexture.texture },
  },
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  side: THREE.DoubleSide,
});

// Get only canvas
const canvas = canvasTexture.canvas;
```
## TODO / NEXT STEP

- canvasTextureTool -> threejs-texture-tool :
  - add .jpg, .png, .gif like canvas.

- actions to hide the menu (Cmd+h ?)

- use webpack to import css to js

- drag and move all openned textures anywhere in the view

- init each canvas texture with a button

- functions to generate specific textures when a canvas is used :
  - noiseTexture
  - perlinNoiseTexture
  - gradientTexture
  - perlinGradientNoiseTexture
  - customTexture
  - fusionTexture / superposeTextures
