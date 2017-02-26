
## [ThreejsTextureTool 0.5.1](https://github.com/Jeremboo/threejs-texture-tool)

A tool to preview and update your canvases or pictures used for your [three.js](https://threejs.org/) textures.

[demo 0.2.6](http://codepen.io/Jeremboo/full/qqabKY/)


## Getting Started (es6)

### Create a texture with a dynamic canvas

![Threejs Texture Tool canvas texture demo](https://github.com/Jeremboo/threejs-texture-tool/blob/master/demo/demo.gif?raw=true)

```javascript
import { createCanvasTexture } from 'threejs-texture-tool';

// Create a canvasTexture
const canvasTexture = createCanvasTexture({
  name: 'myCanvas',
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

// Different accesses
const { texture, material, uniform, canvas } = canvasTexture;
```

### Create a texture with a picture

![Threejs Texture Tool demo with picture](https://github.com/Jeremboo/threejs-texture-tool/blob/master/demo/demo2.gif?raw=true)

```javascript
import { createImageTexture } from 'threejs-texture-tool';

// Load the picture
const imgTexture = createImageTexture('./test1.jpg', { name: 'test', onLoad: () => {
  // Manipulate params
  imgTexture.texture.wrapS =
  imgTexture.texture.wrapT =
  imgTexture.uniform.value.wrapS =
  imgTexture.uniform.value.wrapT =
  REPEAT_WRAPPING;
} });

// Different accesses
const { texture, material, uniform, image } = canvasTexture;
```
## Get material / uniform and other transformations

For the both textureTools, you can get her material and uniform object compatible with three.js

```javascript

// Use it as material
const mesh = THREE.Mesh(
  new BoxGeometry(1, 1, 1),
  imageOrCanvasTexture.material,
);

// Into shaderMaterial
const shaderMaterial = new ShaderMaterial({
  uniforms: {
    imgMap: imageOrCanvasTexture.uniform,
  },
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  side: DoubleSide,
});

// Get only the picture
const img = document.createElement('img');
img.src = imageTexture.image;

// Get only the canvas
const canvas = canvasTexture.canvas;

```

## TODO / NEXT STEP

- remplace dragDrop dependencie from scratch

- drag and move all openned textures anywhere in the view

- reset each canvas texture with a button

- functions to generate specific canvas textures :
  - noiseTexture
  - perlinNoiseTexture
  - gradientTexture
  - perlinGradientNoiseTexture
  - customTexture
  - fusionTexture / superposeTextures
