
## [ThreejsTextureTool 0.5.0](https://github.com/Jeremboo/threejs-texture-tool)

A tool to preview and update your canvases or pictures used for your [three.js](https://threejs.org/) textures

[demo 0.2.6](http://codepen.io/Jeremboo/full/qqabKY/)


## Getting Started (es6)

### Create canvas Texture

![Threejs Texture Tool canvas texture demo](https://github.com/Jeremboo/threejs-texture-tool/blob/master/demo/demo.gif?raw=true)

```javascript
import { createCanvasTexture } from 'threejs-texture-tool';

// Create a canvasTexture
const canvasTexture = createCanvasTexture({
  name: 'drawer',
  onStart: (props) => {
    // Draw once a rectangle and add a mouse move Listener
    // To update this canvas
    const { width, height, context, canvas, update } = props;
    context.rect(0, 0, width, height);
    context.fillStyle = '#F6FF49';
    context.fill();
    canvas.onmousemove = e => {
      update(e.offsetX, e.offsetY);
    };
  },
  onUpdate: (x, y) => {
    // Called by `canvasTexture.udpate(...)`
    const { context } = canvasTexture;
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = mainColor;
    context.fill();
    context.closePath();
  },
});
/**
 * createCanvasTexture() return a CanvasTexture object
 *
 * @params {Object} Who  can content :
 * - @params {String} name = `canvas-${i}`
 * - @params {Number} width = 256
 * - @params {Number} height = 256
 */
const canvasTexture = createCanvasTexture();

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
    canvasMap: canvasTexture.uniform,
  },
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  side: THREE.DoubleSide,
});

// Get only canvas
const canvas = canvasTexture.canvas;

```

### Create texture with a picture

![Threejs Texture Tool demo with picture](https://github.com/Jeremboo/threejs-texture-tool/blob/master/demo/demo2.gif?raw=true)

```javascript
import { createImageTexture } from 'threejs-texture-tool';

// Load the picture
const imgTexture = createImageTexture('./test1.jpg', { name: 'test', onLoad: () => {
  imgTexture.texture.wrapS =
  imgTexture.texture.wrapT =
  imgTexture.uniform.value.wrapS =
  imgTexture.uniform.value.wrapT =
  REPEAT_WRAPPING;
} });

// Use it as material
const mesh = THREE.Mesh(
  new BoxGeometry(1, 1, 1),
  imgTexture.material,
);

// Into shaderMaterial
const shaderMaterial = new ShaderMaterial({
  uniforms: {
    imgMap: imgTexture.uniform,
  },
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  side: DoubleSide,
});

// Other access
const img = document.createElement('img');
img.src = imgTexture.image;

```

## TODO / NEXT STEP

- remove dragDrop to the dependencies

- customCanvas directly on `createCanvasTexture({ name, width, height }, (context, params) => {})``

- drag and move all openned textures anywhere in the view

- init each canvas texture with a button

- functions to generate specific textures when a canvas is used :
  - noiseTexture
  - perlinNoiseTexture
  - gradientTexture
  - perlinGradientNoiseTexture
  - customTexture
  - fusionTexture / superposeTextures
