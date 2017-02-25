import { MeshBasicMaterial, Texture } from 'three';

export default function CanvasTexture({ width = 256, height = 256, onStart = f => f, onUpdate = f => f }) {
  this.width = width;
  this.height = height;

  this.canvas = document.createElement('canvas');
  this.canvas.width = width;
  this.canvas.height = height;

  this.context = this.canvas.getContext('2d');

  this.texture = new Texture(this.canvas);
  this.texture.needsUpdate = true;

  this.material = new MeshBasicMaterial({
    map: this.texture,
    overdraw: true,
  });

  this.uniform = { type: 't', value: this.texture };

  this.update = (...props) => {
    onUpdate(...props);
    this.texture.needsUpdate = true;
  };

  onStart(this);
}
