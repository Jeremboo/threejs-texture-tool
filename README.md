
## ThreejsTextureTool 0.2.2

A tool who build, show and update canvas or textures who can be used in a [three.js](https://threejs.org/) project.

![Threejs Texture Tool demo](https://github.com/Jeremboo/threejs-texture-tool/blob/master/demo/demo.gif?raw=true)

[demo](http://codepen.io/Jeremboo/full/qqabKY/)


## Getting Started (es6)

### Init

```javascript
import threejs from 'three-js';
import ThreejsTextureTool from 'threejs-texture-tool';

const THREE = threejs();

/**
 * constructor() create a texture tool
 *
 * @params {Object} THREE
 */
const textureTool = new ThreejsTextureTool(THREE);

```

### Create canvas Texture

```javascript

/**
 * createCanvasTexture() return a CanvasTexture object
 *
 * @params {String} name = `canvas-${i}`
 * @params {Number} width = 256
 * @params {Number} height = 256
 */
const canvasTexture = textureTool.createCanvasTexture();

/**
 * drawCustomCanvas() code to draw on the canvas.
 * Possibility to add dynamic actions/
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

```

Possibilities :

```javascript


/**
 * update() code to update the canvas render built by
 * drawCustomCanvas().
 * Can be called by a loop into a requestAnimationFrame()
 *
 * @params {Object} props = {}
 */
canvasTexture.update({ color: '#CB512B'});

...

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

### Create texture with an image

```javascript

/**
 * createImageTexture() returns a ImageTexture object
 *
 * @params {String} url
 * @params {String} name = `image-${i}`
 */
const imgTexture = textureTool.createImageTexture('./test1.jpg');
this.textures.push(imgTexture);
this.materials.push(imgTexture.material);

```

Possibilities :

```javascript

const mesh = THREE.Mesh(
  new THREE.MeshBasicMaterial(),
  imageTexture.material,
);

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    canvasMap: {
      type: 't',
      value: imageTexture.texture
    },
  },
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  side: THREE.DoubleSide,
});
```

## TODO / NEXT STEP

- customCanvas directly on `createCanvasTexture(name, width, height, (context, params) => {})``

- actions to hide the menu (Cmd+h ?)

- use webpack to import css into js

- drag and move all openned textures anywhere in the view

- init each canvas texture with a button

- functions to generate specific textures when a canvas is used :
  - noiseTexture
  - perlinNoiseTexture
  - gradientTexture
  - perlinGradientNoiseTexture
  - customTexture
  - fusionTexture / superposeTextures
