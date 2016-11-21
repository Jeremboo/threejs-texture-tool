import { Scene, WebGLRenderer, PerspectiveCamera, Object3D, BoxGeometry, MeshFaceMaterial, Mesh } from 'three';
import CanvasTextureTool from '../src/index.js';

import './style.styl';

const canvasTT = new CanvasTextureTool();

/**/ /* ---- CORE ---- */
/**/ const mainColor = '#323031';
/**/ const secondaryColor = '#DB3A34';
/**/ const bgColor = '#FFC857';
/**/ let windowWidth = window.innerWidth;
/**/ let windowHeight = window.innerHeight;
/**/ class Webgl {
/**/   constructor(w, h) {
/**/     this.meshCount = 0;
/**/     this.meshListeners = [];
/**/     this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
/**/     this.renderer.setPixelRatio(window.devicePixelRatio);
/**/     // this.renderer.setClearColor(new Color(bgColor)));
/**/     this.scene = new Scene();
/**/     this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
/**/     this.camera.position.set(0, 0, 10);
/**/     this.dom = this.renderer.domElement;
/**/     this.update = this.update.bind(this);
/**/     this.resize = this.resize.bind(this);
/**/     this.resize(w, h); // set render size
/**/   }
/**/   add(mesh) {
/**/     this.scene.add(mesh);
/**/     if (!mesh.update) return;
/**/     this.meshListeners.push(mesh.update);
/**/     this.meshCount++;
/**/   }
/**/   update() {
/**/     let i = this.meshCount;
/**/     while (--i >= 0) {
/**/       this.meshListeners[i].apply(this, null);
/**/     }
/**/     this.renderer.render(this.scene, this.camera);
/**/   }
/**/   resize(w, h) {
/**/     this.camera.aspect = w / h;
/**/     this.camera.updateProjectionMatrix();
/**/     this.renderer.setSize(w, h);
/**/   }
/**/ }
/**/ const webgl = new Webgl(windowWidth, windowHeight);
/**/ document.body.appendChild(webgl.dom);
/**/
/**/
/* ---- CREATING ZONE ---- */

const CUBE_SIZE = 3;

// OBJECTS
class Block extends Object3D {
  constructor() {
    super();

    this.textures = [];
    this.materials = [];

    let i;
    for (i = 0; i < 4; i++) {
      const cT = canvasTT.createCanvasTexture();
      this.textures.push(cT);
      cT.drawCustomCanvas({},  (context, props) => {
        context.rect(0, 0, props.width, props.height);
        context.fillStyle = bgColor;
        context.fill();
        // http://codepen.io/jbpenrath/pen/gLObej
        let mouseDown = false;
        const paint = e => {
          if (mouseDown) {
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, 10, 0, 2 * Math.PI, false);
            context.fillStyle = mainColor;
            context.fill();
            context.closePath();
            cT.texture.needsUpdate = true;
          }
        };
        cT.canvas.onmousedown = e => {
          mouseDown = true;
          paint(e);
        };
        cT.canvas.onmouseup = () => {
          mouseDown = false;
        };
        cT.canvas.onmousemove = paint;
      });
      cT.update();
      this.materials.push(this.textures[i].material);
    }
    const imgT = canvasTT.createImageTexture('./test1.jpg');
    this.textures.push(imgT);
    this.materials.push(imgT.material);
    const imgT2 = canvasTT.createImageTexture('./test1.jpg');
    this.textures.push(imgT2);
    this.materials.push(imgT2.material);

    this.geometry = new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, 20, 20);
    this.material = new MeshFaceMaterial(this.materials);
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.set(1.52, 0, 0);
    this.add(this.mesh);

    this.rotation.set(0.25, 0.7, 0);
    this.update = this.update.bind(this);
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}


// ADDS
webgl.add(new Block());


/* ---- CREATING ZONE END ---- */
/**/ /* ---- ON RESIZE ---- */
/**/ function onResize() {
/**/   windowWidth = window.innerWidth;
/**/   windowHeight = window.innerHeight;
/**/   webgl.resize(windowWidth, windowHeight);
/**/ }
/**/ window.addEventListener('resize', onResize);
/**/ window.addEventListener('orientationchange', onResize);
/**/ /* ---- LOOP ---- */
/**/ function _loop() {
/**/ 	webgl.update();
/**/ 	requestAnimationFrame(_loop);
/**/ }
/**/  _loop();
